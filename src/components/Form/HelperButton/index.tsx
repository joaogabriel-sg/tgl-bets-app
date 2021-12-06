import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
}

export function HelperButton({ title, ...props }: Props) {
  return (
    <S.Container>
      <S.Button {...props}>
        <S.Title>{title}</S.Title>
      </S.Button>
    </S.Container>
  );
}
