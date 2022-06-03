import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styled, { useTheme } from "styled-components/native";
import CheckBtn from "../components/CheckBtn";
import Loading from "../components/Loading";
import {
  CreatePhotoMutation,
  CreatePhotoMutationVariables,
} from "../generated/generated";
import useMe from "../hooks/useMe";
import { createRNFile } from "../utils";

const HeaderRightContainer = styled.View`
  margin-right: 16px;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 30px 16px;
`;

const PostBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PostImg = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 12px;
`;

const Input = styled.TextInput`
  width: 240px;
  height: 40px;
  color: ${(props) => props.theme.colors.textColor};
`;

const CREATE_PHOTO_MUTATION = gql`
  mutation createPhoto($file: Upload!, $caption: String) {
    createPhoto(file: $file, caption: $caption) {
      ok
      id
      error
    }
  }
`;

interface Inputs {
  caption: string;
}

const CreatePost = ({ navigation, route: { params } }) => {
  const meData = useMe();
  const theme = useTheme();
  const { control, handleSubmit, getValues } = useForm<Inputs>({
    mode: "onChange",
  });

  const updateMutation: MutationUpdaterFunction<
    CreatePhotoMutation,
    CreatePhotoMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.createPhoto.ok && meData?.seeMe && params?.uri) {
      const newPhoto = {
        __typename: "Photo",
        id: data.createPhoto.id,
        url: params.uri,
        caption: getValues("caption") || "",
        isLiked: false,
        totalLikes: 0,
        totalComments: 0,
        createdAt: Date.now() + "",
        user: {
          ...meData.seeMe,
        },
      };
      const newPhotoFragment = cache.writeFragment({
        data: newPhoto,
        fragment: gql`
          fragment NewPhoto on Photo {
            id
            url
            caption
            isLiked
            totalLikes
            totalComments
            createdAt
            user {
              id
              avatar
              username
            }
          }
        `,
      });
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [newPhotoFragment, ...prev];
          },
          seePhotosByUser(prev, { storeFieldName }) {
            if (
              storeFieldName ==
              `seePhotosByUser:({"userId":${meData.seeMe?.id}})`
            )
              return [newPhotoFragment, ...prev];
          },
        },
      });
      navigation.navigate("TabNav");
    }
  };

  const [createPhotoMutation, { loading }] = useMutation<
    CreatePhotoMutation,
    CreatePhotoMutationVariables
  >(CREATE_PHOTO_MUTATION, { update: updateMutation });

  const onValid: SubmitHandler<Inputs> = ({ caption }) => {
    if (!loading) {
      const file = createRNFile(params.uri);
      createPhotoMutation({ variables: { file, caption } });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRightContainer>
          {loading ? <Loading /> : <CheckBtn onPress={handleSubmit(onValid)} />}
        </HeaderRightContainer>
      ),
    });
  }, [loading, CheckBtn, handleSubmit, onValid]);

  return (
    <Container>
      <PostBox>
        <PostImg source={{ uri: params.uri }} />
        <Controller
          name="caption"
          control={control}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              {...rest}
              placeholder="Write a caption..."
              placeholderTextColor={theme.colors.borderColor}
              onChangeText={onChange}
            />
          )}
        />
      </PostBox>
    </Container>
  );
};
export default CreatePost;
