import React, { ReactNode } from "react";

import * as S from "./styles";

interface Props {
  title: string;
  icon?: ReactNode;
  isOutlined?: boolean;
  onPress: () => void;
}

export function ControlButton({ title, icon, isOutlined, onPress }: Props) {
  if (isOutlined) {
    return (
      <S.ButtonOpacity isOutlined={isOutlined} onPress={onPress}>
        {icon}
        <S.Title isOutlined={isOutlined}>{title}</S.Title>
      </S.ButtonOpacity>
    );
  }

  return (
    <S.ButtonNative onPress={onPress}>
      {icon}
      <S.Title isOutlined={isOutlined}>{title}</S.Title>
    </S.ButtonNative>
  );
}
