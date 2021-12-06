import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

interface Props extends TouchableOpacityProps {
  isPrimary?: boolean;
  title: string;
}

export function Button({ isPrimary, title, ...props }: Props) {
  return (
    <S.Container>
      <S.Button {...props}>
        <S.Title isPrimary={isPrimary}>{title}</S.Title>
        <S.Icon name="arrow-right" isPrimary={isPrimary} />
      </S.Button>
    </S.Container>
  );
}
