import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CameraIcon from "../icons/CameraIcon";
import * as MediaLibrary from "expo-media-library";
import { colors } from "../styles/global";
import { useEffect, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
const CameraZone = ({ preview, setPreview }) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const [cameraRef, setCameraRef] = useState(null);
  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
    if (!mediaPermission || !mediaPermission.granted) {
      requestMediaPermission();
    }
  }, [permission, mediaPermission]);
  if (!permission || !mediaPermission) {
    return <View />;
  }
  const takePicture = async () => {
    if (preview) {
      setPreview(null);
    }
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(uri);
      setPreview(uri);
    }
  };
  return (
    <TouchableOpacity style={styles.image} onPress={takePicture}>
      {preview ? (
        <View style={styles.preview}>
          <View style={[styles.imageInner, styles.previewIconWrapper]}>
            <CameraIcon fill="white" />
          </View>
          <Image
            source={{ uri: preview }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={setCameraRef}>
          <View style={styles.imageInner}>
            <CameraIcon fill="white" />
          </View>
        </CameraView>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    marginBottom: 8,
    height: 240,
    backgroundColor: colors.disabled_gray,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    overflow: "hidden",
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  imageInner: {
    width: 60,
    height: 60,
    // backgroundColor: colors.white,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  previewIconWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 2,
  },
});
export default CameraZone;