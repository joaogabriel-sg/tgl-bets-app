import React from "react";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import * as S from "./styles";

export function AppHeader() {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  function handleToggleDrawerMenu() {
    navigation.toggleDrawer();
  }

  return (
    <S.Container>
      <S.LogoWrapper>
        <S.Logo>TGL</S.Logo>
        <S.LogoDetail />
      </S.LogoWrapper>

      <S.MenuButton onPress={handleToggleDrawerMenu}>
        <Feather name="menu" size={RFValue(24)} color={theme.colors.text_700} />
      </S.MenuButton>
    </S.Container>
  );
}
