import React from "react";
import { TextInput, TextInputProps } from "react-native";

import * as S from "./styles";

interface Props extends TextInputProps {}

export const Input = React.forwardRef<TextInput, Props>(({ ...props }, ref) => {
  return <S.Container ref={ref} {...props}></S.Container>;
});
