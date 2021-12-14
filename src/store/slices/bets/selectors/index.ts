import { ReduxStore } from "@store/types";

export const selectBets = (state: ReduxStore) => state.bets.bets;
