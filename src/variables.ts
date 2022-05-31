import { makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  tokenVar("");
  await AsyncStorage.removeItem("token");
};
