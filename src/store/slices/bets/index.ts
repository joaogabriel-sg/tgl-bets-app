import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IBet } from "@shared/types";

interface IInitialState {
  bets: IBet[];
}

const initialState: IInitialState = {
  bets: [],
};

const betsAuth = createSlice({
  name: "@bets",
  initialState,
  reducers: {
    setBets: (state, action: PayloadAction<IBet[]>) => {
      state.bets = action.payload;
    },
    clearBets: (state) => {
      state.bets = [];
    },
  },
});

export const { clearBets, setBets } = betsAuth.actions;

export const betsReducer = betsAuth.reducer;
