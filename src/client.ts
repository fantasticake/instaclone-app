import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";

const authLink = setContext(async ({ operationName }, headers) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      "x-apollo-operation-name": operationName,
      token: token || "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({
  uri: "https://7146-175-215-45-118.jp.ngrok.io/graphql",
});

const client = new ApolloClient({
  /*@ts-ignore */
  link: authLink.concat(errorLink).concat(uploadLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeFeed: {
            keyArgs: false,
            merge: (existing = [], incoming) => {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

export default client;
