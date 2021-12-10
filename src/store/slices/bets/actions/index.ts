import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { api } from "../../../../shared/services";

import { IBet, setBets } from "..";
import { IApiGames } from "../../games";
import { AppDispatch, ReduxStore } from "../../../types";

type AsyncThunkConfig = {
  state: ReduxStore;
  dispatch: AppDispatch;
};

export const fetchUserBets = createAsyncThunk<void, void, AsyncThunkConfig>(
  "@bets/fetchUserBets",
  async (_, thunkApi) => {
    try {
      const { data: betsData } = await api.get<IBet[]>("/bet/all-bets");
      const { data: gamesData } = await api.get<IApiGames>("/cart_games");

      const data = betsData.map((betData) => {
        const game = gamesData.types.find(
          (gameData) => gameData.id === betData.game_id
        );

        if (!game) return betData;

        return {
          ...betData,
          type: {
            ...betData.type,
            color: game.color,
          },
        };
      });

      thunkApi.dispatch(setBets(data));
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
