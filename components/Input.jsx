import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../styles/global";
import { useState } from "react";
const Input = ({
  placeholder,
  outerStyles,
  rightButton,
  value,
  onChangeText,
  isSecure = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={[
        styles.wrapper,
        { borderColor: isFocused ? colors.orange : colors.border_gray },
        outerStyles,
      ]}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
      />
      {rightButton}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.light_gray,
  },
  input: {
    padding: 16,
    height: 50,
    width: "100%",
  },
});
export default Input;