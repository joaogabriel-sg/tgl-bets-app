import React from "react";
import { useTheme } from "styled-components";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { Account, Home, NewBet } from "@screens";
import { CustomDrawer } from "@components";

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
        drawerLabelStyle: {
          marginLeft: -16,
          fontFamily: theme.fonts.primary_700_italic,
          fontSize: 16,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <AppDrawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "My Games",
          drawerIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "md-home" : "md-home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <AppDrawer.Screen
        name="NewBet"
        component={NewBet}
        options={{
          title: "New Bet",
          drawerIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "md-add-circle" : "md-add-circle-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <AppDrawer.Screen
        name="Account"
        component={Account}
        options={{
          title: "My Account",
          drawerIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "md-person" : "md-person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </AppDrawer.Navigator>
  );
}
