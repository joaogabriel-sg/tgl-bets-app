import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseISO } from "date-fns";

import { api } from "../../../../shared/services";

import { authenticate, IApiUser, logout } from "../index";

import { clearCart } from "../../cart";
import { clearBets } from "../../bets";
import { clearGames } from "../../games";

import { IAsyncThunkConfig } from "../../../../shared/types";

interface ILoginData {
  email: string;
  password: string;
}

interface INewUser {
  name: string;
  email: string;
  password: string;
}

interface IUpdatedUser {
  name: string;
  email: string;
}

interface IUpdatedUserApiResponse {
  name: string;
  email: string;
}

interface IUserAccountBetApiResponse {
  id: number;
  choosen_numbers: string;
  user_id: number;
  game_id: number;
  price: number;
  created_at: string;
}

interface IUserAccountApiResponse {
  id: number;
  email: string;
  name: string;
  token: string;
  bets: IUserAccountBetApiResponse[];
}

interface IToken {
  token: string;
  expires_at: string;
}

const tglBetsUserTokenStorageKey = "@tglBets:userToken";

let expiryTime: NodeJS.Timeout;

export const createNewUser = createAsyncThunk<
  void,
  INewUser,
  IAsyncThunkConfig
>("@auth/createNewUser", async (newUser, thunkApi) => {
  try {
    const { data } = await api.post<IApiUser>("/user/create", newUser);

    const { token, expires_at } = data.token;
    const formattedNewUser = {
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      },
      token: {
        token,
        expires_at,
      },
    };

    const expirationTime = getExpirationTime(expires_at);

    thunkApi.dispatch(setLogoutTimer(expirationTime));
    thunkApi.dispatch(authenticate(formattedNewUser));

    saveUserTokenToStorage({ token, expires_at });
    setUserTokenToApiService(token);
  } catch (error) {
    let errorMessage = "Something went wrong, please contact our support!";

    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;
      if (serverError && serverError.response)
        errorMessage = serverError.response.data.error.message as string;
    }

    throw new Error(errorMessage);
  }
});

export const updateUserData = createAsyncThunk<
  void,
  IUpdatedUser,
  IAsyncThunkConfig
>("@auth/updateUser", async (updatedUser, thunkApi) => {
  try {
    const { data } = await api.put<IUpdatedUserApiResponse>(
      "/user/update",
      updatedUser
    );

    const { user, token, expiresAt } = thunkApi.getState().auth;
    if (!user || !token || !expiresAt) return;

    const updatedAuthenticatedUser = {
      user: {
        id: user.id,
        name: data.name,
        email: data.email,
      },
      token: {
        token,
        expires_at: expiresAt,
      },
    };

    thunkApi.dispatch(authenticate(updatedAuthenticatedUser));
    saveUserTokenToStorage({ token, expires_at: expiresAt });
  } catch (error) {
    let errorMessage = "Something went wrong, please contact our support!";

    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;
      if (serverError && serverError.response)
        errorMessage = serverError.response.data.errors[0].message as string;
    }

    throw new Error(errorMessage);
  }
});

export const loginUser = createAsyncThunk<void, ILoginData, IAsyncThunkConfig>(
  "@auth/loginUser",
  async (loginData, thunkApi) => {
    try {
      const { data } = await api.post<IApiUser>("/login", loginData);

      const { token, expires_at } = data.token;
      const user = {
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        },
        token: {
          token,
          expires_at,
        },
      };

      const expirationTime = getExpirationTime(expires_at);

      thunkApi.dispatch(setLogoutTimer(expirationTime));
      thunkApi.dispatch(authenticate(user));

      saveUserTokenToStorage({ token, expires_at });
      setUserTokenToApiService(token);
    } catch (error: any) {
      let errorMessage = "Something went wrong, please contact our support!";

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError && serverError.response && serverError.response.data)
          errorMessage = serverError.response.data.message as string;
      }
      throw new Error(errorMessage);
    }
  }
);

export const loadUserStorageData = createAsyncThunk<
  void,
  void,
  IAsyncThunkConfig
>("@auth/loadUserStorageData", async (_, thunkApi) => {
  const storageUserTokenData = await AsyncStorage.getItem(
    tglBetsUserTokenStorageKey
  );
  if (!storageUserTokenData) throw new Error("");

  const tokenData = JSON.parse(storageUserTokenData) as IToken;

  setUserTokenToApiService(tokenData.token);

  const { data } = await api.get<IUserAccountApiResponse>("/user/my-account");
  const user: IApiUser = {
    user: {
      id: data.id,
      name: data.name,
      email: data.email,
    },
    token: tokenData,
  };

  const expirationTime = getExpirationTime(tokenData.expires_at);

  thunkApi.dispatch(setLogoutTimer(expirationTime));
  thunkApi.dispatch(authenticate(user));

  saveUserTokenToStorage(tokenData);
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
    removeUserTokenFromApiService();
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

function setUserTokenToApiService(token: string) {
  api.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
}

function removeUserTokenFromApiService() {
  api.defaults.headers.common = {
    Authorization: "",
  };
}

function getExpirationTime(expiresAt: string) {
  const currentDateIsoString = new Date().toISOString();
  const currentDateTime = parseISO(currentDateIsoString).getTime();
  const expirationAtDateTime = parseISO(expiresAt).getTime();

  return expirationAtDateTime - currentDateTime;
}
