import { ActivityIndicator } from "react-native";
import styled, { useTheme } from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const Loading = () => {
  const theme = useTheme();
  return (
    <Container>
      <ActivityIndicator color={theme.colors.textColor} />
    </Container>
  );
};

export default Loading;
