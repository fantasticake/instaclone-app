import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import styled from "styled-components/native";
import Loading from "../components/Loading";
import {
  DeletePhotoMutation,
  DeletePhotoMutationVariables,
} from "../generated/generated";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 30px;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.borderColor};
  border-radius: 10px;
  height: 40px;
  margin-bottom: 20px;
`;

const BtnTxt = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
`;

const DELETE_PHOTO_MUTATION = gql`
  mutation deletePhoto($photoId: Int!) {
    deletePhoto(photoId: $photoId) {
      ok
      error
    }
  }
`;

const PostSetting = ({ navigation, route: { params } }) => {
  const updateMutation: MutationUpdaterFunction<
    DeletePhotoMutation,
    DeletePhotoMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.deletePhoto.ok) {
      cache.evict({ id: `Photo:${params?.photoId}` });
      navigation.navigate("HomeStack", { screen: "Home" });
    }
  };

  const [deletePhotoMutation, { loading: deleteLoading }] = useMutation<
    DeletePhotoMutation,
    DeletePhotoMutationVariables
  >(DELETE_PHOTO_MUTATION, {
    variables: { photoId: params?.photoId },
    update: updateMutation,
  });

  return (
    <Container>
      <Button
        onPress={() =>
          navigation.navigate("EditPost", { photoId: params?.photoId })
        }
      >
        <BtnTxt>Edit Post</BtnTxt>
      </Button>
      <Button onPress={() => deletePhotoMutation()}>
        <BtnTxt style={{ color: "tomato" }}>
          {deleteLoading ? <Loading /> : "Delete Post"}
        </BtnTxt>
      </Button>
    </Container>
  );
};

export default PostSetting;
