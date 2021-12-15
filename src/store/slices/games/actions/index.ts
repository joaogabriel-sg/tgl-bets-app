import { createAsyncThunk } from "@reduxjs/toolkit";

import { IAsyncThunkConfig } from "@shared/types";
import { listGamesService } from "@shared/services/api/games";

import { setGames } from "..";

export const fetchGames = createAsyncThunk<void, void, IAsyncThunkConfig>(
  "@games/fetchGames",
  async (_, thunkApi) => {
    try {
      const games = await listGamesService();
      thunkApi.dispatch(setGames(games));
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
