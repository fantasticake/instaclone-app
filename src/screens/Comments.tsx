import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Avatar from "../components/Avatar";
import CommentInput from "../components/CommentInput";
import Loading from "../components/Loading";
import {
  SeeCommentsQuery,
  SeeCommentsQueryVariables,
} from "../generated/generated";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 10px 0;
`;

const CommentContainer = styled.View`
  flex-direction: row;
  padding: 16px;
  width: 65%;
`;

const ProfileBtn = styled.TouchableOpacity``;

const CommentTextBox = styled.View`
  flex-direction: row;
  margin-left: 10px;
`;

const CommentUsername = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  margin-right: 6px;
`;

const CommentPayload = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
`;

const SEE_COMMENTS_QUERY = gql`
  query seeComments($photoId: Int!, $take: Int) {
    seeComments(photoId: $photoId, take: $take) {
      id
      payload
      user {
        id
        avatar
        username
      }
    }
  }
`;

const Comments = ({
  navigation,
  route: { params: photo },
}: {
  navigation: any;
  route: {
    params: {
      __typename?: "Photo";
      id: number;
      url: string;
      caption?: string;
      isLiked: boolean;
      totalLikes: number;
      totalComments: number;
      createdAt: string;
      user: {
        __typename?: "User";
        id: number;
        username: string;
        avatar?: string;
      };
    };
  };
}) => {
  const { data, loading, refetch } = useQuery<
    SeeCommentsQuery,
    SeeCommentsQueryVariables
  >(SEE_COMMENTS_QUERY, { variables: { photoId: photo.id } });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <CommentContainer>
            <ProfileBtn
              onPress={() =>
                navigation.navigate("Profile", { userId: photo.user.id })
              }
            >
              <Avatar size={40} avatar={photo.user.avatar} />
            </ProfileBtn>
            <CommentTextBox>
              <ProfileBtn
                onPress={() =>
                  navigation.navigate("Profile", { userId: photo.user.id })
                }
              >
                <CommentUsername>{photo.user.username}</CommentUsername>
              </ProfileBtn>
              <CommentPayload>{photo.caption}</CommentPayload>
            </CommentTextBox>
          </CommentContainer>
        }
        data={data?.seeComments}
        renderItem={({ item: comment }) => (
          <CommentContainer>
            <ProfileBtn
              onPress={() =>
                navigation.navigate("Profile", { userId: comment.user.id })
              }
            >
              <Avatar size={40} avatar={comment.user.avatar} />
            </ProfileBtn>
            <CommentTextBox>
              <ProfileBtn
                onPress={() =>
                  navigation.navigate("Profile", { userId: comment.user.id })
                }
              >
                <CommentUsername>{comment.user.username}</CommentUsername>
              </ProfileBtn>
              <CommentPayload>{comment.payload}</CommentPayload>
            </CommentTextBox>
          </CommentContainer>
        )}
      />
      <CommentInput photoId={photo.id} />
    </Container>
  );
};

export default Comments;
