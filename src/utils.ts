import { ReactNativeFile } from "apollo-upload-client";
import mime from "mime";

export const formatNumber = (num: any, str: any) => {
  if (typeof num == "number" && typeof str == "string")
    return `${num} ${num == 1 ? str : str + "s"}`;
};

export const formatString = (num: any, str: any) => {
  if (typeof num == "number" && typeof str == "string")
    return `${num == 1 ? str : str + "s"}`;
};

export const formatDate = (date: string) => {
  return new Date(parseInt(date))
    .toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .replace("/", " ")
    .replace("/", ", ");
};

export const createRNFile = (uri: string) => {
  return new ReactNativeFile({
    uri,
    name: uri,
    type: mime.getType(uri),
  });
};
