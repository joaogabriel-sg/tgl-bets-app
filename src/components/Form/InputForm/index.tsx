import React from "react";
import { TextInputProps } from "react-native";

import { Input } from "../Input";

import * as S from "./styles";

interface Props extends TextInputProps {}

export function InputForm({ ...props }: Props) {
  return (
    <S.Container>
      <Input {...props} />
    </S.Container>
  );
}
