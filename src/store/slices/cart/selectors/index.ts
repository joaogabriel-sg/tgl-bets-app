import { ReduxStore } from "@store/types";

export const selectCartGames = (state: ReduxStore) => state.cart.cartGames;

export const selectCartTotalValue = (state: ReduxStore) =>
  state.cart.cartTotalValue;
