import React, { ReactNode } from "react";

import * as S from "./styles";

interface Props {
  children: ReactNode | ReactNode[];
}

export function ScreenTitle({ children }: Props) {
  return <S.Container>{children}</S.Container>;
}
