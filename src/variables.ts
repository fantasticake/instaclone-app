import { makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "./client";

export const tokenVar = makeVar("");

export const initToken = async () => {
  const token = await AsyncStorage.getItem("token");
  tokenVar(token || "");
};

export const saveToken = async (token) => {
  tokenVar(token);
  await AsyncStorage.setItem("token", token);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
  tokenVar("");
  client.clearStore();
};
