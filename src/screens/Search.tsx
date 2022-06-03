import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Avatar from "../components/Avatar";
import Loading from "../components/Loading";
import {
  SearchUsersQuery,
  SearchUsersQueryVariables,
  SeePhotosQuery,
  SeePhotosQueryVariables,
} from "../generated/generated";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 20px 0;
`;

const InputBox = styled.View`
  padding: 0 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const BackBtn = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Input = styled.TextInput`
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.borderColor};
  border-radius: 10px;
  width: 90%;
  height: 40px;
  color: ${(props) => props.theme.colors.textColor};
  padding: 0 16px;
`;

const PhotoBtn = styled.TouchableOpacity``;

const Photo = styled.Image``;

const UserBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  padding: 0 20px;
`;

const Username = styled.Text`
  margin-left: 10px;
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 600;
`;

const SEE_PHOTOS_QUERY = gql`
  query seePhotos($offset: Int) {
    seePhotos(offset: $offset) {
      id
      url
    }
  }
`;

const SEARCH_USERS_QUERY = gql`
  query searchUsers($key: String!) {
    searchUsers(key: $key) {
      id
      username
      avatar
    }
  }
`;

const Search = ({ navigation }) => {
  const theme = useTheme();
  const [isTyping, setIsTyping] = useState(false);
  const windowWidth = Dimensions.get("window").width;

  const { data: seePhotosData, loading: seePhotosLoading } = useQuery<
    SeePhotosQuery,
    SeePhotosQueryVariables
  >(SEE_PHOTOS_QUERY);

  const [searchUsersQuery, { data, loading }] = useLazyQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(SEARCH_USERS_QUERY);

  const onChangeText = (text) => {
    if (text) {
      searchUsersQuery({ variables: { key: text } });
    }
  };

  return (
    <Container>
      <InputBox>
        {isTyping ? (
          <BackBtn onPress={() => setIsTyping(false)}>
            <FontAwesomeIcon
              size={20}
              color={theme.colors.textColor}
              icon={faArrowLeft}
            />
          </BackBtn>
        ) : null}
        <Input
          onPressIn={() => setIsTyping(true)}
          placeholder="Search"
          onChangeText={onChangeText}
          placeholderTextColor={theme.colors.borderColor}
        />
      </InputBox>
      {isTyping ? (
        loading ? (
          <Loading />
        ) : (
          <FlatList
            data={data?.searchUsers}
            key={"_"}
            keyExtractor={(item) => item.id + ""}
            renderItem={({ item: user }) => (
              <UserBtn
                onPress={() =>
                  navigation.navigate("Profile", { userId: user.id })
                }
              >
                <Avatar size={60} avatar={user?.avatar} />
                <Username>{user.username}</Username>
              </UserBtn>
            )}
          />
        )
      ) : seePhotosLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={seePhotosData.seePhotos}
          key={"#"}
          keyExtractor={(item) => item.id + ""}
          numColumns={3}
          renderItem={({ item: photo }) => (
            <PhotoBtn
              onPress={() => navigation.navigate("Post", { photoId: photo.id })}
            >
              <Photo
                style={{ width: windowWidth / 3, height: windowWidth / 3 }}
                source={{ uri: photo.url }}
              />
            </PhotoBtn>
          )}
        />
      )}
    </Container>
  );
};

export default Search;
