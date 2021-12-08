import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./slices/auth";
import { gamesReducer } from "./slices/games";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
  },
});
