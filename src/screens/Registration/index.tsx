import React, { useEffect, useRef } from "react";
import { Alert, ScrollView, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthHeader, Button, Footer, InputForm } from "../../components";

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

export function Registration({ navigation }: Props) {
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
      await dispatch(createNewUser(data)).unwrap();
      reset();
    } catch (err: any) {
      Alert.alert(err.message, "", [{ text: "Okay" }]);
    }
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

          <InputForm
            name="password"
            control={control}
            error={errors.password && errors.password.message}
            placeholder="Password"
            secureTextEntry
            ref={passwordInputRef}
            onSubmitEditing={handleSubmit(handleRegisterNewUser)}
          />

          <Button
            isPrimary
            title="Register"
            onPress={handleSubmit(handleRegisterNewUser)}
          />
        </S.Form>

        <Button title="Back" arrowPosition="left" onPress={handleGoBack} />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
