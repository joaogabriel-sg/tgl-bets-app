import React from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

import EmptyGamesSvg from "../../shared/assets/empty-games.svg";

import { useReduxDispatch, useReduxSelector } from "../../shared/hooks";
import { formatCurrencyToBRL } from "../../shared/utils";

import {
  selectCartGames,
  selectCartTotalValue,
} from "../../store/slices/cart/selectors";

import * as S from "./styles";
import { removeFromCart } from "../../store/slices/cart";

interface Props {
  handleCloseCart: () => void;
}

export function Cart({ handleCloseCart }: Props) {
  const cartGames = useReduxSelector(selectCartGames);
  const cartTotalValue = useReduxSelector(selectCartTotalValue);

  const dispatch = useReduxDispatch();

  const theme = useTheme();

  function handleRemoveCartGame(id: string) {
    dispatch(removeFromCart({ id }));
  }

  return (
    <S.Container>
      <S.Content>
        <S.TitleContainer>
          <S.Title>Cart</S.Title>

          <S.CloseCartButton onPress={handleCloseCart}>
            <Feather name="x" size={24} color={theme.colors.error} />
          </S.CloseCartButton>
        </S.TitleContainer>

        {cartGames.length === 0 && (
          <S.EmptyCartWrapper>
            <EmptyGamesSvg height={RFValue(132)} />
            <S.EmptyCartMessage>Your cart is empty...</S.EmptyCartMessage>
          </S.EmptyCartWrapper>
        )}

        {cartGames.length > 0 && (
          <S.CartGames
            data={cartGames}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <S.CartGame>
                <S.DeleteButton onPress={() => handleRemoveCartGame(item.id)}>
                  <Feather
                    name="trash-2"
                    size={26}
                    color={theme.colors.text_600}
                  />
                </S.DeleteButton>

                <S.Details color={item.color}>
                  <S.Numbers>
                    {item.numbers
                      .map((number) => `${number}`.padStart(2, "0"))
                      .join(", ")}
                  </S.Numbers>
                  <S.Footer>
                    <S.Type color={item.color}>{item.type}</S.Type>
                    <S.Price>{formatCurrencyToBRL(item.price)}</S.Price>
                  </S.Footer>
                </S.Details>
              </S.CartGame>
            )}
          />
        )}

        <S.TitleContainer>
          <S.Title>
            Cart <S.Total>Total: {formatCurrencyToBRL(cartTotalValue)}</S.Total>
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
