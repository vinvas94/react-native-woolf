import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../styles/global";
import LocationIcon from "../icons/LocationIcon";
import Button from "../components/Button";
import CameraIcon from "../icons/CameraIcon";
import TrashIcon from "../icons/TrashIcon";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraZone from "../components/CameraZone";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config";



const CreatePostScreen = () => {
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("Post name");
  const [place, setPlace] = useState("Kyiv");

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const onPublishHandler = async () => {
    try {
      const docRef = await addDoc(
        collection(db, "posts"),
        {
          preview,
          name,
          place,
          location: JSON.stringify(location),
        },
        { merge: true }
      );
    } catch (e) {
    }

    navigation.navigate("Posts");
  };
  const isAllowed = !!preview && !!name && !!place && !!location;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
      <CameraZone preview={preview} setPreview={setPreview} />
        <Text style={[styles.text]}>Завантажте фото</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "height" : "padding"}
        >
          <View style={[styles.input, { marginTop: 32 }]}>
            <TextInput
              placeholder="Назва..."
              placeholderTextColor={colors.disabled_dark_gray}
              value={name}
              onChangeText={(name) => setName(name)}
            />
          </View>
          <View style={[styles.input, { marginTop: 16 }]}>
            <Text>
              <LocationIcon />
            </Text>
            <TextInput
              placeholder="Місцевість..."
              placeholderTextColor={colors.disabled_dark_gray}
              value={place}
              onChangeText={(place) => setPlace(place)}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={{ marginTop: 32 }}>
        <Button disabled={!isAllowed} onPress={onPublishHandler}>
            <Text
              style={[
                styles.buttonText,
                styles.text,
                { color: isAllowed ? colors.white : colors.disabled_dark_gray },
              ]}
            >
              Опубліковати
            </Text>
          </Button>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.disabled_gray,
            width: 70,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            marginTop: "auto",
            alignSelf: "center",
          }}
        >
          <TrashIcon />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  input: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderBottomWidth: 1,
    borderColor: colors.border_gray,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
  },
  text: { },
  image: {
    marginBottom: 8,
    height: 240,
    backgroundColor: colors.disabled_gray,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border_gray,
  },
  imageInner: {
    width: 60,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CreatePostScreen;