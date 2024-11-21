import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/global";
import avatar_1 from "../assets/images/avatar.jpg";
const CommentCard = ({ item: { avatar, message, datetime }, index }) => {
  const isEven = (index + 1) % 2 === 0;
  return (
    <View style={{ flexDirection: isEven ? "row-reverse" : "row", gap: 16 }}>
       <Image source={avatar || avatar_1} style={styles.image} />
      <View
        style={[
          styles.messageContainer,
          {
            borderTopLeftRadius: isEven ? 6 : 0,
            borderTopRightRadius: isEven ? 0 : 6,
          },
        ]}
      >
        <Text style={{ fontSize: 13, color: colors.black_primary }}>
          {message}
        </Text>
        <Text
          style={[
            styles.datetime,
            { alignSelf: isEven ? "flex-start" : "flex-end" },
          ]}
        >
          {datetime}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 6,
  },
  datetime: {
    fontSize: 10,
    color: colors.disabled_dark_gray,
    marginTop: 8,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
});
export default CommentCard;