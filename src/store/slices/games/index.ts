import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IApiGames, ITypeOfGame } from "../../../shared/types";

interface IInitialState {
  minCartValue: number;
  games: ITypeOfGame[];
}

const initialState: IInitialState = {
  minCartValue: 0,
  games: [],
};

const gamesSlice = createSlice({
  name: "@games",
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<IApiGames>) => {
      state.minCartValue = action.payload.min_cart_value;
      state.games = action.payload.types;
    },
    clearGames: (state) => {
      state.minCartValue = 0;
      state.games = [];
    },
  },
});

export const { clearGames, setGames } = gamesSlice.actions;

export const gamesReducer = gamesSlice.reducer;
