import React from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { formatCurrencyToBRL } from "@shared/utils";
import { ICartGame } from "@shared/types";

import * as S from "./styles";

interface Props {
  cartGame: ICartGame;
  onDelete: () => void;
}

export function CartGame({ cartGame, onDelete }: Props) {
  const theme = useTheme();

  return (
    <S.Container>
      <S.DeleteButton onPress={onDelete}>
        <Feather name="trash-2" size={26} color={theme.colors.text_600} />
      </S.DeleteButton>

      <S.Details color={cartGame.color}>
        <S.Numbers>
          {cartGame.numbers
            .map((number) => `${number}`.padStart(2, "0"))
            .join(", ")}
        </S.Numbers>
        <S.Footer>
          <S.Type color={cartGame.color}>{cartGame.type}</S.Type>
          <S.Price>{formatCurrencyToBRL(cartGame.price)}</S.Price>
        </S.Footer>
      </S.Details>
    </S.Container>
  );
}
