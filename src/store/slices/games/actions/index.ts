import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { api } from "../../../../shared/services";

import { setGames } from "../index";

import { IAsyncThunkConfig, IApiGames } from "../../../../shared/types";

export const fetchGames = createAsyncThunk<void, void, IAsyncThunkConfig>(
  "@games/fetchGames",
  async (_, thunkApi) => {
    try {
      const { data } = await api.get<IApiGames>("/cart_games");

      thunkApi.dispatch(setGames(data));
    } catch (error) {
      console.log(error);
      let errorMessage = "Something went wrong, please contact our support!";

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError && serverError.response)
          errorMessage = serverError.response.data.errors[0].message as string;
      }

      throw new Error(errorMessage);
    }
  }
);
