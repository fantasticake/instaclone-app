import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useTheme } from "styled-components/native";
import UploadStack from "./UploadStack";

const Tab = createMaterialTopTabNavigator();

const CameraNav = () => {
  const theme = useTheme();
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
      <Tab.Screen
        options={{ tabBarLabel: "Gallery" }}
        name="GalleryStack"
        component={UploadStack}
      />
      <Tab.Screen
        options={{ tabBarLabel: "Camera" }}
        name="CameraStack"
        component={UploadStack}
      />
    </Tab.Navigator>
  );
};

export default CameraNav;
