import React, { useEffect, useRef } from "react";
import { ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthHeader, Button, Footer, InputForm } from "../../components";

import { RootStackParamList } from "../../routes";

import * as S from "./styles";

interface FormData {
  email: string;
}

type Props = NativeStackScreenProps<RootStackParamList, "Authentication">;

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required!")
    .email("Invalid email address!"),
});

export function ResetPassword({ navigation }: Props) {
  const containerRef = useRef<ScrollView>(null);

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

  function handleSendResetPasswordLink(data: FormData) {
    reset();
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
        <AuthHeader screenTitle="Reset Password" />

        <S.Form>
          <InputForm
            name="email"
            control={control}
            error={errors.email && errors.email.message}
            placeholder="Email"
            keyboardType="email-address"
            onSubmitEditing={handleSubmit(handleSendResetPasswordLink)}
          />

          <Button
            isPrimary
            title="Send link"
            onPress={handleSubmit(handleSendResetPasswordLink)}
          />
        </S.Form>

        <Button title="Back" arrowPosition="left" onPress={handleGoBack} />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
