import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IToken } from "@shared/types";

const tglBetsUserTokenStorageKey = "@tglBets:userToken";

const api = axios.create({
  baseURL: "http://10.0.2.2:43415",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const storageTokenData = await AsyncStorage.getItem(
      tglBetsUserTokenStorageKey
    );

    if (storageTokenData && config.headers) {
      const { token } = JSON.parse(storageTokenData) as IToken;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { api };
