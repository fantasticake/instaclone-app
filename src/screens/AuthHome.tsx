import styled from "styled-components/native";
import Logo from "../components/Logo";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const LogoContainer = styled.View`
  height: 50px;
  width: 90%;
`;

const SignupBtn = styled.TouchableOpacity`
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.blue};
  width: 90%;
  height: 46px;
`;

const SignupTxt = styled.Text`
  font-weight: 600;
  color: ${(props) => props.theme.colors.textColor};
`;

const LoginBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 46px;
`;

const LoginTxt = styled.Text`
  margin-top: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.blue};
`;

const Login = ({ navigation }) => {
  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <SignupBtn onPress={() => navigation.navigate("Signup")}>
        <SignupTxt>Create new account</SignupTxt>
      </SignupBtn>
      <LoginBtn onPress={() => navigation.navigate("Login")}>
        <LoginTxt>Log in</LoginTxt>
      </LoginBtn>
    </Container>
  );
};

export default Login;
