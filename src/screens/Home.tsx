import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const Home = () => {
  return <Container></Container>;
};

export default Home;
