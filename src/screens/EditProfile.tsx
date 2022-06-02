import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components/native";
import Avatar from "../components/Avatar";
import FormBtn from "../components/form/FormBtn";
import Loading from "../components/Loading";
import useMe from "../hooks/useMe";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 20px;
`;

const AvatarBox = styled.View`
  align-items: center;
  margin-bottom: 16px;
`;

const ChangeAvatarBtn = styled.TouchableOpacity``;

const ChangeAvatarBtnTxt = styled.Text`
  color: ${(props) => props.theme.colors.blue};
  margin-top: 10px;
  font-size: 16px;
`;

const InputBox = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  color: ${(props) => props.theme.colors.borderColor};
`;

const Input = styled.TextInput`
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.borderColor};
  color: ${(props) => props.theme.colors.textColor};
`;

const SaveBtnContainer = styled.View`
  margin-top: 16px;
`;

const SaveBtnTxt = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  font-size: 16px;
`;

interface Inputs {
  username: string;
  email: string;
}

const EditProfile = () => {
  const meData = useMe();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      username: meData?.seeMe?.username,
      email: meData?.seeMe?.email,
    },
  });

  const onValid: SubmitHandler<Inputs> = ({ email }) => {};

  return meData?.seeMe ? (
    <Container>
      <AvatarBox>
        <Avatar size={80} avatar={meData.seeMe.avatar} />
        <ChangeAvatarBtn>
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
            <Input {...rest} onChangeText={onChange} />
          )}
        />
      </InputBox>
      <SaveBtnContainer>
        <FormBtn disabled={!isValid}>
          <SaveBtnTxt>Save</SaveBtnTxt>
        </FormBtn>
      </SaveBtnContainer>
    </Container>
  ) : (
    <Loading />
  );
};

export default EditProfile;
