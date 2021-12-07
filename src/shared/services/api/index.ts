import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.0.2.2:32813",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
