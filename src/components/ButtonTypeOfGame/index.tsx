import React from "react";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";

import * as S from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
  isActive: boolean;
  color?: string;
}

export function ButtonTypeOfGame({ title, isActive, color, ...rest }: Props) {
  const theme = useTheme();
  const buttonColor = color ? color : theme.colors.primary;

  return (
    <S.Container isActive={isActive} color={buttonColor} {...rest}>
      <S.Title isActive={isActive} color={buttonColor}>
        {title}
      </S.Title>
    </S.Container>
  );
}
