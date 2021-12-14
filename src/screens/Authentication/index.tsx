import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, TextInput } from "react-native";

import { NavigationProp, useNavigation } from "@react-navigation/native";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  AuthHeader,
  Button,
  Card,
  Footer,
  HelperButton,
  InputForm,
  Loading,
} from "../../components";

import { RootStackParamList } from "../../routes";

import { useReduxDispatch } from "../../shared/hooks";

import {
  loadUserStorageData,
  loginUser,
} from "../../store/slices/auth/actions";

import * as S from "./styles";

interface FormData {
  email: string;
  password: string;
}

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

export function Authentication() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<ScrollView>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
      await dispatch(loginUser(data)).unwrap();
    } catch (err: any) {
      Alert.alert(err.message, "", [{ text: "Okay" }]);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      containerRef.current?.scrollTo({ animated: false, x: 0, y: 0 });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function getStorageUserData() {
      try {
        await dispatch(loadUserStorageData()).unwrap();
      } catch {
        setIsLoading(false);
      }
    }

    getStorageUserData();
  }, []);

  return (
    <S.Container ref={containerRef} scrollEnabled={!isLoading}>
      {isLoading && <Loading />}

      <S.Content>
        <AuthHeader screenTitle="Authentication" />

        <Card>
          <S.InputWrapper>
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
          </S.InputWrapper>

          <S.InputWrapper>
            <InputForm
              name="password"
              control={control}
              error={errors.password && errors.password.message}
              placeholder="Password"
              secureTextEntry
              ref={passwordInputRef}
              onSubmitEditing={handleSubmit(handleAuthenticate)}
            />
          </S.InputWrapper>

          <HelperButton
            title="I forget my password"
            onPress={handleNavigateToResetPassword}
          />

          <Button
            isPrimary
            title="Log in"
            onPress={handleSubmit(handleAuthenticate)}
          />
        </Card>

        <Button title="Sign Up" onPress={handleNavigateToRegistration} />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
