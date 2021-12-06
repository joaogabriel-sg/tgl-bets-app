import React from "react";

import { AuthHeader, Button, Footer, InputForm } from "../../components";

import * as S from "./styles";

export function Registration() {
  return (
    <S.Container>
      <S.Content>
        <AuthHeader screenTitle="Registration" />

        <S.Form>
          <InputForm placeholder="Name" keyboardType="default" />

          <InputForm placeholder="Email" keyboardType="email-address" />

          <InputForm placeholder="Password" secureTextEntry />

          <Button isPrimary title="Register" />
        </S.Form>

        <Button title="Back" arrowPosition="left" />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
