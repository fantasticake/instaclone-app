import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";
import CreatePost from "../screens/CreatePost";
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
      <Stack.Screen
        options={{ headerTitle: "New Post" }}
        name="CreatePost"
        component={CreatePost}
      />
    </Stack.Navigator>
  );
};

export default UploadStack;
