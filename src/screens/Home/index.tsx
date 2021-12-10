import React, { useCallback, useState } from "react";
import { Alert, FlatList, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

import { AppHeader, Footer, Loading } from "../../components";

import EmptyGamesSvg from "../../shared/assets/empty-games.svg";

import { RootStackParamList } from "../../routes";

import { useReduxDispatch, useReduxSelector } from "../../shared/hooks";

import { fetchUserBets } from "../../store/slices/bets/actions";
import { selectBets } from "../../store/slices/bets/selectors";

import * as S from "./styles";
import { format, parseISO } from "date-fns";
import { formatCurrencyToBRL } from "../../shared/utils";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const bets = useReduxSelector(selectBets);

  const dispatch = useReduxDispatch();

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
          <FlatList
            data={bets}
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
                      {format(parseISO(item.created_at), "dd/MM/yyyy")}{" "}
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
