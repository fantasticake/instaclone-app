import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createStackNavigator, Header } from "@react-navigation/stack";
import Comments from "../screens/Comments";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import MyProfile from "../screens/MyProfile";
import styled, { useTheme } from "styled-components/native";
import Logo from "../components/Logo";
import { removeToken } from "../variables";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import EditProfile from "../screens/EditProfile";
import CreatePostBtn from "../components/CreatePostBtn";
import Post from "../screens/post";
import Search from "../screens/Search";

const LogoContainer = styled.View`
  margin-top: 6px;
  width: 100px;
`;

const HeaderRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
`;

const LogoutBtn = styled.TouchableOpacity`
  margin-left: 20px;
`;

const Stack = createStackNavigator();

const SharedStackNav = ({ route: { name } }) => {
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
            headerRight: () => (
              <HeaderRightContainer>
                <CreatePostBtn />
              </HeaderRightContainer>
            ),
          }}
          name="Home"
          component={Home}
        />
      )}
      {name == "SearchStack" && (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Search"
          component={Search}
        />
      )}
      {name == "MyProfileStack" && (
        <Stack.Screen
          options={{
            headerRight: ({ tintColor }) => (
              <HeaderRightContainer>
                <CreatePostBtn />
                <LogoutBtn onPress={removeToken}>
                  <FontAwesomeIcon
                    color={tintColor}
                    size={26}
                    icon={faArrowRightFromBracket}
                  />
                </LogoutBtn>
              </HeaderRightContainer>
            ),
          }}
          name="MyProfile"
          component={MyProfile}
        />
      )}
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
};

export default SharedStackNav;
