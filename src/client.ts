import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpLink = createHttpLink({
  uri: "https://dirty-ghosts-suffer-175-215-45-118.loca.lt/graphql",
});

const authLink = setContext(async (_, headers) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      token: token || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
