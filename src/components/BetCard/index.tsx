import React from "react";
import { format, parseISO } from "date-fns";

import { formatCurrencyToBRL } from "@shared/utils";
import { IBet } from "@shared/types";

import * as S from "./styles";

interface Props {
  bet: IBet;
}

export function BetCard({ bet }: Props) {
  const formattedNumbers = bet.choosen_numbers
    .split(",")
    .map((number) => `${number}`.padStart(2, "0"))
    .join(", ");

  return (
    <S.Container>
      <S.DetailLeft color={bet.type.color} />
      <S.Description>
        <S.Numbers>{formattedNumbers}</S.Numbers>
        <S.DateAndPrice>
          {format(parseISO(bet.created_at), "dd/MM/yyyy")} - (
          {formatCurrencyToBRL(bet.price)})
        </S.DateAndPrice>
        <S.Type color={bet.type.color}>{bet.type.type}</S.Type>
      </S.Description>
    </S.Container>
  );
}
