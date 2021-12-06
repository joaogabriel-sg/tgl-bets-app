import React, { useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AuthHeader, Button, Footer, InputForm } from "../../components";

import { RootStackParamList } from "../../routes";

import * as S from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Authentication">;

export function Registration({ navigation }: Props) {
  const containerRef = useRef<ScrollView>(null);

  function handleGoBack() {
    navigation.goBack();
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
        <AuthHeader screenTitle="Registration" />

        <S.Form>
          <InputForm placeholder="Name" keyboardType="default" />

          <InputForm placeholder="Email" keyboardType="email-address" />

          <InputForm placeholder="Password" secureTextEntry />

          <Button isPrimary title="Register" />
        </S.Form>

        <Button title="Back" arrowPosition="left" onPress={handleGoBack} />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
