import { useEffect, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import styled, { useTheme } from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight, faL } from "@fortawesome/free-solid-svg-icons";
import {
  ApolloCache,
  DefaultContext,
  gql,
  MutationUpdaterFunction,
  useMutation,
} from "@apollo/client";
import {
  EditProfileMutation,
  EditProfileMutationVariables,
} from "../generated/generated";
import useMe from "../hooks/useMe";
import { useIsFocused } from "@react-navigation/native";
import { createRNFile } from "../utils";

const HeaderRightBtn = styled.TouchableOpacity`
  margin-right: 16px;
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundColor};
`;

const SelectedBox = styled.View`
  width: 100%;
  height: 320px;
`;

const SelectedImg = styled.Image`
  width: 100%;
  height: 100%;
`;

const ImageBtn = styled.TouchableOpacity``;

const Image = styled.Image``;

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($email: String, $avatar: Upload) {
    editProfile(email: $email, avatar: $avatar) {
      ok
      error
    }
  }
`;

const Gallery = ({ navigation, route: { params } }) => {
  const meData = useMe();
  const theme = useTheme();
  const [mode, setMode] = useState("post");
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const windowWidth = Dimensions.get("window").width;
  const isFocused = useIsFocused();

  const updateMutation: MutationUpdaterFunction<
    EditProfileMutation,
    EditProfileMutationVariables,
    DefaultContext,
    ApolloCache<any>
  > = (cache, { data }) => {
    if (data?.editProfile.ok && meData?.seeMe) {
      cache.modify({
        id: `User:${meData.seeMe.id}`,
        fields: {
          avatar(prev) {
            return photos[selectedImg].img;
          },
        },
      });
      navigation.navigate("EditProfile");
    }
  };

  const [editProfileMutation, { loading: loadingMutation }] = useMutation<
    EditProfileMutation,
    EditProfileMutationVariables
  >(EDIT_PROFILE_MUTATION, {
    update: updateMutation,
  });

  const onHeaderRight = () => {
    if (photos && photos[selectedImg]) {
      const uri = photos[selectedImg].uri;
      if (mode == "post") {
        navigation.navigate("CreatePost", { uri });
      } else if (mode == "avatar" && !loadingMutation) {
        const file = createRNFile(uri);
        editProfileMutation({
          variables: { avatar: file },
        });
      }
    }
  };

  const headerRight = () => (
    <HeaderRightBtn onPress={onHeaderRight}>
      {loadingMutation ? (
        <Loading />
      ) : (
        <FontAwesomeIcon
          size={20}
          color={theme.colors.blue}
          icon={faArrowRight}
        />
      )}
    </HeaderRightBtn>
  );

  useEffect(() => {
    navigation.getParent().setOptions({ headerRight });
  }, [headerRight]);

  useEffect(() => {
    if (isFocused && status) {
      if (status.granted) {
        MediaLibrary.getAssetsAsync({
          sortBy: [["modificationTime", false]],
        }).then((r) => {
          setPhotos(r.assets);
          setLoading(false);
        });
      } else if (status.canAskAgain) {
        requestPermission();
      }
    }
  }, [isFocused, status, requestPermission]);

  useEffect(() => {
    if (params?.mode) {
      setMode(params.mode);
    }
  }, [params]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <SelectedBox>
        {photos?.length > 0 ? (
          <SelectedImg source={{ uri: photos[selectedImg].uri }} />
        ) : null}
      </SelectedBox>
      <FlatList
        data={photos}
        numColumns={4}
        renderItem={({ item: photo, index }) => (
          <ImageBtn onPress={() => setSelectedImg(index)}>
            <Image
              style={{ width: windowWidth / 4, height: windowWidth / 4 }}
              source={{ uri: photo.uri }}
            />
          </ImageBtn>
        )}
      />
    </Container>
  );
};

export default Gallery;
