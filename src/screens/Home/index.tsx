import React from "react";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { AppHeader, Footer } from "../../components";

import EmptyGamesSvg from "../../shared/assets/empty-games.svg";

import { RootStackParamList } from "../../routes";

import * as S from "./styles";

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function handleNavigateToNewBet() {
    navigation.navigate("NewBet");
  }

  return (
    <S.Container>
      <AppHeader />

      <S.EmptyContent>
        <S.ScreenTitle>Recent Games</S.ScreenTitle>

        <S.InfoLegend>No games</S.InfoLegend>

        <EmptyGamesSvg height={RFValue(164)} />

        <S.InfoMessage>You still don't have registered games...</S.InfoMessage>
      </S.EmptyContent>

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
