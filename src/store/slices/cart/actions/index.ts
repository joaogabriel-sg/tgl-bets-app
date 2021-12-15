import { createAsyncThunk } from "@reduxjs/toolkit";

import { newBetService } from "@shared/services/api/bets";
import { IAsyncThunkConfig, ISaveNewBet } from "@shared/types";

import { clearCart } from "..";

export const saveNewBet = createAsyncThunk<
  void,
  ISaveNewBet,
  IAsyncThunkConfig
>("@cart/saveNewBet", async (newBet, thunkApi) => {
  try {
    await newBetService(newBet);
    thunkApi.dispatch(clearCart());
  } catch (error: any) {
    throw new Error(error);
  }
});
