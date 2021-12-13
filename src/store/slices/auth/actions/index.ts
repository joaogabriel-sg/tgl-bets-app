import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { api } from "../../../../shared/services";

import { authenticate, IApiUser, logout } from "../index";

import { clearCart } from "../../cart";
import { clearBets } from "../../bets";
import { clearGames } from "../../games";

import { IAsyncThunkConfig } from "../../../../shared/types";

interface INewUser {
  name: string;
  email: string;
  password: string;
}

interface IUpdatedUser {
  name: string;
  email: string;
}

interface IUpdatedUserApi {
  email: string;
  name: string;
}

interface ILoginData {
  email: string;
  password: string;
}

export const createNewUser = createAsyncThunk<
  void,
  INewUser,
  IAsyncThunkConfig
>("@auth/createNewUser", async (newUser, thunkApi) => {
  try {
    const { data } = await api.post<IApiUser>("/user/create", newUser);

    const createdNewUser = {
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      },
      token: {
        token: data.token.token,
        expires_at: data.token.expires_at,
      },
    };

    thunkApi.dispatch(authenticate(createdNewUser));
    api.defaults.headers.common = {
      Authorization: `Bearer ${createdNewUser.token.token}`,
    };
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
    const { data } = await api.put<IUpdatedUserApi>(
      "/user/update",
      updatedUser
    );

    const currentAuthentication = thunkApi.getState().auth;

    const updatedAuthenticatedUser = {
      user: {
        id: currentAuthentication.user!.id,
        name: data.name,
        email: data.email,
      },
      token: {
        token: currentAuthentication.token!,
        expires_at: currentAuthentication.expiresAt!,
      },
    };

    thunkApi.dispatch(authenticate(updatedAuthenticatedUser));
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

      const userData = {
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        },
        token: {
          token: data.token.token,
          expires_at: data.token.expires_at,
        },
      };

      thunkApi.dispatch(authenticate(userData));
      api.defaults.headers.common = {
        Authorization: `Bearer ${userData.token.token}`,
      };
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

export const logoutUser = createAsyncThunk<void, void, IAsyncThunkConfig>(
  "@auth/logoutUser",
  async (_, thunkApi) => {
    api.defaults.headers.common = {
      Authorization: "",
    };

    thunkApi.dispatch(logout());
    thunkApi.dispatch(clearCart());
    thunkApi.dispatch(clearBets());
    thunkApi.dispatch(clearGames());
  }
);
