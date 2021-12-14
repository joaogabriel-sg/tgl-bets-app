import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useReduxSelector } from "@shared/hooks";

import { selectUser } from "@store/slices/auth/selectors";

export function Routes() {
  const user = useReduxSelector(selectUser);

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}

export * from "./types";
