import React, { useState } from "react";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { CartGame, Loading, ScreenTitle } from "../../components";

import EmptyGamesSvg from "../../shared/assets/empty-games.svg";

import { RootStackParamList } from "../../routes";

import { useReduxDispatch, useReduxSelector } from "../../shared/hooks";
import { formatCurrencyToBRL } from "../../shared/utils";

import {
  selectCartGames,
  selectCartTotalValue,
} from "../../store/slices/cart/selectors";
import { selectMinCartValue } from "../../store/slices/games/selectors";
import { removeFromCart } from "../../store/slices/cart";
import { saveNewBet } from "../../store/slices/cart/actions";

import * as S from "./styles";

interface Props {
  handleCloseCart: () => void;
}

export function Cart({ handleCloseCart }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const cartGames = useReduxSelector(selectCartGames);
  const cartTotalValue = useReduxSelector(selectCartTotalValue);
  const minCartValue = useReduxSelector(selectMinCartValue);

  const dispatch = useReduxDispatch();

  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function handleRemoveCartGame(id: string) {
    dispatch(removeFromCart({ id }));
  }

  async function handleSaveCartGames() {
    try {
      setIsLoading(true);

      if (cartTotalValue < minCartValue) return;

      const newBet = {
        games: cartGames.map((cartGame) => ({
          id: cartGame.gameId,
          numbers: cartGame.numbers,
        })),
      };

      await dispatch(saveNewBet(newBet));
      navigation.navigate("Home");
    } catch (err: any) {
      Alert.alert(err.message, "", [{ text: "Okay" }]);
      setIsLoading(false);
    }
  }

  return (
    <S.Container>
      {isLoading && <Loading />}

      <S.Content>
        <S.TitleContainer>
          <ScreenTitle>Cart</ScreenTitle>

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
              <CartGame
                cartGame={item}
                onDelete={() => handleRemoveCartGame(item.id)}
              />
            )}
          />
        )}

        <S.TitleContainer>
          <ScreenTitle>
            Cart <S.Total>Total: {formatCurrencyToBRL(cartTotalValue)}</S.Total>
          </ScreenTitle>
        </S.TitleContainer>
      </S.Content>

      <S.SaveButton onPress={handleSaveCartGames}>
        <S.SaveButtonText>
          Save{" "}
          <Feather name="arrow-right" size={35} color={theme.colors.success} />
        </S.SaveButtonText>
      </S.SaveButton>
    </S.Container>
  );
}
