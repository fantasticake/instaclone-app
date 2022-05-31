import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowRightFromBracket,
  faHome,
  faHomeUser,
  faUserCircle as faUserCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import styled, { useTheme } from "styled-components/native";
import { removeToken } from "../variables";
import Logo from "../components/Logo";

const Tab = createBottomTabNavigator();

const LogoContainer = styled.View`
  margin-top: 6px;
  width: 100px;
`;

const LogoutBtn = styled.TouchableOpacity`
  margin-right: 16px;
`;

const TabNav = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.backgroundColor,
        },
        headerTintColor: theme.colors.textColor,
        headerTitle: () => (
          <LogoContainer>
            <Logo />
          </LogoContainer>
        ),
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
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerRight: () => (
            <LogoutBtn onPress={removeToken}>
              <FontAwesomeIcon
                color={theme.colors.textColor}
                size={26}
                icon={faArrowRightFromBracket}
              />
            </LogoutBtn>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesomeIcon
              color={color}
              size={size}
              icon={focused ? faUserCircleSolid : faUserCircle}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
