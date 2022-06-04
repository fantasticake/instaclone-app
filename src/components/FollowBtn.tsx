import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import styled from "styled-components/native";
import {
  FollowMutation,
  FollowMutationVariables,
  UnfollowMutation,
  UnfollowMutationVariables,
} from "../generated/generated";

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const BtnTxt = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 600;
`;

const FOLLOW_MUTATION = gql`
  mutation follow($userId: Int!) {
    follow(userId: $userId) {
      ok
      error
    }
  }
`;

const UNFOLLOW_MUTATION = gql`
  mutation unfollow($userId: Int!) {
    unfollow(userId: $userId) {
      ok
      error
    }
  }
`;

const FollowBtn = ({
  isFollowing,
  userId,
}: {
  isFollowing: boolean;
  userId: number;
}) => {
  const updateMutationFollow: MutationUpdaterFunction<
    FollowMutation,
    FollowMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.follow.ok) {
      cache.modify({
        id: `User:${userId}`,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
          totalFollowers(prev) {
            return prev + 1;
          },
        },
      });
    }
  };

  const updateMutationUnfollow: MutationUpdaterFunction<
    UnfollowMutation,
    UnfollowMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.unfollow.ok) {
      cache.modify({
        id: `User:${userId}`,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
          totalFollowers(prev) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [followMutation, { loading: loadingFollow }] = useMutation<
    FollowMutation,
    FollowMutationVariables
  >(FOLLOW_MUTATION, { variables: { userId }, update: updateMutationFollow });
  const [unfollowMutation, { loading: loadingUnfollow }] = useMutation<
    UnfollowMutation,
    UnfollowMutationVariables
  >(UNFOLLOW_MUTATION, {
    variables: { userId },
    update: updateMutationUnfollow,
  });

  const onPress = () => {
    if (isFollowing) {
      if (!loadingUnfollow) unfollowMutation();
    } else if (!loadingFollow) followMutation();
  };

  return (
    <Button onPress={onPress}>
      <BtnTxt>{isFollowing ? "Unfollow" : "Follow"}</BtnTxt>
    </Button>
  );
};

export default FollowBtn;
