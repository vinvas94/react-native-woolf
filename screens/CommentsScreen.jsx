import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../styles/global";
import image from "../assets/images/noforest.jpg";
import avatar_1 from "../assets/images/avatar.jpg";
import CommentCard from "../components/CommentCard";
import { TextInput } from "react-native-gesture-handler";
import ArrowBackIcon from "../icons/ArrowBackIcon";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectComments } from "../redux/comments/selectors";
import { setComments } from "../redux/comments/slice";


const CommentsScreen = () => {
  const {
    params: { postId },
  } = useRoute();

  
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);

  
  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      if (snapshot.exists) {
        dispatch(setComments(snapshot.data().comments || []));
      }
    });
  }, []);

  
  const onSendMessage = async () => {
    try {
      await updateDoc(doc(db, "posts", postId), {
        comments: arrayUnion({
          id: nanoid(),
          message,
          datetime: new Intl.DateTimeFormat("uk-UA", {
            dateStyle: "full",
            timeStyle: "medium",
            timeZone: "Australia/Sydney",
          }).format(new Date()),
        }),
      });
      setMessage("");
    } catch (error) {
      console.log("onSendMessage", error);
    }
  };


  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />

      <FlatList
        data={comments}
        renderItem={({ item, index }) => (
          <CommentCard item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 24 }}></View>}
        style={{ marginTop: 32, paddingBottom: 16 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <View
          style={{
            paddingTop: 32,
            position: "relative",
          }}
        >
          <TextInput
            placeholder="Коментувати..."
            style={styles.input}
            placeholderTextColor={colors.disabled_dark_gray}
            value={message}
            onChangeText={setMessage}
          />
          
          <TouchableOpacity onPress={onSendMessage}>
            <View style={styles.inputButton}>
              <ArrowBackIcon stroke={colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  input: {
    paddingHorizontal: 16,
    backgroundColor: colors.light_gray,
    borderColor: colors.border_gray,
    borderWidth: 1,
    height: 50,
    borderRadius: 100,
  },
  inputButton: {
    width: 34,
    height: 34,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: colors.orange,
    bottom: 8,
    right: 8,
    alignItems: "center",
    justifyContent: "center",
    transform: "rotate(90deg)",
  },
});
export default CommentsScreen;