import axios from "axios";

import { api } from "@shared/services";
import { IApiGames } from "@shared/types";

export async function listGamesService() {
  try {
    const { data } = await api.get<IApiGames>("/cart_games");
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response)
      throw new Error(error.response.data.errors[0].message);

    throw new Error("Something went wrong, please contact our support!");
  }
}
