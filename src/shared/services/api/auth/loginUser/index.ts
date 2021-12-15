import axios from "axios";

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
    if (axios.isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);

    throw new Error("Something went wrong, please contact our support!");
  }
}
