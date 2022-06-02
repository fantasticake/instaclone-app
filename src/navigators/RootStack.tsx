import { createStackNavigator } from "@react-navigation/stack";
import CameraNav from "./CameraNav";
import TabNav from "./TabNav";

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="CameraNav" component={CameraNav} />
    </Stack.Navigator>
  );
};

export default RootStack;
