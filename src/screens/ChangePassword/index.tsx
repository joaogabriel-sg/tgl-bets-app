import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView } from "react-native";

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

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
} from "@components";

import { RootStackParamList } from "@routes";

import { useReduxDispatch } from "@shared/hooks";
import { api } from "@shared/services";

import * as S from "./styles";

interface FormData {
  password: string;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required!")
    .test(
      "len",
      "Must be greater than or equals to 8 characters!",
      (value) => !!value && value.length >= 8
    ),
});

export function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<ScrollView>(null);

  const dispatch = useReduxDispatch();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const routes = useRoute<RouteProp<RootStackParamList, "ChangePassword">>();

  const { token } = routes.params;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleChangePassword(formData: FormData) {
    try {
      setIsLoading(true);

      const { password } = formData;
      await api.post(`/reset/${token}`, { password });

      Alert.alert("Password changed successfully!");
      navigation.navigate("Authentication");
    } catch {
      setIsLoading(false);
      Alert.alert("Something went wrong, please contact our support!");
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
        <AuthHeader screenTitle="Change Password" />

        <Card>
          <S.InputWrapper>
            <InputForm
              name="password"
              control={control}
              error={errors.password && errors.password.message}
              placeholder="New password"
              secureTextEntry
              onSubmitEditing={handleSubmit(handleChangePassword)}
            />
          </S.InputWrapper>

          <Button
            isPrimary
            title="Save new password"
            onPress={handleSubmit(handleChangePassword)}
          />
        </Card>
      </S.Content>

      <Footer />
    </S.Container>
  );
}
