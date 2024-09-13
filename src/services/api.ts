import axios from "axios";
import { signOut } from "../context/Auth";
import { navigationRef } from "../routes/RootNavigation";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(onSuccess, onError)

function onSuccess(response: any) {
  return response;
}

function onError(exception: any) {
  if (exception.response.status === 401){
    signOut(navigationRef);
  }
  return Promise.reject(exception);
}

export default api;
