import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import AuthNav from "./src/navigators/AuthNav";
import { darkTheme } from "./src/themes";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client from "./src/client";
import { initToken, tokenVar } from "./src/variables";
import { useEffect } from "react";
import TabNav from "./src/navigators/TabNav";
import RootStack from "./src/navigators/RootStack";

export default function App() {
  useEffect(() => {
    initToken();
  }, []);

  const token = useReactiveVar(tokenVar);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          {token ? <RootStack /> : <AuthNav />}
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}
