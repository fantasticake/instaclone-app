import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import styled, { useTheme } from "styled-components/native";

const Image = styled.Image``;

const Avatar = ({ avatar, size }) => {
  const theme = useTheme();
  return avatar ? (
    <Image
      style={{ height: size, width: size, borderRadius: size / 2 }}
      source={{ uri: avatar }}
    />
  ) : (
    <FontAwesomeIcon
      size={size}
      color={theme.colors.textColor}
      icon={faUserCircle}
    />
  );
};

export default Avatar;
