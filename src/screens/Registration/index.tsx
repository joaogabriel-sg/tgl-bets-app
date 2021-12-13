import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  AuthHeader,
  Button,
  Card,
  Footer,
  InputForm,
  Loading,
} from "../../components";

import { RootStackParamList } from "../../routes";

import { useReduxDispatch } from "../../shared/hooks";

import { createNewUser } from "../../store/slices/auth/actions";

import * as S from "./styles";

interface FormData {
  name: string;
  email: string;
  password: string;
}

type Props = NativeStackScreenProps<RootStackParamList, "Authentication">;

const schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
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

function delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Registration({ navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<ScrollView>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const dispatch = useReduxDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleRegisterNewUser(data: FormData) {
    try {
      setIsLoading(true);
      await delay();
      await dispatch(createNewUser(data)).unwrap();
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

  return (
    <S.Container ref={containerRef} scrollEnabled={!isLoading}>
      {isLoading && <Loading />}

      <S.Content>
        <AuthHeader screenTitle="Registration" />

        <Card>
          <S.InputWrapper>
            <InputForm
              name="name"
              control={control}
              error={errors.name && errors.name.message}
              placeholder="Name"
              keyboardType="default"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
          </S.InputWrapper>

          <S.InputWrapper>
            <InputForm
              name="email"
              control={control}
              error={errors.email && errors.email.message}
              placeholder="Email"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              blurOnSubmit={false}
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
              onSubmitEditing={handleSubmit(handleRegisterNewUser)}
            />
          </S.InputWrapper>

          <Button
            isPrimary
            title="Register"
            onPress={handleSubmit(handleRegisterNewUser)}
          />
        </Card>

        <Button title="Back" arrowPosition="left" onPress={handleGoBack} />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
