import { ReduxStore } from "../../../types";

export const selectMinCartValue = (state: ReduxStore) =>
  state.games.minCartValue;

export const selectGames = (state: ReduxStore) => state.games.games;
