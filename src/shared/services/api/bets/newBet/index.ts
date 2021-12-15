import axios, { AxiosError } from "axios";

import { api } from "@shared/services";
import { ISaveNewBet } from "@shared/types";

export async function newBetService(newBet: ISaveNewBet) {
  try {
    await api.post("/bet/new-bet", newBet);
  } catch (error: any) {
    let errorMessage = "Something went wrong, please contact our support!";

    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;
      if (serverError && serverError.response)
        errorMessage = serverError.response.data.message as string;
    }

    throw new Error(errorMessage);
  }
}
