import axios, { AxiosError } from "axios";

import { api } from "@shared/services";
import { listGamesService } from "@shared/services/api/games";
import { IBet } from "@shared/types";

export async function listBetsService(types?: string[]) {
  try {
    const params = new URLSearchParams();

    if (types && types.length > 0)
      types.forEach((type) => params.append("type[]", type));

    const { data: bets } = await api.get<IBet[]>("/bet/all-bets", {
      params: params,
    });

    const games = await listGamesService();

    const allBets = bets.map((bet) => {
      const game = games.types.find((type) => type.id === bet.game_id);

      if (!game) return bet;

      return {
        ...bet,
        type: {
          ...bet.type,
          color: game.color,
        },
      };
    });

    return allBets;
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
