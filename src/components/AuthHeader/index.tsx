import React from "react";

import * as S from "./styles";

interface Props {
  screenTitle: string;
}

export function AuthHeader({ screenTitle }: Props) {
  return (
    <S.Container>
      <S.Title>The Greatest App</S.Title>
      <S.HighlightedTitle>for</S.HighlightedTitle>
      <S.EmphasizedTitle>Lottery</S.EmphasizedTitle>
      <S.ScreenTitle>{screenTitle}</S.ScreenTitle>
    </S.Container>
  );
}
