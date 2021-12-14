import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import uuid from "react-native-uuid";

import { Cart } from "../Cart";
import {
  AppHeader,
  ButtonTypeOfGame,
  ControlButton,
  Footer,
  Loading,
  ScreenTitle,
} from "@components";

import { useReduxDispatch, useReduxSelector } from "@shared/hooks";

import { fetchGames } from "@store/slices/games/actions";
import { selectGames } from "@store/slices/games/selectors";
import { addToCart } from "@store/slices/cart";

import { sortArray } from "@shared/utils";
import { ITypeOfGame } from "@shared/types";

import * as S from "./styles";

export function NewBet() {
  const games = useReduxSelector(selectGames);
  const dispatch = useReduxDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<ITypeOfGame | null>(null);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const gameNumbers = useMemo(() => {
    if (!selectedGame) return [];

    return Array.from({ length: selectedGame.range }).map(
      (_, index) => index + 1
    );
  }, [selectedGame]);

  const fetchGamesInApi = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchGames());
    } catch (err: any) {
      Alert.alert(err.message, "", [{ text: "Okay" }]);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  function handleSelectGameById(id: number) {
    const newSelectedGame = games.find((game) => game.id === id)!;

    setSelectedGame(newSelectedGame);
    handleClearGame();
  }

  function handleToggleNumberSelection(number: number) {
    setSelectedNumbers((prevSelectedNumbers) => {
      if (prevSelectedNumbers.includes(number)) {
        const filteredNumbers = prevSelectedNumbers.filter(
          (prevSelectedNumber) => prevSelectedNumber !== number
        );
        return sortArray(filteredNumbers);
      }

      if (!selectedGame) {
        Alert.alert(
          `Oops...you didn't select a game!`,
          `Please select a game to continue.`
        );
        return prevSelectedNumbers;
      }

      if (selectedGame.max_number > prevSelectedNumbers.length)
        return sortArray([...prevSelectedNumbers, number]);

      Alert.alert(
        "Oops...",
        `You have already selected ${selectedGame.max_number} number.`
      );
      return prevSelectedNumbers;
    });
  }

  function handleAddToCart() {
    if (!selectedGame) return;

    const remainingQuantity = selectedGame.max_number - selectedNumbers.length;

    if (remainingQuantity !== 0) {
      const numbersWord = remainingQuantity === 1 ? "number" : "numbers";
      Alert.alert(
        "Incomplete bet!",
        `Please select ${remainingQuantity} ${numbersWord}.`
      );
      return;
    }

    const newCartGame = {
      id: uuid.v4().toString(),
      gameId: selectedGame.id,
      type: selectedGame.type,
      numbers: selectedNumbers,
      color: selectedGame.color,
      price: selectedGame.price,
    };

    dispatch(addToCart(newCartGame));
    handleClearGame();
  }

  function handleCompleteGame() {
    if (!selectedGame) return;

    const newNumbers: number[] = [...selectedNumbers];

    while (newNumbers.length < selectedGame.max_number) {
      const newNumber = Math.floor(Math.random() * selectedGame.range) + 1;

      if (!newNumbers.includes(newNumber)) newNumbers.push(newNumber);
    }

    setSelectedNumbers(sortArray(newNumbers));
  }

  function handleClearGame() {
    setSelectedNumbers([]);
  }

  function handleOpenCart() {
    setIsCartOpen(true);
  }

  function handleCloseCart() {
    setIsCartOpen(false);
  }

  useEffect(() => {
    if (games.length > 0) setSelectedGame(games[0]);
  }, [games]);

  useFocusEffect(
    useCallback(() => {
      fetchGamesInApi();
    }, [fetchGamesInApi])
  );

  return (
    <S.Container>
      <AppHeader />

      {isLoading && <Loading />}

      {!!selectedGame && (
        <>
          <S.ScreenTitleContainer>
            <ScreenTitle>
              New Bet <S.TypeOfGame>for {selectedGame.type}</S.TypeOfGame>
            </ScreenTitle>
          </S.ScreenTitleContainer>

          <S.Content>
            <S.SectionTitle>Choose a game</S.SectionTitle>
            <S.Games
              data={games}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <ButtonTypeOfGame
                  isActive={selectedGame.id === item.id}
                  title={item.type}
                  color={item.color}
                  onPress={() => handleSelectGameById(item.id)}
                />
              )}
            />

            <S.SectionTitle>Fill your bet</S.SectionTitle>
            <S.GameDescription>{selectedGame.description}</S.GameDescription>
            <S.Numbers>
              {gameNumbers.map((gameNumber) => (
                <S.NumberButton
                  key={gameNumber}
                  active={!!selectedNumbers.includes(gameNumber)}
                  color={selectedGame.color}
                  onPress={() => handleToggleNumberSelection(gameNumber)}
                >
                  <S.NumberText>
                    {`${gameNumber}`.padStart(2, "0")}
                  </S.NumberText>
                </S.NumberButton>
              ))}
            </S.Numbers>

            <S.ControlButtonsContainer>
              <S.ControlButtonWrapper>
                <ControlButton
                  title="Add to Cart"
                  icon={<S.Icon name="cart-outline" />}
                  onPress={handleAddToCart}
                />
              </S.ControlButtonWrapper>

              <S.ControlButtonWrapper>
                <ControlButton
                  title="Complete game"
                  isOutlined
                  onPress={handleCompleteGame}
                />
              </S.ControlButtonWrapper>

              <S.ControlButtonWrapper>
                <ControlButton
                  title="Clear game"
                  isOutlined
                  onPress={handleClearGame}
                />
              </S.ControlButtonWrapper>
            </S.ControlButtonsContainer>
          </S.Content>
        </>
      )}

      <Modal visible={isCartOpen} animationType="slide">
        <Cart handleCloseCart={handleCloseCart} />
      </Modal>

      <S.OpenCartButton onPress={handleOpenCart}>
        <S.Icon name="cart-outline" />
      </S.OpenCartButton>

      <Footer />
    </S.Container>
  );
}
