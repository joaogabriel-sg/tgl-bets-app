import axios from "axios";

import { api } from "@shared/services";
import { ISaveNewBet } from "@shared/types";

export async function newBetService(newBet: ISaveNewBet) {
  try {
    await api.post("/bet/new-bet", newBet);
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);

    throw new Error("Something went wrong, please contact our support!");
  }
}
