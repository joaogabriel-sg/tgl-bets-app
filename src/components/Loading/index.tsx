import React from "react";
import { ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import * as S from "./styles";

export function Loading() {
  const theme = useTheme();

  return (
    <S.Container>
      <ActivityIndicator size={RFValue(64)} color={theme.colors.primary} />
    </S.Container>
  );
}
