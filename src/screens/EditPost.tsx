import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions } from "react-native";
import styled, { useTheme } from "styled-components/native";
import CheckBtn from "../components/CheckBtn";
import Loading from "../components/Loading";
import {
  EditPhotoMutation,
  EditPhotoMutationVariables,
  PhotoDetailForEditQuery,
  PhotoDetailForEditQueryVariables,
} from "../generated/generated";
import useImageRatio from "../hooks/useImageRatio";

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 30px 0;
`;

const Photo = styled.Image`
  width: 200px;
  height: 200px;
`;

const Input = styled.TextInput`
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.borderColor};
  border-radius: 10px;
  height: 40px;
  width: 90%;
  color: ${(props) => props.theme.colors.textColor};
  margin-top: 30px;
  padding: 0 14px;
`;

const PHOTO_DETAIL = gql`
  query photoDetailForEdit($photoId: Int!) {
    photoDetail(photoId: $photoId) {
      id
      url
      caption
    }
  }
`;

const EDIT_PHOTO_MUTATION = gql`
  mutation editPhoto($photoId: Int!, $caption: String) {
    editPhoto(photoId: $photoId, caption: $caption) {
      ok
      error
    }
  }
`;

interface Inputs {
  caption: string;
}

const EditPost = ({ navigation, route: { params } }) => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const { data, loading } = useQuery<
    PhotoDetailForEditQuery,
    PhotoDetailForEditQueryVariables
  >(PHOTO_DETAIL, {
    variables: { photoId: params?.photoId },
  });

  const updateMutation: MutationUpdaterFunction<
    EditPhotoMutation,
    EditPhotoMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.editPhoto.ok) {
      cache.modify({
        id: `Photo:${params?.photoId}`,
        fields: {
          caption() {
            return getValues("caption");
          },
        },
      });
      navigation.goBack();
    }
  };

  const [editPhotoMutation, { loading: editLoading }] = useMutation<
    EditPhotoMutation,
    EditPhotoMutationVariables
  >(EDIT_PHOTO_MUTATION, { update: updateMutation });

  const onValid: SubmitHandler<Inputs> = ({ caption }) => {
    if (!editLoading) {
      editPhotoMutation({ variables: { photoId: params?.photoId, caption } });
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CheckBtn
          loading={editLoading}
          onPress={handleSubmit(onValid)}
          disabled={!isValid}
          style={{ marginRight: 16 }}
        />
      ),
    });
  }, [isValid, editLoading]);

  return loading || !data?.photoDetail ? (
    <Loading />
  ) : (
    <Container>
      <Photo source={{ uri: data.photoDetail.url }} />
      <Controller
        name="caption"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, ...rest } }) => (
          <Input
            {...rest}
            onChangeText={onChange}
            placeholderTextColor={theme.colors.borderColor}
            placeholder="Write a caption..."
            defaultValue={data.photoDetail.caption}
          />
        )}
      />
    </Container>
  );
};

export default EditPost;
