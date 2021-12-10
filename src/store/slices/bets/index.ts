import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBet {
  id: number;
  user_id: number;
  game_id: number;
  choosen_numbers: string;
  price: number;
  created_at: string;
  type: {
    id: number;
    type: string;
    color: string;
  };
}

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
