import { StyleSheet, View } from 'react-native';
import PlusIcon from '../icons/PlusIcon'; 
import { colors } from '../styles/global';

const AddButton = () => {
  return (
    <View style={styles.container}>
      <PlusIcon fill="#FFFFFF" />
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingVertical: 13,
    backgroundColor: colors.orange,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center', 
  },
});
