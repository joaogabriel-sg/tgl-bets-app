import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { format, parseISO } from "date-fns";

import { AppHeader, Footer, Loading } from "../../components";

import EmptyGamesSvg from "../../shared/assets/empty-games.svg";

import { RootStackParamList } from "../../routes";

import { api } from "../../shared/services";

import { useReduxDispatch, useReduxSelector } from "../../shared/hooks";
import { formatCurrencyToBRL } from "../../shared/utils";

import { fetchUserBets } from "../../store/slices/bets/actions";
import { selectBets } from "../../store/slices/bets/selectors";
import { IBet } from "../../store/slices/bets";
import { IApiGames } from "../../store/slices/games";

import * as S from "./styles";

interface IBetType {
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

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const betsTypes = useMemo(() => {
    const allTypes = bets.map((bet) => bet.type);
    const uniqueTypes: IBetType[] = [];

    for (const type of allTypes) {
      const isExistent = uniqueTypes.find(
        (uniqueType) => uniqueType.id === type.id
      );
      if (!isExistent) uniqueTypes.push(type);
    }

    return uniqueTypes;
  }, [bets]);

  function handleNavigateToNewBet() {
    navigation.navigate("NewBet");
  }

  const fetchUserBetsInApi = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchUserBets());
    } catch (err: any) {
      Alert.alert(err.message, "", [{ text: "Okay" }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function fetchFilteredBets(types: string[]) {
    const params = new URLSearchParams();
    types.forEach((type) => {
      params.append("type[]", type);
    });

    const { data: filteredBetsData } = await api.get<IBet[]>("/bet/all-bets", {
      params,
    });
    const { data: gamesData } = await api.get<IApiGames>("/cart_games");

    const data = filteredBetsData.map((filteredBetData) => {
      const game = gamesData.types.find(
        (gameData) => gameData.id === filteredBetData.game_id
      );

      if (!game) return filteredBetData;

      return {
        ...filteredBetData,
        type: {
          ...filteredBetData.type,
          color: game.color,
        },
      };
    });

    setFilteredBets(data);
    setIsLoading(false);
  }

  function handleToggleFilterSelectionByType(type: string) {
    setIsLoading(true);

    const existentTypeFilter = selectedTypes.find(
      (typeFilter) => typeFilter === type
    );

    let types: string[] = [];

    if (existentTypeFilter) {
      setSelectedTypes((prevSelectedTypes) =>
        prevSelectedTypes.filter((selectedType) => selectedType !== type)
      );
      types = [...selectedTypes].filter(
        (selectedType) => selectedType !== type
      );
    } else {
      setSelectedTypes((prevSelectedTypes) => [...prevSelectedTypes, type]);
      types = [...selectedTypes, type];
    }

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

      {bets.length === 0 && (
        <S.EmptyContent>
          <S.ScreenTitle>Recent Games</S.ScreenTitle>

          <S.InfoLegend>No games</S.InfoLegend>

          <EmptyGamesSvg height={RFValue(164)} />

          <S.InfoMessage>
            You still don't have registered games...
          </S.InfoMessage>
        </S.EmptyContent>
      )}

      {bets.length > 0 && (
        <S.Content>
          <S.ScreenTitle>Recent Games</S.ScreenTitle>

          <S.FilterWrapper>
            <S.FilterTitle>Filters</S.FilterTitle>

            <FlatList
              data={betsTypes}
              keyExtractor={(item) => String(item.id)}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%" }}
              renderItem={({ item }) => {
                const isActive = selectedTypes.some(
                  (type) => type === item.type
                );
                const color = item.color;

                return (
                  <S.TypeFilterButton
                    active={isActive}
                    color={color}
                    onPress={() => handleToggleFilterSelectionByType(item.type)}
                  >
                    <S.TypeFilterText active={isActive} color={color}>
                      {item.type}
                    </S.TypeFilterText>
                  </S.TypeFilterButton>
                );
              }}
            />
          </S.FilterWrapper>

          <FlatList
            data={filteredBets}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            renderItem={({ item }) => {
              const formattedNumbers = item.choosen_numbers
                .split(",")
                .map((number) => `${number}`.padStart(2, "0"))
                .join(", ");

              return (
                <S.BetWrapper>
                  <S.DetailLeft color={item.type.color} />
                  <S.BetDescription>
                    <S.BetNumbers>{formattedNumbers}</S.BetNumbers>
                    <S.BetDateAndPrice>
                      {format(parseISO(item.created_at), "dd/MM/yyyy")} -{" "}
                      {formatCurrencyToBRL(item.price)}
                    </S.BetDateAndPrice>
                    <S.BetType color={item.type.color}>
                      {item.type.type}
                    </S.BetType>
                  </S.BetDescription>
                </S.BetWrapper>
              );
            }}
          />
        </S.Content>
      )}

      <S.NewBetButton onPress={handleNavigateToNewBet}>
        <S.NewBetText>New Bet</S.NewBetText>
        <Feather
          name="arrow-right"
          size={RFValue(24)}
          color={theme.colors.shape_light}
        />
      </S.NewBetButton>

      <Footer />
    </S.Container>
  );
}
