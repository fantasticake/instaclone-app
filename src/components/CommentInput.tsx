import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styled, { useTheme } from "styled-components/native";
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from "../generated/generated";
import useMe from "../hooks/useMe";
import Avatar from "./Avatar";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0 14px;
`;

const Input = styled.TextInput`
  width: 80%;
  border-radius: 10px;
  padding: 0 8px;
  color: ${(props) => props.theme.colors.textColor};
`;

const PostBtn = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? "0.6" : 1)};
`;

const PostBtnTxt = styled.Text`
  color: ${(props) => props.theme.colors.blue};
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

interface Inputs {
  payload: string;
}

const CommentInput = ({ photoId }: { photoId: number }) => {
  const meData = useMe();
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const updateMutation: MutationUpdaterFunction<
    CreateCommentMutation,
    CreateCommentMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data.createComment.ok && meData.seeMe) {
      const { id: commentId } = data.createComment;
      const newComment = {
        __typename: "Comment",
        id: commentId,
        payload: getValues("payload"),
        user: {
          ...meData.seeMe,
        },
      };
      const newCommentFragment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment NewComment on Comment {
            __typename
            id
            payload
            user {
              id
              username
              avatar
            }
          }
        `,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          totalComments(prev) {
            return prev + 1;
          },
        },
      });
      cache.modify({
        id: `ROOT_QUERY`,
        fields: {
          seeComments(prev, { storeFieldName }) {
            if (
              storeFieldName.startsWith(`seeComments({"photoId":${photoId}`)
            ) {
              return [newCommentFragment, ...prev];
            }
            return prev;
          },
        },
      });
      setValue("payload", "");
    }
  };

  const [createCommentMutation, { loading }] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CREATE_COMMENT_MUTATION, { update: updateMutation });

  const onValid: SubmitHandler<Inputs> = ({ payload }) => {
    if (!loading) {
      createCommentMutation({ variables: { photoId, payload } });
    }
  };

  return (
    <Container>
      <Avatar size={30} avatar={meData?.seeMe?.avatar} />

      <Controller
        name="payload"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, ...rest } }) => (
          <Input
            {...rest}
            onChangeText={onChange}
            placeholder="Add a comment..."
            placeholderTextColor={theme.colors.borderColor}
            onSubmitEditing={handleSubmit(onValid)}
          />
        )}
      />
      <PostBtn disabled={!isValid} onPress={handleSubmit(onValid)}>
        <PostBtnTxt>Post</PostBtnTxt>
      </PostBtn>
    </Container>
  );
};

export default CommentInput;
