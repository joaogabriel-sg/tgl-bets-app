import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "@shared/services";
import { IToken, IUpdatedUser } from "@shared/types";

interface IUpdatedUserApiResponse {
  id: number;
  name: string;
  email: string;
}

const tglBetsUserTokenStorageKey = "@tglBets:userToken";

export async function updateMyUserService(updatedUser: IUpdatedUser) {
  try {
    const { data } = await api.put<IUpdatedUserApiResponse>(
      "/user/update",
      updatedUser
    );

    const tokenStorageData = await AsyncStorage.getItem(
      tglBetsUserTokenStorageKey
    );

    if (!tokenStorageData) {
      AsyncStorage.removeItem(tglBetsUserTokenStorageKey);
      throw new Error("");
    }

    const { token, expires_at } = JSON.parse(tokenStorageData) as IToken;

    const user = {
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
      },
      token: {
        token,
        expires_at,
      },
    };

    return user;
  } catch (error: any) {
    let errorMessage = "Something went wrong, please contact our support!";

    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError;
      if (serverError && serverError.response)
        errorMessage = serverError.response.data.errors[0].message as string;
    }

    throw new Error(errorMessage);
  }
}
