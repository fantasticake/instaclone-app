import { createStackNavigator } from "@react-navigation/stack";
import AuthHome from "../screens/AuthHome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const Stack = createStackNavigator();

const AuthNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthHome" component={AuthHome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default AuthNav;
