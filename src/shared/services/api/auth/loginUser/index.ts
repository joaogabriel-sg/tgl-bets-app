import axios, { AxiosError } from "axios";

import { api } from "@shared/services";
import { ILoginData } from "@shared/types";

import { IApiUser } from "@store/slices/auth";

export async function loginUserService(loginData: ILoginData) {
  try {
    const { data } = await api.post<IApiUser>("/login", loginData);

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
      if (serverError && serverError.response && serverError.response.data)
        errorMessage = serverError.response.data.message as string;
    }
    throw new Error(errorMessage);
  }
}
