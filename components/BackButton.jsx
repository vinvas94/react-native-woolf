import { useNavigation } from "@react-navigation/native";
import ArrowBackIcon from "../icons/ArrowBackIcon";
const BackButton = () => {
  const navigation = useNavigation();
  return (
    <ArrowBackIcon
      style={{ marginLeft: 16 }}
      onPress={() => navigation.goBack()}
    />
  );
};
export default BackButton;