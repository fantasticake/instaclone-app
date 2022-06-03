import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useTheme } from "styled-components/native";
import CameraScreen from "../screens/Camera";
import Gallery from "../screens/Gallery";

const Tab = createMaterialTopTabNavigator();

const CameraNav = ({ navigation, route }) => {
  const theme = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: getFocusedRouteNameFromRoute(route) || "Gallery",
    });
  }, [route]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: theme.colors.faintLineColor,
          backgroundColor: theme.colors.backgroundColor,
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.textColor,
        },
        tabBarInactiveTintColor: theme.colors.borderColor,
        tabBarActiveTintColor: theme.colors.textColor,
      }}
      tabBarPosition="bottom"
    >
      <Tab.Screen name="Gallery" component={Gallery} />
      <Tab.Screen name="Camera" component={CameraScreen} />
    </Tab.Navigator>
  );
};

export default CameraNav;
