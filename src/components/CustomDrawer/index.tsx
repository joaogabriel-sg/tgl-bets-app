import React from "react";
import { useTheme } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { useReduxDispatch, useReduxSelector } from "@shared/hooks";

import { selectUser } from "@store/slices/auth/selectors";
import { logoutUser } from "@store/slices/auth/actions";

import * as S from "./styles";

interface Props extends DrawerContentComponentProps {}

export function CustomDrawer(props: Props) {
  const theme = useTheme();

  const user = useReduxSelector(selectUser)!;
  const dispatch = useReduxDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <S.Container>
      <DrawerContentScrollView {...props}>
        <S.Header>
          <S.Name>{user.name}</S.Name>
          <S.Email numberOfLines={1}>{user.email}</S.Email>
        </S.Header>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <S.LogoutButtonWrapper>
        <S.LogoutButton onPress={handleLogout}>
          <MaterialIcons
            name="logout"
            size={32}
            color={theme.colors.shape_light}
          />
        </S.LogoutButton>
      </S.LogoutButtonWrapper>
    </S.Container>
  );
}
