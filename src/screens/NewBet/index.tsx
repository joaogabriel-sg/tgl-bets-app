import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import uuid from "react-native-uuid";

import { Cart } from "../Cart";
import { AppHeader, Footer, Loading } from "../../components";

import { useReduxDispatch, useReduxSelector } from "../../shared/hooks";
import { sortArray } from "../../shared/utils";

import { fetchGames } from "../../store/slices/games/actions";
import { selectGames } from "../../store/slices/games/selectors";
import { ITypeOfGames } from "../../store/slices/games";
import { addToCart } from "../../store/slices/cart";

import * as S from "./styles";

export function NewBet() {
  const games = useReduxSelector(selectGames);
  const dispatch = useReduxDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<ITypeOfGames | null>(null);
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
    setSelectedNumbers([]);
  }

  function handleToggleNumberSelection(number: number) {
    setSelectedNumbers((prevSelectedNumbers) => {
      if (prevSelectedNumbers.includes(number)) {
        const filteredNumbers = prevSelectedNumbers.filter(
          (prevSelectedNumber) => prevSelectedNumber !== number
        );
        return sortArray(filteredNumbers);
      }

      if (selectedGame && prevSelectedNumbers.length < selectedGame.max_number)
        return sortArray([...prevSelectedNumbers, number]);

      return prevSelectedNumbers;
    });
  }

  function handleAddToCart() {
    if (!selectedGame) return;

    if (selectedNumbers.length !== selectedGame.max_number) return;

    const newCartGame = {
      id: uuid.v4().toString(),
      gameId: selectedGame.id,
      type: selectedGame.type,
      numbers: selectedNumbers,
      color: selectedGame.color,
      price: selectedGame.price,
    };

    dispatch(addToCart(newCartGame));
    setSelectedNumbers([]);
  }

  function handleCompleteGame() {
    const newNumbers: number[] = [...selectedNumbers];

    if (!selectedGame) return;

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
            <S.ScreenTitle>
              New Bet <S.TypeOfGame>for {selectedGame.type}</S.TypeOfGame>
            </S.ScreenTitle>
          </S.ScreenTitleContainer>

          <S.Content>
            <S.SectionTitle>Choose a game</S.SectionTitle>
            <S.Games
              data={games}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <S.GameButton
                  active={selectedGame.id === item.id}
                  color={item.color}
                  onPress={() => handleSelectGameById(item.id)}
                >
                  <S.GameButtonTitle
                    active={selectedGame.id === item.id}
                    color={item.color}
                  >
                    {item.type}
                  </S.GameButtonTitle>
                </S.GameButton>
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
              <S.ControlButtonsRow>
                <S.ControlButton onPress={handleAddToCart}>
                  <S.Icon name="cart-outline" />
                  <S.ControlButtonText>Add to Cart</S.ControlButtonText>
                </S.ControlButton>
              </S.ControlButtonsRow>

              <S.ControlButtonsRow>
                <S.ControlButton isOutlined onPress={handleCompleteGame}>
                  <S.ControlButtonText isOutlined>
                    Complete game
                  </S.ControlButtonText>
                </S.ControlButton>
              </S.ControlButtonsRow>

              <S.ControlButtonsRow>
                <S.ControlButton isOutlined onPress={handleClearGame}>
                  <S.ControlButtonText isOutlined>
                    Clear game
                  </S.ControlButtonText>
                </S.ControlButton>
              </S.ControlButtonsRow>
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
