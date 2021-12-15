import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseISO } from "date-fns";

import {
  IAsyncThunkConfig,
  ILoginData,
  INewUser,
  IToken,
  IUpdatedUser,
} from "@shared/types";

import { loginUserService } from "@shared/services/api/auth";
import {
  createUserService,
  myAccountService,
  updateMyUserService,
} from "@shared/services/api/user";

import { authenticate, logout } from "..";

import { clearCart } from "@store/slices/cart";
import { clearBets } from "@store/slices/bets";
import { clearGames } from "@store/slices/games";

const tglBetsUserTokenStorageKey = "@tglBets:userToken";

let expiryTime: NodeJS.Timeout;

export const createNewUser = createAsyncThunk<
  void,
  INewUser,
  IAsyncThunkConfig
>("@auth/createNewUser", async (newUser, thunkApi) => {
  try {
    const userData = await createUserService(newUser);

    const { token, expires_at } = userData.token;
    const expirationTime = getExpirationTime(expires_at);

    thunkApi.dispatch(setLogoutTimer(expirationTime));
    thunkApi.dispatch(authenticate(userData));

    saveUserTokenToStorage({ token, expires_at });
  } catch (error: any) {
    throw new Error(error);
  }
});

export const updateUserData = createAsyncThunk<
  void,
  IUpdatedUser,
  IAsyncThunkConfig
>("@auth/updateUser", async (updatedUser, thunkApi) => {
  try {
    const user = await updateMyUserService(updatedUser);
    const { token, expires_at } = user.token;

    thunkApi.dispatch(authenticate(user));
    saveUserTokenToStorage({ token, expires_at });
  } catch (error: any) {
    throw new Error(error);
  }
});

export const loginUser = createAsyncThunk<void, ILoginData, IAsyncThunkConfig>(
  "@auth/loginUser",
  async (loginData, thunkApi) => {
    try {
      const user = await loginUserService(loginData);
      const { token, expires_at } = user.token;

      const expirationTime = getExpirationTime(expires_at);

      thunkApi.dispatch(setLogoutTimer(expirationTime));
      thunkApi.dispatch(authenticate(user));

      saveUserTokenToStorage({ token, expires_at });
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const loadUserStorageData = createAsyncThunk<
  void,
  void,
  IAsyncThunkConfig
>("@auth/loadUserStorageData", async (_, thunkApi) => {
  try {
    const user = await myAccountService();
    const { token, expires_at } = user.token;

    const expirationTime = getExpirationTime(expires_at);

    thunkApi.dispatch(setLogoutTimer(expirationTime));
    thunkApi.dispatch(authenticate(user));

    saveUserTokenToStorage({ token, expires_at });
  } catch (error: any) {
    throw new Error(error);
  }
});

export const logoutUser = createAsyncThunk<void, void, IAsyncThunkConfig>(
  "@auth/logoutUser",
  async (_, thunkApi) => {
    thunkApi.dispatch(logout());
    thunkApi.dispatch(clearCart());
    thunkApi.dispatch(clearBets());
    thunkApi.dispatch(clearGames());

    clearLogoutTimer();
    removeUserTokenFromStorage();
  }
);

const setLogoutTimer = createAsyncThunk<void, number, IAsyncThunkConfig>(
  "@auth/setLogoutTimer",
  async (timeoutValue, thunkApi) => {
    expiryTime = setTimeout(() => {
      thunkApi.dispatch(logoutUser());
    }, timeoutValue);
  }
);

function clearLogoutTimer() {
  if (expiryTime) clearTimeout(expiryTime);
}

function saveUserTokenToStorage(token: IToken) {
  AsyncStorage.setItem(tglBetsUserTokenStorageKey, JSON.stringify(token));
}

function removeUserTokenFromStorage() {
  AsyncStorage.removeItem(tglBetsUserTokenStorageKey);
}

function getExpirationTime(expiresAt: string) {
  const currentDateIsoString = new Date().toISOString();
  const currentDateTime = parseISO(currentDateIsoString).getTime();
  const expirationAtDateTime = parseISO(expiresAt).getTime();

  return expirationAtDateTime - currentDateTime;
}
