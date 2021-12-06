import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

interface Props extends TouchableOpacityProps {
  isPrimary?: boolean;
  title: string;
  arrowPosition?: "right" | "left";
}

export function Button({
  isPrimary,
  title,
  arrowPosition = "right",
  ...props
}: Props) {
  if (arrowPosition === "left") {
    return (
      <S.Container>
        <S.Button {...props}>
          <S.Icon name="arrow-left" isPrimary={isPrimary} />
          <S.Title isPrimary={isPrimary}>{title}</S.Title>
        </S.Button>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Button {...props}>
        <S.Title isPrimary={isPrimary}>{title}</S.Title>
        <S.Icon name="arrow-right" isPrimary={isPrimary} />
      </S.Button>
    </S.Container>
  );
}
