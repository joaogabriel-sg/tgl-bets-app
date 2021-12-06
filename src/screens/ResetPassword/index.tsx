import React from "react";

import { AuthHeader, Button, Footer, InputForm } from "../../components";

import * as S from "./styles";

export function ResetPassword() {
  return (
    <S.Container>
      <S.Content>
        <AuthHeader screenTitle="Reset Password" />

        <S.Form>
          <InputForm placeholder="Email" keyboardType="email-address" />

          <Button isPrimary title="Send link" />
        </S.Form>

        <Button title="Back" arrowPosition="left" />
      </S.Content>

      <Footer />
    </S.Container>
  );
}
