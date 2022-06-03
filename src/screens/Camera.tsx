import { useIsFocused } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const BlackArea = styled.View`
  height: 320px;
  background-color: black;
`;

const ErrorTxt = styled.Text`
  color: ${(props) => props.theme.colors.textColor};
`;

const BtnBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.textColor};
  width: 90px;
  height: 90px;
  border-radius: 45px;
`;

const CameraScreen = ({ navigation }) => {
  const [granted, setGranted] = useState(false);
  const cameraRef = useRef<Camera>();
  const isFocused = useIsFocused();

  const takePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      navigation.navigate("Gallery");
    }
  };

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then((r) => setGranted(r.granted));
  }, []);

  useEffect(() => {
    if (isFocused) {
      navigation.getParent().setOptions({ headerRight: null });
    }
  }, [isFocused]);

  if (!granted)
    return (
      <Container>
        <ErrorTxt>No permission.</ErrorTxt>
      </Container>
    );
  return (
    <Container>
      {isFocused ? (
        <Camera
          ref={cameraRef}
          style={{ height: 320 }}
          type={CameraType.back}
        ></Camera>
      ) : (
        <BlackArea />
      )}
      <BtnBox>
        <TakePhotoBtn onPress={() => takePhoto()} />
      </BtnBox>
    </Container>
  );
};

export default CameraScreen;
