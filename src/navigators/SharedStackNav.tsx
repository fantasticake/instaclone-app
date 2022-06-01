import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createStackNavigator } from "@react-navigation/stack";
import Comments from "../screens/Comments";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import MyProfile from "../screens/MyProfile";
import styled, { useTheme } from "styled-components/native";
import Logo from "../components/Logo";
import { removeToken } from "../variables";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const LogoContainer = styled.View`
  margin-top: 6px;
  width: 100px;
`;

const LogoutBtn = styled.TouchableOpacity`
  margin-right: 16px;
`;

const Stack = createStackNavigator();

const SharedStackNav = ({ navigation: { setParams }, route: { name } }) => {
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
      {name == "HomeStack" && (
        <Stack.Screen
          options={{
            headerTitle: () => (
              <LogoContainer>
                <Logo />
              </LogoContainer>
            ),
          }}
          name="Home"
          component={Home}
        />
      )}
      {name == "MyProfileStack" && (
        <Stack.Screen
          options={{
            headerRight: ({ tintColor }) => (
              <LogoutBtn onPress={removeToken}>
                <FontAwesomeIcon
                  color={tintColor}
                  size={26}
                  icon={faArrowRightFromBracket}
                />
              </LogoutBtn>
            ),
          }}
          name="MyProfile"
          component={MyProfile}
        />
      )}
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default SharedStackNav;
