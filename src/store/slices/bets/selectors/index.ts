import { ReduxStore } from "../../../types";

export const selectBets = (state: ReduxStore) => state.bets.bets;
