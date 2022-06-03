import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import styled, { useTheme } from "styled-components/native";

const Button = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
`;

const CheckBtn = (props) => {
  const theme = useTheme();

  return (
    <Button {...props}>
      <FontAwesomeIcon size={24} color={theme.colors.blue} icon={faCheck} />
    </Button>
  );
};

export default CheckBtn;
