import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";

import {
  AppHeader,
  BetCard,
  ButtonTypeOfGame,
  Footer,
  Loading,
  NewBetButton,
  ScreenTitle,
} from "../../components";

import EmptyGamesSvg from "../../shared/assets/empty-games.svg";

import { api } from "../../shared/services";

import { useReduxDispatch, useReduxSelector } from "../../shared/hooks";

import { fetchUserBets } from "../../store/slices/bets/actions";
import { selectBets } from "../../store/slices/bets/selectors";

import { IBet } from "../../shared/types";

import * as S from "./styles";

export interface IBetType {
  id: number;
  type: string;
  color: string;
}

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredBets, setFilteredBets] = useState<IBet[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const bets = useReduxSelector(selectBets);
  const dispatch = useReduxDispatch();

  const betsTypes = useMemo(() => {
    const types = bets.map(({ type }) => type);
    const typesWithoutRepetition: IBetType[] = [];

    for (const type of types) {
      const isExistent = typesWithoutRepetition.find(
        (uniqueType) => uniqueType.id === type.id
      );
      if (!isExistent) typesWithoutRepetition.push(type);
    }

    return typesWithoutRepetition;
  }, [bets]);

  const fetchUserBetsInApi = useCallback(async () => {
    try {
      setIsLoading(true);
      setSelectedTypes([]);
      await dispatch(fetchUserBets());
    } catch (err: any) {
      Alert.alert(err.message, "", [{ text: "Okay" }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const makeBetData = (betData: IBet) => {
    const game = betsTypes.find((item) => item.id === betData.game_id);

    if (!game) return betData;

    const betType = { ...betData.type, color: game.color };
    return { ...betData, type: betType };
  };

  async function fetchFilteredBets(types: string[]) {
    const params = new URLSearchParams();
    types.forEach((type) => params.append("type[]", type));

    const { data: filteredBetsData } = await api.get<IBet[]>("/bet/all-bets", {
      params,
    });

    const newFilteredBets = filteredBetsData.map(makeBetData);

    setFilteredBets(newFilteredBets);
    setIsLoading(false);
  }

  function handleToggleFilterSelectionByType(type: string) {
    setIsLoading(true);

    const existentType = selectedTypes.find(
      (selectedType) => selectedType === type
    );

    const types = existentType
      ? selectedTypes.filter((selectedType) => selectedType !== type)
      : [...selectedTypes, type];

    setSelectedTypes(types);
    fetchFilteredBets(types);
  }

  useEffect(() => {
    if (bets.length > 0) setFilteredBets(bets);
  }, [bets]);

  useFocusEffect(
    useCallback(() => {
      fetchUserBetsInApi();
    }, [fetchUserBetsInApi])
  );

  return (
    <S.Container>
      {isLoading && <Loading />}

      <AppHeader />

      <S.Content>
        <S.ScreenTitleContainer>
          <ScreenTitle>Recent Games</ScreenTitle>
        </S.ScreenTitleContainer>

        {bets.length === 0 && (
          <>
            <S.InfoLegend>No games</S.InfoLegend>
            <EmptyGamesSvg height={RFValue(164)} />

            <S.InfoMessage>
              You still don't have registered games...
            </S.InfoMessage>
          </>
        )}

        {bets.length > 0 && (
          <>
            <S.FilterWrapper>
              <S.FilterTitle>Filters</S.FilterTitle>
              <S.BetTypeList
                data={betsTypes}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <ButtonTypeOfGame
                    title={item.type}
                    isActive={selectedTypes.some((type) => type === item.type)}
                    color={item.color}
                    onPress={() => handleToggleFilterSelectionByType(item.type)}
                  />
                )}
              />
            </S.FilterWrapper>

            <S.BetList
              data={filteredBets}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => <BetCard bet={item} />}
            />
          </>
        )}
      </S.Content>

      <S.NewBetButtonContainer>
        <NewBetButton />
      </S.NewBetButtonContainer>

      <Footer />
    </S.Container>
  );
}
