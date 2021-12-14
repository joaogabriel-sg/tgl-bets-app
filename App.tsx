import "intl";
import "intl/locale-data/jsonp/pt-BR";

import "react-native-gesture-handler";

import React from "react";
import { StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
} from "@expo-google-fonts/roboto";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { Routes } from "./src/routes";

import { store } from "./src/store";

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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
          translucent
        />
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}
