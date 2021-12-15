import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "@shared/services";
import { IToken, IUserAccountApiResponse } from "@shared/types";

const tglBetsUserTokenStorageKey = "@tglBets:userToken";

export async function myAccountService() {
  try {
    const tokenStorageData = await AsyncStorage.getItem(
      tglBetsUserTokenStorageKey
    );

    if (!tokenStorageData) throw new Error("");

    const tokenData = JSON.parse(tokenStorageData) as IToken;

    const { data } = await api.get<IUserAccountApiResponse>("/user/my-account");

    const user = {
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
      },
      token: tokenData,
    };

    return user;
  } catch (error: any) {
    AsyncStorage.removeItem(tglBetsUserTokenStorageKey);

    if (axios.isAxiosError(error) && error.response)
      throw new Error(error.response.data.errors[0].message);

    throw new Error("Something went wrong, please contact our support!");
  }
}
