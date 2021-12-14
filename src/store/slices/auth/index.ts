import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IToken {
  token: string;
  expires_at: string;
}

export interface IApiUser {
  user: IUser;
  token: IToken;
}

interface IInitialState {
  user: IUser | null;
  token: string | null;
  expiresAt: string | null;
}

const initialState: IInitialState = {
  user: null,
  token: null,
  expiresAt: null,
};

const authSlice = createSlice({
  name: "@auth",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<IApiUser>) => {
      state.user = action.payload.user;
      state.token = action.payload.token.token;
      state.expiresAt = action.payload.token.expires_at;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiresAt = null;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
