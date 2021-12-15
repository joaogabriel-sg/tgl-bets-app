import axios, { AxiosError } from "axios";

import { api } from "@shared/services";
import { IApiGames } from "@shared/types";

export async function listGamesService() {
  try {
    const { data } = await api.get<IApiGames>("/cart_games");
    return data;
  } catch (error: any) {
    let errorMessage = "Something went wrong, please contact our support!";

    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;
      if (serverError && serverError.response)
        errorMessage = serverError.response.data.errors[0].message as string;
    }

    throw new Error(errorMessage);
  }
}
