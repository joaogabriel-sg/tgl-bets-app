import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";

export function AppRoutes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}

export * from "./types";
