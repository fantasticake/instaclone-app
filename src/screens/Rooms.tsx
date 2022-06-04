import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Avatar from "../components/Avatar";
import Loading from "../components/Loading";
import { SeeRoomsQuery } from "../generated/generated";
import useMe from "../hooks/useMe";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
  padding: 20px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 16px;
`;

const RoomBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const Username = styled.Text`
  margin-left: 10px;
  color: ${(props) => props.theme.colors.textColor};
  font-weight: 600;
`;

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      id
      users {
        id
        username
        avatar
      }
      totalUnread
    }
  }
`;

const Rooms = ({ navigation }) => {
  const meData = useMe();
  const { data, loading } = useQuery<SeeRoomsQuery>(SEE_ROOMS_QUERY);

  return (
    <Container>
      <Title>Messages</Title>
      {loading || !data?.seeRooms || !meData?.seeMe ? (
        <Loading />
      ) : (
        <FlatList
          data={data.seeRooms}
          renderItem={({ item: room }) => {
            const roomUser = room.users.find(
              (user) => user.id != meData.seeMe.id
            );
            return (
              <RoomBtn
                onPress={() => navigation.navigate("Room", { roomId: room.id })}
              >
                <Avatar size={46} avatar={roomUser.avatar} />
                <Username>{roomUser.username}</Username>
              </RoomBtn>
            );
          }}
        />
      )}
    </Container>
  );
};

export default Rooms;
