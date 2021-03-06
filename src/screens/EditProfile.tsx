import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Avatar from "../components/Avatar";
import CheckBtn from "../components/CheckBtn";
import FormBtn from "../components/form/FormBtn";
import Loading from "../components/Loading";
import {
  EditProfileMutation,
  EditProfileMutationVariables,
} from "../generated/generated";
import useMe from "../hooks/useMe";

const HeaderRightContainer = styled.View`
  margin-right: 16px;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 30px 20px;
`;

const AvatarBox = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const ChangeAvatarBtn = styled.TouchableOpacity``;

const ChangeAvatarBtnTxt = styled.Text`
  color: ${(props) => props.theme.colors.blue};
  margin-top: 16px;
  font-size: 16px;
`;

const InputBox = styled.View`
  margin-bottom: 16px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.borderColor};
`;

const Label = styled.Text`
  color: ${(props) => props.theme.colors.borderColor};
`;

const Input = styled.TextInput`
  color: ${(props) => props.theme.colors.textColor};
`;

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($email: String, $avatar: Upload) {
    editProfile(email: $email, avatar: $avatar) {
      ok
      error
    }
  }
`;

interface Inputs {
  username: string;
  email: string;
}

const EditProfile = ({ navigation }) => {
  const theme = useTheme();
  const meData = useMe();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      username: meData?.seeMe?.username,
    },
  });

  const updateMutation: MutationUpdaterFunction<
    EditProfileMutation,
    EditProfileMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.editProfile.ok && meData?.seeMe) {
      cache.modify({
        id: `User:${meData.seeMe.id}`,
        fields: {
          email() {
            return getValues("email");
          },
        },
      });
    }
  };

  const [editProfileMutation, { loading }] = useMutation<
    EditProfileMutation,
    EditProfileMutationVariables
  >(EDIT_PROFILE_MUTATION);

  const onValid: SubmitHandler<Inputs> = ({ email }) => {
    if (!loading) {
      editProfileMutation({ variables: { email }, update: updateMutation });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightContainer>
          {loading ? (
            <Loading />
          ) : (
            <CheckBtn onPress={handleSubmit(onValid)} disabled={!isValid} />
          )}
        </HeaderRightContainer>
      ),
    });
  }, [isValid, loading]);

  return meData?.seeMe ? (
    <Container>
      <AvatarBox>
        <Avatar size={80} avatar={meData.seeMe.avatar} />
        <ChangeAvatarBtn
          onPress={() =>
            navigation.navigate("UploadStack", {
              screen: "CameraNav",
              params: { screen: "Gallery", params: { mode: "avatar" } },
            })
          }
        >
          <ChangeAvatarBtnTxt>Change profile photo</ChangeAvatarBtnTxt>
        </ChangeAvatarBtn>
      </AvatarBox>
      <InputBox>
        <Label>Username</Label>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, ...rest } }) => (
            <Input editable={false} {...rest} onChangeText={onChange} />
          )}
        />
      </InputBox>
      <InputBox>
        <Label>Email</Label>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              {...rest}
              defaultValue={meData?.seeMe.email}
              onChangeText={onChange}
            />
          )}
        />
      </InputBox>
    </Container>
  ) : (
    <Loading />
  );
};

export default EditProfile;
