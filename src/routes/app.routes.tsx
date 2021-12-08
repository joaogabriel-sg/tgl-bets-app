import React from "react";
import { useTheme } from "styled-components";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Account, Home, NewBet } from "../screens";

import { RootStackParamList } from "./types";

const AppDrawer = createDrawerNavigator<RootStackParamList>();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <AppDrawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: theme.colors.shape_dark,
        drawerActiveBackgroundColor: theme.colors.shape_light,
        drawerInactiveTintColor: theme.colors.shape_light,
        drawerContentStyle: {
          backgroundColor: theme.colors.primary,
        },
        drawerLabelStyle: {
          fontFamily: theme.fonts.primary_700_italic,
          fontSize: 16,
        },
      }}
    >
      <AppDrawer.Screen
        name="Home"
        component={Home}
        options={{ title: "My Games" }}
      />
      <AppDrawer.Screen
        name="NewBet"
        component={NewBet}
        options={{ title: "New Bet" }}
      />
      <AppDrawer.Screen
        name="Account"
        component={Account}
        options={{ title: "My Account" }}
      />
    </AppDrawer.Navigator>
  );
}
