import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Dimensions, FlatList } from "react-native";
import styled from "styled-components/native";
import Avatar from "../components/Avatar";
import FollowBtn from "../components/FollowBtn";
import Loading from "../components/Loading";
import MessageBtn from "../components/MessageBtn";
import {
  SeeProfileWithPhotosQuery,
  SeeProfileWithPhotosQueryVariables,
} from "../generated/generated";
import useMe from "../hooks/useMe";
import { formatString } from "../utils";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const HeaderTitle = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  font-size: 24px;
`;

const UserBox = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const TotalBox = styled.View`
  flex-direction: row;
  margin-left: 20px;
`;

const TotalContainer = styled.View`
  align-items: center;
  width: 76px;
`;

const TotalNumber = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 600;
  font-size: 20px;
`;

const TotalTxt = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
`;

const Username = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 600;
  font-size: 18px;
  padding: 0 20px;
`;

const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 40px;
  padding: 0 20px;
`;

const BtnContainer = styled.View`
  height: 34px;
  width: 150px;
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.borderColor};
`;

const PostBtn = styled.TouchableOpacity``;

const Photo = styled.Image``;

const SEE_PROFILE_QUERY = gql`
  query seeProfileWithPhotos($userId: Int!) {
    seeProfile(userId: $userId) {
      id
      username
      avatar
      isFollowing
      totalPosts
      totalFollowing
      totalFollowers
    }
    seePhotosByUser(userId: $userId) {
      id
      url
      totalLikes
      totalComments
    }
  }
`;

const MyProfile = ({ navigation, route: { params } }) => {
  const meData = useMe();

  const { data, loading } = useQuery<
    SeeProfileWithPhotosQuery,
    SeeProfileWithPhotosQueryVariables
  >(SEE_PROFILE_QUERY, { variables: { userId: params?.userId } });

  useEffect(() => {
    if (meData?.seeMe?.id == params.userId) {
      navigation.goBack();
      navigation.navigate("MyProfileStack");
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderTitle>{data?.seeProfile?.username}</HeaderTitle>
      ),
    });
  }, [data]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <UserBox>
        <Avatar size={70} avatar={data.seeProfile.avatar} />
        <TotalBox>
          <TotalContainer>
            <TotalNumber>{data?.seeProfile.totalPosts}</TotalNumber>
            <TotalTxt>
              {formatString(data?.seeProfile.totalPosts, "Posts")}
            </TotalTxt>
          </TotalContainer>
          <TotalContainer>
            <TotalNumber>{data?.seeProfile.totalFollowers}</TotalNumber>
            <TotalTxt>
              {formatString(data?.seeProfile.totalFollowers, "Follower")}
            </TotalTxt>
          </TotalContainer>
          <TotalContainer>
            <TotalNumber>{data?.seeProfile.totalFollowing}</TotalNumber>
            <TotalTxt>Following</TotalTxt>
          </TotalContainer>
        </TotalBox>
      </UserBox>
      <Username>{data.seeProfile.username}</Username>
      <ButtonBox>
        <BtnContainer>
          <FollowBtn
            userId={data.seeProfile.id}
            isFollowing={data.seeProfile.isFollowing}
          />
        </BtnContainer>
        <BtnContainer>
          <MessageBtn userId={params?.userId}>Message</MessageBtn>
        </BtnContainer>
      </ButtonBox>
      <FlatList
        data={data?.seePhotosByUser}
        numColumns={3}
        renderItem={({ item: photo }) => (
          <PostBtn
            onPress={() => navigation.navigate("Post", { photoId: photo.id })}
          >
            <Photo
              style={{ width: WINDOW_WIDTH / 3, height: WINDOW_WIDTH / 3 }}
              source={{ uri: photo.url }}
            />
          </PostBtn>
        )}
      />
    </Container>
  );
};

export default MyProfile;
