import React from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

import EmptyGamesSvg from "../../shared/assets/empty-games.svg";

import { formatCurrencyToBRL } from "../../shared/utils";

import * as S from "./styles";

interface Props {
  handleCloseCart: () => void;
}

export function Cart({ handleCloseCart }: Props) {
  const theme = useTheme();

  return (
    <S.Container>
      <S.Content>
        <S.TitleContainer>
          <S.Title>Cart</S.Title>

          <S.CloseCartButton onPress={handleCloseCart}>
            <Feather name="x" size={24} color={theme.colors.error} />
          </S.CloseCartButton>
        </S.TitleContainer>

        <S.EmptyCartWrapper>
          <EmptyGamesSvg height={RFValue(132)} />
          <S.EmptyCartMessage>Your cart is empty...</S.EmptyCartMessage>
        </S.EmptyCartWrapper>

        <S.TitleContainer>
          <S.Title>
            Cart <S.Total>Total: {formatCurrencyToBRL(0)}</S.Total>
          </S.Title>
        </S.TitleContainer>
      </S.Content>

      <S.SaveButton>
        <S.SaveButtonText>
          Save{" "}
          <Feather name="arrow-right" size={35} color={theme.colors.success} />
        </S.SaveButtonText>
      </S.SaveButton>
    </S.Container>
  );
}
