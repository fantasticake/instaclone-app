import { createStackNavigator } from "@react-navigation/stack";
import RoomStack from "./RoomStack";
import TabNav from "./TabNav";
import UploadStack from "./UploadStack";

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="UploadStack" component={UploadStack} />
      <Stack.Screen name="RoomStack" component={RoomStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
