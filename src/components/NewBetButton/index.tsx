import React from "react";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "@routes";

import * as S from "./styles";

export function NewBetButton() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function handleNavigateToNewBet() {
    navigation.navigate("NewBet");
  }

  return (
    <S.Container onPress={handleNavigateToNewBet}>
      <S.Title>New Bet</S.Title>
      <Feather
        name="arrow-right"
        size={RFValue(24)}
        color={theme.colors.shape_light}
      />
    </S.Container>
  );
}
