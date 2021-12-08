import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITypeOfGames {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: 15;
  color: string;
}

export interface IApiGames {
  min_cart_value: number;
  types: ITypeOfGames[];
}

interface IInitialState {
  minCartValue: number;
  games: ITypeOfGames[];
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

export const { setGames } = gamesSlice.actions;

export const gamesReducer = gamesSlice.reducer;
