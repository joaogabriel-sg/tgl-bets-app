import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { api } from "../../../../shared/services";

import { authenticate, IApiUser } from "../index";

import { AppDispatch, ReduxStore } from "../../../types";

interface INewUser {
  name: string;
  email: string;
  password: string;
}

type AsyncThunkConfig = {
  state: ReduxStore;
  dispatch: AppDispatch;
};

export const createNewUser = createAsyncThunk<void, INewUser, AsyncThunkConfig>(
  "@auth/createNewUser",
  async (newUser, thunkApi) => {
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
    } catch (error) {
      let errorMessage = "Something went wrong, please contact our support!";

      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError && serverError.response)
          errorMessage = serverError.response.data.error.message as string;
      }

      throw new Error(errorMessage);
    }
  }
);
