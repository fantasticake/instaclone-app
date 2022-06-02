import { gql, useQuery } from "@apollo/client";
import { faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import styled, { useTheme } from "styled-components/native";
import {
  SeeCommentsQuery,
  SeeCommentsQueryVariables,
} from "../generated/generated";
import useImageRatio from "../hooks/useImageRatio";
import useMe from "../hooks/useMe";
import { formatNumber } from "../utils";
import Avatar from "./Avatar";
import CommentInput from "./CommentInput";
import LikeBtn from "./LikeBtn";
import Loading from "./Loading";

const Container = styled.View`
  margin-bottom: 10px;
`;

const UserBoxBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 14px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Username = styled.Text`
  margin-left: 10px;
  color: ${(props) => props.theme.colors.textColor};
`;

const Image = styled.Image`
  width: 100%;
`;

const ControlBox = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  padding: 0 16px;
`;

const Button = styled.TouchableOpacity`
  margin-right: 16px;
`;

const TotalLikes = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 600;
`;

const CommentBox = styled.View`
  padding: 0 12px;
  width: 90%;
  margin-bottom: 4px;
`;

const CommentContainer = styled.View`
  flex-direction: row;
`;

const ProfileBtn = styled.TouchableOpacity``;

const CommentUsername = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 600;
  margin-right: 6px;
`;

const CommentPayload = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
`;

const TotalCommentsBtn = styled.TouchableOpacity``;

const TotalComments = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  opacity: 0.7;
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

const Feed = ({
  photo,
}: {
  photo: {
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
}) => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const { photoRatio, loading } = useImageRatio(photo.url);
  const { data } = useQuery<SeeCommentsQuery, SeeCommentsQueryVariables>(
    SEE_COMMENTS_QUERY,
    { variables: { photoId: photo.id, take: 2 } }
  );

  return (
    <Container>
      <UserBoxBtn
        onPress={() =>
          navigation.navigate("Profile", { userId: photo?.user.id })
        }
      >
        <UserInfo>
          <Avatar avatar={photo.user.avatar} size={30} />
          <Username>{photo.user.username}</Username>
        </UserInfo>
      </UserBoxBtn>
      {loading ? (
        <Loading />
      ) : (
        <Image
          style={{ height: windowWidth * photoRatio }}
          source={{ uri: photo.url }}
        />
      )}
      <ControlBox>
        <Button>
          <LikeBtn photoId={photo.id} isLiked={photo.isLiked} />
        </Button>
        <Button onPress={() => navigation.navigate("Comments", { ...photo })}>
          <FontAwesomeIcon
            size={24}
            color={theme.colors.textColor}
            icon={faComment}
          />
        </Button>
        <Button>
          <FontAwesomeIcon
            size={24}
            color={theme.colors.textColor}
            icon={faPaperPlane}
          />
        </Button>
      </ControlBox>
      <CommentBox>
        <TotalLikes>{formatNumber(photo.totalLikes, "like")}</TotalLikes>
        <CommentContainer>
          <ProfileBtn
            onPress={() =>
              navigation.navigate("Profile", { userId: photo?.user.id })
            }
          >
            <CommentUsername>{photo.user.username}</CommentUsername>
          </ProfileBtn>
          <CommentPayload>{photo.caption}</CommentPayload>
        </CommentContainer>
        <TotalCommentsBtn
          onPress={() => navigation.navigate("Comments", { ...photo })}
        >
          <TotalComments>
            View all {formatNumber(photo.totalComments, "comment")}
          </TotalComments>
        </TotalCommentsBtn>
        {data?.seeComments && (
          <FlatList
            data={data.seeComments.slice(0, 2)}
            renderItem={({ item: comment }) => (
              <CommentContainer>
                <ProfileBtn
                  onPress={() =>
                    navigation.navigate("Profile", { userId: comment.user.id })
                  }
                >
                  <CommentUsername>{comment.user.username}</CommentUsername>
                </ProfileBtn>
                <CommentPayload>{comment.payload}</CommentPayload>
              </CommentContainer>
            )}
          />
        )}
      </CommentBox>
      <CommentInput photoId={photo.id} />
    </Container>
  );
};
export default Feed;
