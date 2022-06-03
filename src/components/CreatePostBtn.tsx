import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import styled, { useTheme } from "styled-components/native";

const Button = styled.TouchableOpacity``;

const CreatePostBtn = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  return (
    <Button
      onPress={() =>
        navigation.navigate("UploadStack", {
          screen: "CameraNav",
          params: { screen: "Gallery", params: { mode: "post" } },
        })
      }
    >
      <FontAwesomeIcon
        size={30}
        color={theme.colors.textColor}
        icon={faPlusSquare}
      />
    </Button>
  );
};

export default CreatePostBtn;
