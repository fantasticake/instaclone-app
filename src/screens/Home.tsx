import { gql, useQuery } from "@apollo/client";
import styled from "styled-components/native";
import Loading from "../components/Loading";
import { SeeFeedQuery, SeeFeedQueryVariables } from "../generated/generated";
import { FlatList } from "react-native";
import Feed from "../components/Feed";
import { useState } from "react";
import BottomLoading from "../components/BottomLoading";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
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
  const { data, loading, fetchMore, refetch } = useQuery<
    SeeFeedQuery,
    SeeFeedQueryVariables
  >(SEEFEED_QUERY);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return loading || !data?.seeFeed ? (
    <Loading />
  ) : (
    <Container>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={async () => {
          if (!loadingMore) {
            setLoadingMore(true);
            await fetchMore({ variables: { offset: data.seeFeed.length } });
            setLoadingMore(false);
          }
        }}
        onEndReachedThreshold={0.5}
        data={data.seeFeed}
        renderItem={({ item: photo }) => <Feed photo={photo} />}
      />
      <BottomLoading loading={loadingMore} />
    </Container>
  );
};

export default Home;
