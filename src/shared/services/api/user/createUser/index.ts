import axios, { AxiosError } from "axios";

import { IApiUser } from "@store/slices/auth";

import { api } from "@shared/services";
import { INewUser } from "@shared/types";

export async function createUserService(newUser: INewUser) {
  try {
    const { data } = await api.post<IApiUser>("/user/create", newUser);

    const user = {
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

    return user;
  } catch (error: any) {
    let errorMessage = "Something went wrong, please contact our support!";

    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;
      if (serverError && serverError.response)
        errorMessage = serverError.response.data.error.message as string;
    }

    throw new Error(errorMessage);
  }
}
