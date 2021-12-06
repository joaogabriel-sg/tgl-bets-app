import React, { useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  AuthHeader,
  Button,
  Footer,
  HelperButton,
  InputForm,
} from "../../components";

import { RootStackParamList } from "../../routes";

import * as S from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Authentication">;

export function Authentication({ navigation }: Props) {
  const containerRef = useRef<ScrollView>(null);

  function handleNavigateToResetPassword() {
    navigation.navigate("ResetPassword");
  }

  function handleNavigateToRegistration() {
    navigation.navigate("Registration");
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      containerRef.current?.scrollTo({ animated: false, x: 0, y: 0 });
    });

    return unsubscribe;
  }, []);

  return (
    <S.Container ref={containerRef}>
      <S.Content>
        <AuthHeader screenTitle="Authentication" />

        <S.Form>
          <InputForm placeholder="Email" keyboardType="email-address" />

          <InputForm placeholder="Password" secureTextEntry />

          <HelperButton
            title="I forget my password"
            onPress={handleNavigateToResetPassword}
          />

          <Button isPrimary title="Log in" />
        </S.Form>

        <Button title="Sign Up" onPress={handleNavigateToRegistration} />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
