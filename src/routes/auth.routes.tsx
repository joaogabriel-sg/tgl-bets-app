import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Authentication,
  ChangePassword,
  Registration,
  ResetPassword,
} from "@screens";

import { RootStackParamList } from "./types";

const AuthStack = createNativeStackNavigator<RootStackParamList>();

export function AuthRoutes() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Authentication" component={Authentication} />
      <AuthStack.Screen name="Registration" component={Registration} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      <AuthStack.Screen name="ChangePassword" component={ChangePassword} />
    </AuthStack.Navigator>
  );
}
