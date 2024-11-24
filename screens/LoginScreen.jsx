import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../styles/global";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/auth/slice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";
import { INITIAL_EMAIL, INITIAL_PASSWORD } from "../utils/constants";


const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(INITIAL_EMAIL);
  const [password, setPassword] = useState(INITIAL_PASSWORD);
  const [isSecure, setIsSecure] = useState(true);
  const dispatch = useDispatch();

  const onSubmitHandler = () => {
   signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
     
        const user = userCredential.user;
        Keyboard.dismiss();
        setEmail(INITIAL_EMAIL);
        setPassword(INITIAL_PASSWORD);
        setIsSecure(true);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          alert("Invalid email or password");
        }
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("LoginError", error);
      });
  };
  const showButton = (
    <TouchableOpacity
      onPress={() => setIsSecure((p) => !p)}
      style={styles.showButtonWrapper}
    >
      <Text style={styles.showButton}>Показати</Text>
    </TouchableOpacity>
  );
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "height" : "padding"}
      >
        <Image
          source={require("../assets/images/background.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Увійти</Text>
          <View style={[styles.innerContainer, styles.inputContainer]}>
            <Input
              placeholder="Адреса електронної пошти"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            <Input
              placeholder="Пароль"
              rightButton={showButton}
              outerStyles={styles.passwordButton}
              value={password}
              onChangeText={(password) => setPassword(password)}
              isSecure={isSecure}
            />
          </View>
          <View style={[styles.innerContainer, styles.buttonContainer]}>
          <Button onPress={onSubmitHandler}>
              <Text style={styles.loginButtonText}>Увійти</Text>
            </Button>
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Немає акаунту? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={[styles.signUpText, styles.signUpRef]}>
                  Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  innerContainer: { gap: 16 },
  inputContainer: { marginTop: 32 },
  buttonContainer: { marginTop: 43 },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
    position: "absolute",
    bottom: 0,
    width: SCREEN_WIDTH,
    height: "60%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  showButtonWrapper: {
    position: "absolute",
    top: 0,
    right: 16,
    height: "100%",
    justifyContent: "center",
  },
  showButton: {
    fontSize: 16,
    lineHeight: 19,
    color: colors.blue,
  },
  passwordButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    textAlign: "center",
  },
  signUpContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    color: colors.blue,
  },
  signUpRef: {
    textDecorationLine: "underline",
  },
});
export default LoginScreen;