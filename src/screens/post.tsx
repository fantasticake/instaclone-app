import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { FlatList } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Feed from "../components/Feed";
import Loading from "../components/Loading";
import {
  PhotoDetailQuery,
  PhotoDetailQueryVariables,
} from "../generated/generated";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const PHOTO_DETAIL_QUERY = gql`
  query photoDetail($photoId: Int!) {
    photoDetail(photoId: $photoId) {
      id
      url
      caption
      isLiked
      user {
        id
        username
        avatar
      }
      totalLikes
      totalComments
      createdAt
    }
  }
`;

const Post = ({ navigation, route: { params } }) => {
  const theme = useTheme();

  const { data, loading } = useQuery<
    PhotoDetailQuery,
    PhotoDetailQueryVariables
  >(PHOTO_DETAIL_QUERY, { variables: { photoId: params.photoId } });

  useEffect(() => {
    navigation.setOptions({ headerRight: () => null });
  }, []);

  return loading || !data?.photoDetail ? (
    <Loading />
  ) : (
    <Container>
      <FlatList
        contentContainerStyle={{
          backgroundColor: theme.colors.backgroundColor,
        }}
        data={[data.photoDetail]}
        renderItem={({ item: photo }) => <Feed photo={photo} />}
      />
    </Container>
  );
};

export default Post;
