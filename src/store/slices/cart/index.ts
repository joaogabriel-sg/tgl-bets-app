import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICartGame } from "../../../shared/types";

interface IInitialState {
  cartGames: ICartGame[];
  cartTotalValue: number;
}

const initialState: IInitialState = {
  cartGames: [],
  cartTotalValue: 0,
};

const cartSlice = createSlice({
  name: "@cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartGame>) => {
      state.cartGames.push(action.payload);
      state.cartTotalValue += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const removedItem = state.cartGames.find(
        (cartGame) => cartGame.id === action.payload.id
      )!;

      state.cartGames = state.cartGames.filter(
        (cartGame) => cartGame.id !== removedItem.id
      );
      state.cartTotalValue -= removedItem.price;
    },
    clearCart: (state) => {
      state.cartGames = [];
      state.cartTotalValue = 0;
    },
  },
});

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
