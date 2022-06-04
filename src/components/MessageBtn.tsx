import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import {
  CreateRoomMutation,
  CreateRoomMutationVariables,
  SeeProfileQuery,
  SeeProfileQueryVariables,
} from "../generated/generated";
import useMe from "../hooks/useMe";
import Loading from "./Loading";

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

const SEE_PROFILE_QUERY = gql`
  query seeProfile($userId: Int!) {
    seeProfile(userId: $userId) {
      id
      username
      avatar
    }
  }
`;

const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($userId: Int!) {
    createRoom(userId: $userId) {
      ok
      id
      error
    }
  }
`;

const MessageBtn = ({
  userId,
  children,
}: {
  userId: number;
  children?: any;
}) => {
  const navigation = useNavigation<any>();
  const meData = useMe();

  const { data: userData } = useQuery<
    SeeProfileQuery,
    SeeProfileQueryVariables
  >(SEE_PROFILE_QUERY, {
    variables: { userId },
  });

  const updateMutation: MutationUpdaterFunction<
    CreateRoomMutation,
    CreateRoomMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (!data?.createRoom.ok && data?.createRoom.id) {
      navigation.navigate("RoomStack", {
        screen: "Room",
        params: { roomId: data.createRoom.id },
      });
    }

    if (data?.createRoom.ok) {
      const room = {
        __typename: "Room",
        id: data.createRoom.id,
        users: [{ ...userData?.seeProfile }, { ...meData?.seeMe }],
        totalUnread: 0,
      };

      const roomFragment = cache.writeFragment({
        id: `Room:${data.createRoom.id}`,
        data: room,
        fragment: gql`
          fragment newRoom on Room {
            __typename
            id
            users {
              id
              avatar
              username
            }
            totalUnread
          }
        `,
      });

      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeRooms(prev) {
            return [...prev, roomFragment];
          },
        },
      });

      navigation.navigate("RoomStack", {
        screen: "Room",
        params: { roomId: data.createRoom.id },
      });
    }
  };

  const [createRoomMutation, { loading }] = useMutation<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >(CREATE_ROOM_MUTATION, { variables: { userId }, update: updateMutation });

  const createRoom = () => {
    if (!loading) createRoomMutation();
  };

  return (
    <Button disabled={userId == meData?.seeMe.id} onPress={() => createRoom()}>
      <BtnTxt>{loading ? <Loading /> : children}</BtnTxt>
    </Button>
  );
};

export default MessageBtn;
