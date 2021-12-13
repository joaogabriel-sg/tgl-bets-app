import React from "react";
import { Platform } from "react-native";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  AppHeader,
  Button,
  Footer,
  InputForm,
  ScreenTitle,
} from "../../components";

import { useReduxSelector } from "../../shared/hooks";

import { selectUser } from "../../store/slices/auth/selectors";

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
  const user = useReduxSelector(selectUser)!;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleChangeAccountSettings(data: FormData) {}

  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <AppHeader />

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
