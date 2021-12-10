import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Text } from "react-native";
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

import { useReduxDispatch, useReduxSelector } from "../../shared/hooks";
import { formatCurrencyToBRL } from "../../shared/utils";

import { fetchUserBets } from "../../store/slices/bets/actions";
import { selectBets } from "../../store/slices/bets/selectors";

import * as S from "./styles";

interface IBetType {
  id: number;
  type: string;
  color: string;
}

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTypesFilter, setSelectedTypesFilter] = useState<IBetType[]>(
    []
  );
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

  const betsFiltered = useMemo(() => {
    return bets.filter(
      (bet) =>
        selectedTypesFilter.length === 0 ||
        selectedTypesFilter.some((typeFilter) => typeFilter.id === bet.game_id)
    );
  }, [bets, selectedTypesFilter]);

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

  function handleToggleFilterSelectionByTypeId(id: number) {
    const existentTypeFilter = selectedTypesFilter.find(
      (typeFilter) => typeFilter.id === id
    );

    if (existentTypeFilter) {
      setSelectedTypesFilter((prevSelectedTypesFilter) => {
        return prevSelectedTypesFilter.filter(
          (typeFilter) => typeFilter.id !== existentTypeFilter.id
        );
      });
      return;
    }

    const newSelectedTypeFilter = betsTypes.find(
      (betType) => betType.id === id
    );

    if (newSelectedTypeFilter)
      setSelectedTypesFilter((prevSelectedTypesFilter) => [
        ...prevSelectedTypesFilter,
        newSelectedTypeFilter,
      ]);
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserBetsInApi();
    }, [fetchUserBetsInApi])
  );

  return (
    <S.Container>
      {isLoading && <Loading />}

      <AppHeader />

      {betsFiltered.length === 0 && (
        <S.EmptyContent>
          <S.ScreenTitle>Recent Games</S.ScreenTitle>

          <S.InfoLegend>No games</S.InfoLegend>

          <EmptyGamesSvg height={RFValue(164)} />

          <S.InfoMessage>
            You still don't have registered games...
          </S.InfoMessage>
        </S.EmptyContent>
      )}

      {betsFiltered.length > 0 && (
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
                const isActive = selectedTypesFilter.some(
                  (typeFilter) => typeFilter.id === item.id
                );
                const color = item.color;

                return (
                  <S.TypeFilterButton
                    active={isActive}
                    color={color}
                    onPress={() => handleToggleFilterSelectionByTypeId(item.id)}
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
            data={betsFiltered}
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
