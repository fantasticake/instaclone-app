import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faHomeUser,
  faUserCircle as faUserCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";
import SharedStackNav from "./SharedStackNav";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: theme.colors.faintLineColor,
          backgroundColor: theme.colors.backgroundColor,
        },
        tabBarInactiveTintColor: theme.colors.borderColor,
        tabBarActiveTintColor: theme.colors.textColor,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesomeIcon
              color={color}
              size={size}
              icon={focused ? faHomeUser : faHome}
            />
          ),
        }}
        name="HomeStack"
        component={SharedStackNav}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesomeIcon
              color={color}
              size={size}
              icon={focused ? faUserCircleSolid : faUserCircle}
            />
          ),
        }}
        name="MyProfileStack"
        component={SharedStackNav}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
