import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

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
  uri:
    process.env.NODE_ENV === "production"
      ? "https://cake-instaclone-backend.herokuapp.com/graphql"
      : "https://1a5b-175-215-45-118.jp.ngrok.io/graphql",
});

const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

const wsLink = new GraphQLWsLink(
  createClient({
    url:
      process.env.NODE_ENV === "production"
        ? "wss://cake-instaclone-backend.herokuapp.com/graphql"
        : "ws://1a5b-175-215-45-118.jp.ngrok.io/graphql",
    connectionParams: {
      token: getToken(),
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind == "OperationDefinition" &&
      definition.operation == "subscription"
    );
  },
  wsLink,
  /* @ts-ignore */
  authLink.concat(errorLink).concat(uploadLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeFeed: {
            keyArgs: false,
            merge: (existing = [], incoming) => {
              const array = [...existing, ...incoming];
              const uniqueArray = array.filter((value, index) => {
                const _value = JSON.stringify(value);
                return (
                  index ===
                  array.findIndex((obj) => {
                    return JSON.stringify(obj) === _value;
                  })
                );
              });
              return uniqueArray;
            },
          },
        },
      },
    },
  }),
});

export default client;
