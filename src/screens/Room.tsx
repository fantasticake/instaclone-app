import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FlatList } from "react-native";
import styled, { useTheme } from "styled-components/native";
import Avatar from "../components/Avatar";
import Loading from "../components/Loading";
import {
  CreateMessageMutation,
  CreateMessageMutationVariables,
  RoomUpdatedSubscription,
  RoomUpdatedSubscriptionVariables,
  SeeRoomWithMessagesQuery,
  SeeRoomWithMessagesQueryVariables,
} from "../generated/generated";
import useMe from "../hooks/useMe";

const HeaderTitleBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const HeaderUsername = styled.Text`
  margin-left: 10px;
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 600;
`;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const ItemSeparator = styled.View`
  height: 20px;
`;

const CommentBox = styled.View<{ isMine: boolean }>`
  flex-direction: ${(props) => (props.isMine ? "row-reverse" : "row")};
`;

const AvatarBtn = styled.TouchableOpacity``;

const Payload = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.borderColor};
  border-radius: 10px;
  margin: 0 10px;
  padding: 6px 10px;
  max-width: 250px;
`;

const InputBox = styled.View`
  justify-content: center;
  margin-top: 30px;
`;

const Input = styled.TextInput`
  color: ${(props) => props.theme.colors.textColor};
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.borderColor};
  height: 40px;
  width: 90%;
  align-self: center;
  border-radius: 20px;
  padding: 0 20px;
  padding-right: 70px;
`;

const SendBtn = styled.TouchableOpacity`
  position: absolute;
  right: 40px;
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
`;

const SendBtnTxt = styled.Text`
  color: ${(props) => props.theme.colors.blue};
`;

const SEE_ROOM_WITH_MESSAGES_QUERY = gql`
  query seeRoomWithMessages($roomId: Int!) {
    seeRoom(roomId: $roomId) {
      id
      users {
        id
        username
        avatar
      }
    }
    seeMessages(roomId: $roomId) {
      id
      payload
      user {
        id
        avatar
      }
      createdAt
    }
  }
`;

const ROOM_UPDATED_SUBSCRIPTION = gql`
  subscription roomUpdated($roomId: Int!) {
    roomUpdated(roomId: $roomId) {
      id
      payload
      user {
        id
        avatar
      }
      createdAt
    }
  }
`;

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($roomId: Int, $userId: Int, $payload: String!) {
    createMessage(roomId: $roomId, userId: $userId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

interface Inputs {
  payload: string;
}

const Room = ({ navigation, route: { params } }) => {
  const theme = useTheme();
  const meData = useMe();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const { data, loading, subscribeToMore } = useQuery<
    SeeRoomWithMessagesQuery,
    SeeRoomWithMessagesQueryVariables
  >(SEE_ROOM_WITH_MESSAGES_QUERY, {
    variables: { roomId: params?.roomId },
  });

  const updateMutation: MutationUpdaterFunction<
    CreateMessageMutation,
    CreateMessageMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.createMessage.ok) {
      const message = {
        __typename: "Message",
        id: data.createMessage.id,
        payload: getValues("payload"),
        user: {
          ...meData?.seeMe,
        },
        createdAt: Date.now() + "",
      };
      const messageFragment = cache.writeFragment({
        id: `Message:${data.createMessage.id}`,
        data: message,
        fragment: gql`
          fragment newMessage on Message {
            __typename
            id
            payload
            user {
              id
              username
              avatar
            }
            createdAt
          }
        `,
      });
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeMessages(prev, { storeFieldName }) {
            if (storeFieldName == `seeMessages({"roomId":${params?.roomId}})`) {
              return [messageFragment, ...prev];
            }
            return prev;
          },
        },
      });
      setValue("payload", "");
    }
  };

  const [createMessageMutation, { loading: mutationLoading }] = useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(CREATE_MESSAGE_MUTATION, { update: updateMutation });

  const onValid: SubmitHandler<Inputs> = ({ payload }) => {
    if (!mutationLoading) {
      createMessageMutation({
        variables: { roomId: params?.roomId, payload },
      });
    }
  };

  const roomUser = data?.seeRoom.users.find(
    (user) => user.id != meData?.seeMe.id
  );

  const HeaderTitle = () => (
    <HeaderTitleBtn
      onPress={() =>
        navigation.navigate("TabNav", {
          screen: "HomeStack",
          params: {
            screen: "Profile",
            params: { userId: roomUser.id },
          },
        })
      }
    >
      <Avatar size={30} avatar={roomUser?.avatar} />
      <HeaderUsername>{roomUser?.username}</HeaderUsername>
    </HeaderTitleBtn>
  );
  useEffect(() => {
    if (roomUser) {
      navigation.setOptions({ headerTitle: HeaderTitle });
    }
  }, [roomUser]);

  useEffect(() => {
    if (!isSubscribed) {
      subscribeToMore<
        RoomUpdatedSubscription,
        RoomUpdatedSubscriptionVariables
      >({
        document: ROOM_UPDATED_SUBSCRIPTION,
        variables: { roomId: params?.roomId },
        updateQuery: (prev, { subscriptionData }) => {
          if (subscriptionData.data && prev.seeMessages) {
            return {
              ...prev,
              seeMessages: [
                subscriptionData.data.roomUpdated,
                ...prev.seeMessages,
              ],
            };
          }
          return prev;
        },
      });
      setIsSubscribed(true);
    }
  }, [params, subscribeToMore, isSubscribed]);

  return loading || !data?.seeRoom || !data?.seeMessages ? (
    <Loading />
  ) : (
    <Container>
      <FlatList
        inverted
        ItemSeparatorComponent={ItemSeparator}
        data={data.seeMessages}
        renderItem={({ item: message }) =>
          message ? (
            <CommentBox isMine={message.user.id == meData.seeMe.id}>
              <AvatarBtn
                onPress={() =>
                  navigation.navigate("TabNav", {
                    screen: "HomeStack",
                    params: {
                      screen: "Profile",
                      params: { userId: message.user.id },
                    },
                  })
                }
              >
                <Avatar size={30} avatar={message.user.avatar} />
              </AvatarBtn>
              <Payload>{message.payload}</Payload>
            </CommentBox>
          ) : null
        }
      />
      <InputBox>
        <Controller
          name="payload"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, ...rest } }) => (
            <Input
              {...rest}
              onChangeText={onChange}
              placeholderTextColor={theme.colors.borderColor}
              placeholder="Message..."
              onSubmitEditing={handleSubmit(onValid)}
            />
          )}
        />
        <SendBtn onPress={handleSubmit(onValid)} disabled={!isValid}>
          <SendBtnTxt>{mutationLoading ? <Loading /> : "Send"}</SendBtnTxt>
        </SendBtn>
      </InputBox>
    </Container>
  );
};

export default Room;
