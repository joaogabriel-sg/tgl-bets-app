import axios from "axios";

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
    if (axios.isAxiosError(error) && error.response)
      throw new Error(error.response.data.error.message);

    throw new Error("Something went wrong, please contact our support!");
  }
}
