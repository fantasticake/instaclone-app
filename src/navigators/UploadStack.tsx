import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";
import Camera from "../screens/Camera";
import Gallery from "../screens/Gallery";

const Stack = createStackNavigator();

const UploadStack = ({ route }) => {
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
      {route.name == "GalleryStack" ? (
        <Stack.Screen name="Gallery" component={Gallery} />
      ) : null}
      {route.name == "CameraStack" ? (
        <Stack.Screen name="Camera" component={Camera} />
      ) : null}
    </Stack.Navigator>
  );
};

export default UploadStack;
