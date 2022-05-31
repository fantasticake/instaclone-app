import { gql, useQuery } from "@apollo/client";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faHeart,
  faPaperPlane,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import styled, { useTheme } from "styled-components/native";
import Loading from "../components/Loading";
import { SeeFeedQuery, SeeFeedQueryVariables } from "../generated/generated";
import Avatar from "../components/Avatar";
import { FlatList } from "react-native";
import { formatNumber } from "../utils";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const Feed = styled.View``;

const UserBox = styled.View`
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

const Photo = styled.Image`
  width: 100%;
  height: 300px;
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
`;

const SEEFEED_QUERY = gql`
  query seeFeed($offset: Int) {
    seeFeed(offset: $offset) {
      id
      url
      caption
      isLiked
      totalLikes
      totalComments
      createdAt
      user {
        id
        username
        avatar
      }
    }
  }
`;

const Home = () => {
  const theme = useTheme();
  const { data, loading } = useQuery<SeeFeedQuery, SeeFeedQueryVariables>(
    SEEFEED_QUERY
  );
  return loading ? (
    <Loading />
  ) : (
    <Container>
      <FlatList
        data={data.seeFeed}
        renderItem={({ item: photo }) => (
          <Feed key={photo.id}>
            <UserBox>
              <UserInfo>
                <Avatar avatar={photo.user.avatar} size={30} />
                <Username>{photo.user.username}</Username>
              </UserInfo>
              <FontAwesomeIcon
                color={theme.colors.textColor}
                icon={faEllipsisVertical}
              />
            </UserBox>
            <Photo source={{ uri: photo.url }} />
            <ControlBox>
              <Button>
                <FontAwesomeIcon
                  size={24}
                  color={theme.colors.textColor}
                  icon={faHeart}
                />
              </Button>
              <Button>
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
            <TotalLikes>{formatNumber(photo.totalLikes, "like")}</TotalLikes>
          </Feed>
        )}
      />
    </Container>
  );
};

export default Home;
