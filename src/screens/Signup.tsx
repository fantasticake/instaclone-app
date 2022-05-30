import styled, { useTheme } from "styled-components/native";
import FormInput from "../components/form/FormInput";
import FormBtn from "../components/form/FormBtn";
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
  margin-bottom: 30px;
`;

const BtnTxt = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
`;

const BottomBox = styled.View`
  position: absolute;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.faintLineColor};
`;

const BottomTxt = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  margin-right: 4px;
  opacity: 0.6;
`;

const LoginBtn = styled.TouchableOpacity``;

const LoginTxt = styled.Text`
  color: ${(props) => props.theme.colors.blue};
`;

const Signup = ({ navigation }) => {
  const theme = useTheme();
  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <FormInput
        placeholderTextColor={theme.colors.borderColor}
        placeholder="Username"
      />
      <FormInput
        placeholderTextColor={theme.colors.borderColor}
        placeholder="Email"
      />
      <FormInput
        placeholderTextColor={theme.colors.borderColor}
        placeholder="Password"
      />
      <FormInput
        placeholderTextColor={theme.colors.borderColor}
        placeholder="Password Confirm"
      />
      <FormBtn>
        <BtnTxt>Create account</BtnTxt>
      </FormBtn>
      <BottomBox>
        <BottomTxt>Already have an account?</BottomTxt>
        <LoginBtn onPress={() => navigation.navigate("Login")}>
          <LoginTxt>Log in.</LoginTxt>
        </LoginBtn>
      </BottomBox>
    </Container>
  );
};

export default Signup;
