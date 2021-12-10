import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./slices/auth";
import { betsReducer } from "./slices/bets";
import { cartReducer } from "./slices/cart";
import { gamesReducer } from "./slices/games";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bets: betsReducer,
    cart: cartReducer,
    games: gamesReducer,
  },
});
