import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView } from "react-native";

import { NavigationProp, useNavigation } from "@react-navigation/native";

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

import * as S from "./styles";
import { api } from "../../shared/services";
import axios, { AxiosError } from "axios";

interface FormData {
  email: string;
}

interface IResetPasswordApi {
  id: number;
  email: string;
  name: string;
  token: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required!")
    .email("Invalid email address!"),
});

export function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<ScrollView>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSendResetPasswordLink(formData: FormData) {
    try {
      setIsLoading(true);

      const { email } = formData;
      const { data } = await api.post<IResetPasswordApi>("/reset", { email });

      navigation.navigate("ChangePassword", { token: data.token });
    } catch (err: any) {
      let errorMessage = "Something went wrong, please contact our support!";

      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError;
        if (serverError && serverError.response)
          errorMessage = serverError.response.data.message as string;
      }

      setIsLoading(false);
      Alert.alert(errorMessage);
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
      {isLoading && <Loading />}

      <S.Content>
        <AuthHeader screenTitle="Reset Password" />

        <Card>
          <S.InputWrapper>
            <InputForm
              name="email"
              control={control}
              error={errors.email && errors.email.message}
              placeholder="Email"
              keyboardType="email-address"
              onSubmitEditing={handleSubmit(handleSendResetPasswordLink)}
            />
          </S.InputWrapper>

          <Button
            isPrimary
            title="Send link"
            onPress={handleSubmit(handleSendResetPasswordLink)}
          />
        </Card>

        <Button title="Back" arrowPosition="left" onPress={handleGoBack} />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
