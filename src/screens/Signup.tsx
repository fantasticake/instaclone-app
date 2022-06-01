import styled, { useTheme } from "styled-components/native";
import FormInput from "../components/form/FormInput";
import FormBtn from "../components/form/FormBtn";
import Logo from "../components/Logo";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  SignUpMutation,
  SignUpMutationVariables,
} from "../generated/generated";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

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

const LoginBtn = styled.TouchableOpacity``;

const LoginTxt = styled.Text`
  color: ${(props) => props.theme.colors.blue};
`;

const SIGNUP_MUTATION = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;

interface Inputs {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Signup = ({ navigation }) => {
  const theme = useTheme();
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    getValues,
    setFocus,
    formState: { isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const updateMutation: MutationUpdaterFunction<
    SignUpMutation,
    SignUpMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data.signUp.ok) {
      navigation.navigate("Login", {
        username: getValues("username"),
        password: getValues("password"),
      });
    } else {
      setError(data.signUp.error);
    }
  };

  const [signupMutation, { loading }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGNUP_MUTATION, {
    update: updateMutation,
  });

  const onValid: SubmitHandler<Inputs> = ({
    username,
    email,
    password,
    passwordConfirm,
  }) => {
    if (!loading) {
      if (password == passwordConfirm) {
        signupMutation({ variables: { username, email, password } });
      } else setError("Password not matching.");
    }
  };

  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      {error ? <ErrorTxt>{error}</ErrorTxt> : null}
      <Controller
        control={control}
        name="username"
        rules={{ required: true }}
        render={({ field: { onChange, ...rest } }) => (
          <FormInput
            {...rest}
            onChangeText={onChange}
            placeholderTextColor={theme.colors.borderColor}
            placeholder="Username"
            onSubmitEditing={() => setFocus("email")}
            returnKeyType="next"
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, ...rest } }) => (
          <FormInput
            {...rest}
            onChangeText={onChange}
            placeholderTextColor={theme.colors.borderColor}
            placeholder="Email"
            onSubmitEditing={() => setFocus("password")}
            returnKeyType="next"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { onChange, ...rest } }) => (
          <FormInput
            {...rest}
            onChangeText={onChange}
            placeholderTextColor={theme.colors.borderColor}
            placeholder="Password"
            secureTextEntry={true}
            onSubmitEditing={() => setFocus("passwordConfirm")}
            returnKeyType="next"
          />
        )}
      />
      <Controller
        control={control}
        name="passwordConfirm"
        rules={{ required: true }}
        render={({ field: { onChange, ...rest } }) => (
          <FormInput
            {...rest}
            onChangeText={onChange}
            onSubmitEditing={handleSubmit(onValid)}
            placeholderTextColor={theme.colors.borderColor}
            placeholder="Password Confirm"
            secureTextEntry={true}
          />
        )}
      />
      <FormBtn disabled={!isValid} onPress={handleSubmit(onValid)}>
        <BtnTxt>{loading ? <ActivityIndicator /> : "Create account"}</BtnTxt>
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
