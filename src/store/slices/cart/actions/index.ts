import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { api } from "../../../../shared/services";

import { clearCart } from "../index";

import { IAsyncThunkConfig } from "../../../../shared/types";

interface INewBet {
  id: number;
  numbers: number[];
}

interface ISaveNewBetProps {
  games: INewBet[];
}

export const saveNewBet = createAsyncThunk<
  void,
  ISaveNewBetProps,
  IAsyncThunkConfig
>("@cart/saveNewBet", async (newBet, thunkApi) => {
  try {
    await api.post("/bet/new-bet", newBet);
    thunkApi.dispatch(clearCart());
  } catch (error) {
    let errorMessage = "Something went wrong, please contact our support!";

    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;
      if (serverError && serverError.response)
        errorMessage = serverError.response.data.message as string;
    }

    throw new Error(errorMessage);
  }
});
