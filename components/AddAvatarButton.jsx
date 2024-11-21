import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/global";
import avatarImage from "../assets/images/avatar.jpg";
import PlusIcon from "../icons/PlusIcon";
const AddAvatarButton = ({ isEmpty = true }) => {
  return (
    <View style={styles.avatarWrapper}>
      {!isEmpty && <Image source={avatarImage} style={{ borderRadius: 16 }} />}
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            borderColor: isEmpty ? colors.orange : colors.disabled_dark_gray,
            transform: isEmpty
              ? [{ translateX: 12.5 }]
              : [{ rotate: "45deg" }, { translateX: 16 }],
            bottom: isEmpty ? 14 : 25,
          },
        ]}
      >
        <PlusIcon fill={isEmpty ? colors.orange : colors.disabled_dark_gray} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  avatarWrapper: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: 0 }],
    width: 120,
    height: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 14,
    right: 0,
    transform: [{ translateX: 12.5 }],
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: colors.white,
    borderWidth: 1,
  },
});
export default AddAvatarButton;