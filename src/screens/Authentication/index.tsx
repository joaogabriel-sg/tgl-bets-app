import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  AuthHeader,
  Button,
  Footer,
  HelperButton,
  InputForm,
  Loading,
} from "../../components";

import { RootStackParamList } from "../../routes";

import { useReduxDispatch } from "../../shared/hooks";

import { loginUser } from "../../store/slices/auth/actions";

import * as S from "./styles";

interface FormData {
  email: string;
  password: string;
}

type Props = NativeStackScreenProps<RootStackParamList, "Authentication">;

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required!")
    .email("Invalid email address!"),
  password: yup
    .string()
    .required("Password is required!")
    .test(
      "len",
      "Must be greater than or equals to 8 characters!",
      (value) => !!value && value.length >= 8
    ),
});

export function Authentication({ navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<ScrollView>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const dispatch = useReduxDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleNavigateToResetPassword() {
    navigation.navigate("ResetPassword");
  }

  function handleNavigateToRegistration() {
    navigation.navigate("Registration");
  }

  async function handleAuthenticate(data: FormData) {
    try {
      setIsLoading(true);
      await delay();
      await dispatch(loginUser(data)).unwrap();
    } catch (err: any) {
      Alert.alert(err.message, "", [{ text: "Okay" }]);
      setIsLoading(false);
    }
  }

  function delay(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      containerRef.current?.scrollTo({ animated: false, x: 0, y: 0 });
    });

    return unsubscribe;
  }, []);

  return (
    <S.Container ref={containerRef} scrollEnabled={!isLoading}>
      {isLoading && <Loading />}

      <S.Content>
        <AuthHeader screenTitle="Authentication" />

        <S.Form>
          <InputForm
            name="email"
            control={control}
            error={errors.email && errors.email.message}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />

          <InputForm
            name="password"
            control={control}
            error={errors.password && errors.password.message}
            placeholder="Password"
            secureTextEntry
            ref={passwordInputRef}
            onSubmitEditing={handleSubmit(handleAuthenticate)}
          />

          <HelperButton
            title="I forget my password"
            onPress={handleNavigateToResetPassword}
          />

          <Button
            isPrimary
            title="Log in"
            onPress={handleSubmit(handleAuthenticate)}
          />
        </S.Form>

        <Button title="Sign Up" onPress={handleNavigateToRegistration} />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
