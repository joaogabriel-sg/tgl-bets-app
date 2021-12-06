import React from "react";
import { TextInputProps } from "react-native";

import * as S from "./styles";

interface Props extends TextInputProps {}

export function Input({ ...props }: Props) {
  return <S.Container {...props}></S.Container>;
}
