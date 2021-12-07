import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Account, Home, NewBet } from "../screens";

import { RootStackParamList } from "./types";

const AppStack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <AppStack.Screen name="Account" component={Account} />
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="NewBet" component={NewBet} />
    </AppStack.Navigator>
  );
}
