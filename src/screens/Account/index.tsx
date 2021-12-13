import React, { useState } from "react";
import { Alert, Platform } from "react-native";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  AppHeader,
  Button,
  Footer,
  InputForm,
  Loading,
  ScreenTitle,
} from "../../components";

import { useReduxDispatch, useReduxSelector } from "../../shared/hooks";

import { selectUser } from "../../store/slices/auth/selectors";
import { updateUserData } from "../../store/slices/auth/actions";

import * as S from "./styles";

interface FormData {
  name: string;
  email: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup
    .string()
    .required("Email is required!")
    .email("Invalid email address!"),
});

export function Account() {
  const [isLoading, setIsLoading] = useState(false);

  const user = useReduxSelector(selectUser)!;
  const dispatch = useReduxDispatch();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleChangeAccountSettings(data: FormData) {
    try {
      setIsLoading(true);
      await dispatch(updateUserData(data));
      Alert.alert("Account data changed successfully!");
    } catch (err: any) {
      Alert.alert(err.message, "", [{ text: "Okay" }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <AppHeader />

      {isLoading && <Loading />}

      <S.ScreenTitleContainer>
        <ScreenTitle>Account Settings</ScreenTitle>
      </S.ScreenTitleContainer>

      <S.Content>
        <S.FieldWrapper>
          <S.InputLabel>Name</S.InputLabel>
          <S.InputWrapper>
            <InputForm
              control={control}
              name="name"
              error={errors.name ? errors.name.message! : ""}
              keyboardType="default"
              defaultValue={user.name}
            />
          </S.InputWrapper>
        </S.FieldWrapper>

        <S.FieldWrapper>
          <S.InputLabel>E-mail</S.InputLabel>
          <S.InputWrapper>
            <InputForm
              control={control}
              name="email"
              error={errors.email ? errors.email.message! : ""}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={user.email}
            />
          </S.InputWrapper>
        </S.FieldWrapper>

        <Button
          isPrimary
          title="Save"
          onPress={handleSubmit(handleChangeAccountSettings)}
        />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
