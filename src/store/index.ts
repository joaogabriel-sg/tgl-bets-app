import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./slices/auth";
import { cartReducer } from "./slices/cart";
import { gamesReducer } from "./slices/games";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    games: gamesReducer,
  },
});
