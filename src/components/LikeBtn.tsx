import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import styled, { useTheme } from "styled-components/native";
import {
  LikePhotoMutation,
  LikePhotoMutationVariables,
  UnlikePhotoMutation,
  UnlikePhotoMutationVariables,
} from "../generated/generated";

const Button = styled.TouchableOpacity``;

const LIKE_PHOTO_MUTATION = gql`
  mutation likePhoto($photoId: Int!) {
    likePhoto(photoId: $photoId) {
      ok
      error
    }
  }
`;

const UNLIKE_PHOTO_MUTATION = gql`
  mutation unlikePhoto($photoId: Int!) {
    unlikePhoto(photoId: $photoId) {
      ok
      error
    }
  }
`;

const LikeBtn = ({
  isLiked,
  photoId,
}: {
  isLiked: boolean;
  photoId: number;
}) => {
  const theme = useTheme();

  const updateLikeMutation: MutationUpdaterFunction<
    LikePhotoMutation,
    LikePhotoMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, data) => {
    cache.modify({
      id: `Photo:${photoId}`,
      fields: {
        isLiked(prev) {
          return !prev;
        },
        totalLikes(prev) {
          return prev + 1;
        },
      },
    });
  };

  const updateUnlikeMutation: MutationUpdaterFunction<
    UnlikePhotoMutation,
    UnlikePhotoMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, data) => {
    cache.modify({
      id: `Photo:${photoId}`,
      fields: {
        isLiked(prev) {
          return !prev;
        },
        totalLikes(prev) {
          return prev - 1;
        },
      },
    });
  };

  const [likeMutation, { loading: likeLoading }] = useMutation<
    LikePhotoMutation,
    LikePhotoMutationVariables
  >(LIKE_PHOTO_MUTATION, {
    variables: { photoId: photoId },
    update: updateLikeMutation,
  });

  const [unlikeMutation, { loading: unlikeLoading }] = useMutation<
    UnlikePhotoMutation,
    UnlikePhotoMutationVariables
  >(UNLIKE_PHOTO_MUTATION, {
    variables: { photoId: photoId },
    update: updateUnlikeMutation,
  });

  const toggleLike = async () => {
    if (!likeLoading && !unlikeLoading) {
      if (isLiked) {
        await unlikeMutation();
      } else {
        await likeMutation();
      }
    }
  };

  return (
    <Button onPress={toggleLike}>
      <FontAwesomeIcon
        size={24}
        color={isLiked ? "tomato" : theme.colors.textColor}
        icon={isLiked ? faHeartSolid : faHeart}
      />
    </Button>
  );
};

export default LikeBtn;
