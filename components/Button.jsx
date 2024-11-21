import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../styles/global";


const Button = ({ children, onPress, buttonStyle,disabled=false }) => {
  return (
    <TouchableOpacity
    disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.disabled_gray : colors.orange },
        buttonStyle,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 100,
  },
});
export default Button;
