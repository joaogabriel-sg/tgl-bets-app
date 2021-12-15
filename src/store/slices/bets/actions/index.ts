import { createAsyncThunk } from "@reduxjs/toolkit";

import { listBetsService } from "@shared/services/api/bets";
import { IAsyncThunkConfig } from "@shared/types";

import { setBets } from "..";

export const fetchUserBets = createAsyncThunk<void, void, IAsyncThunkConfig>(
  "@bets/fetchUserBets",
  async (_, thunkApi) => {
    try {
      const bets = await listBetsService();
      thunkApi.dispatch(setBets(bets));
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
