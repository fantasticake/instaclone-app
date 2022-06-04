import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";
import useMe from "../hooks/useMe";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";

const Stack = createStackNavigator();

const RoomStack = () => {
  const theme = useTheme();
  const meData = useMe();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.backgroundColor,
        },
        headerTintColor: theme.colors.textColor,
      }}
    >
      <Stack.Screen
        options={{ headerTitle: meData?.seeMe?.username }}
        name="Rooms"
        component={Rooms}
      />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
};

export default RoomStack;
