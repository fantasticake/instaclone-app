import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://real-lines-speak-175-215-45-118.loca.lt/graphql",
  cache: new InMemoryCache(),
});

export default client;
