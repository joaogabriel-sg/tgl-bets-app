import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
} from "@expo-google-fonts/roboto";
import { ThemeProvider } from "styled-components";

import { AppRoutes } from "./src/routes";

import { theme } from "./src/shared/styles";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}
