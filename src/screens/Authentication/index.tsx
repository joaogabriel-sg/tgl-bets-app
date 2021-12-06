import React from "react";

import {
  AuthHeader,
  Button,
  Footer,
  HelperButton,
  InputForm,
} from "../../components";

import * as S from "./styles";

export function Authentication() {
  return (
    <S.Container>
      <S.Content>
        <AuthHeader screenTitle="Authentication" />

        <S.Form>
          <InputForm placeholder="Email" keyboardType="email-address" />

          <InputForm placeholder="Password" secureTextEntry />

          <HelperButton title="I forget my password" />

          <Button isPrimary title="Log in" />
        </S.Form>

        <Button title="Sign Up" />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
