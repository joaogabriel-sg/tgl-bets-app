import { ReduxStore } from "../../../types";

export const selectUser = (state: ReduxStore) => state.auth.user;

export const selectToken = (state: ReduxStore) => state.auth.token;

export const selectExpiresAt = (state: ReduxStore) => state.auth.expiresAt;
