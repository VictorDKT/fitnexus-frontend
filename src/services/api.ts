import axios from "axios";
import { signOut } from "../context/Auth";
import { navigationRef } from "../routes/RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

async function onError(exception: any) {
  const isLogged = await AsyncStorage.getItem("@AuthData");
  if (exception.response.status === 401 && isLogged) {
    signOut(navigationRef);
  }
  return Promise.reject(exception);
}

export default api;
