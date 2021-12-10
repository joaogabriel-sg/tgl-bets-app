import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../../../shared/services";

import { clearCart } from "../index";

import { AppDispatch, ReduxStore } from "../../../types";
import axios, { AxiosError } from "axios";

interface INewBet {
  id: number;
  numbers: number[];
}

interface ISaveNewBetProps {
  games: INewBet[];
}

type AsyncThunkConfig = {
  state: ReduxStore;
  dispatch: AppDispatch;
};

export const saveNewBet = createAsyncThunk<
  void,
  ISaveNewBetProps,
  AsyncThunkConfig
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
