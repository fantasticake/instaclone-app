import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";
import CameraNav from "./CameraNav";

const Stack = createStackNavigator();

const UploadStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.backgroundColor,
        },
        headerTintColor: theme.colors.textColor,
      }}
    >
      <Stack.Screen name="CameraNav" component={CameraNav} />
    </Stack.Navigator>
  );
};

export default UploadStack;
