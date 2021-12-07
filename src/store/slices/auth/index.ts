import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  name: string;
  email: string;
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
  reducers: {},
});

export const authReducer = authSlice.reducer;
