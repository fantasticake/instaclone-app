import styled, { useTheme } from "styled-components/native";
import FormBtn from "../components/form/FormBtn";
import FormInput from "../components/form/FormInput";
import Logo from "../components/Logo";
import {
  gql,
  useMutation,
  MutationUpdaterFunction,
  DefaultContext,
  ApolloCache,
} from "@apollo/client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { saveToken } from "../variables";
import { ActivityIndicator, TextInput } from "react-native";
import { useState } from "react";
import { LoginMutation, LoginMutationVariables } from "../generated/generated";

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

const ErrorTxt = styled.Text`
  color: tomato;
  margin-bottom: 10px;
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

const SignupBtn = styled.TouchableOpacity``;

const SignupTxt = styled.Text`
  color: ${(props) => props.theme.colors.blue};
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

interface Inputs {
  username: string;
  password: string;
}

const Login = ({ navigation, route: { params } }) => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: { username: params?.username, password: params?.password },
  });
  const [error, setError] = useState("");

  const updateMutation: MutationUpdaterFunction<
    LoginMutation,
    LoginMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = async (cache, { data }) => {
    if (data.login.ok) {
      await saveToken(data.login.token);
    } else {
      setError(data.login.error);
    }
  };

  const [loginMutation, { loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    update: updateMutation,
  });

  const onValid: SubmitHandler<Inputs> = ({ username, password }) => {
    if (!loading) loginMutation({ variables: { username, password } });
  };

  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      {error ? <ErrorTxt>{error}</ErrorTxt> : null}
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, ...rest } }) => (
          <FormInput
            {...rest}
            onChangeText={onChange}
            placeholderTextColor={theme.colors.borderColor}
            placeholder="Username"
            onSubmitEditing={() => setFocus("password")}
            returnKeyType="next"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, ...rest } }) => (
          <FormInput
            {...rest}
            onChangeText={onChange}
            onSubmitEditing={handleSubmit(onValid)}
            placeholderTextColor={theme.colors.borderColor}
            placeholder="Password"
            secureTextEntry={true}
          />
        )}
      />
      <FormBtn disabled={!isValid} onPress={handleSubmit(onValid)}>
        <BtnTxt>{loading ? <ActivityIndicator /> : "Log in"}</BtnTxt>
      </FormBtn>
      <BottomBox>
        <BottomTxt>Don't have an account?</BottomTxt>
        <SignupBtn onPress={() => navigation.navigate("Signup")}>
          <SignupTxt>Sign up.</SignupTxt>
        </SignupBtn>
      </BottomBox>
    </Container>
  );
};

export default Login;
