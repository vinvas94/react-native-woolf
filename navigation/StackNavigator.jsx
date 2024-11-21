import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import CommentsScreen from "../screens/CommentsScreen";
import BackButton from "../components/BackButton";
import { StyleSheet } from "react-native";
import MapScreen from "../screens/MapScreen";
import useAuth from "../hooks/useAuth";


const MainStack = createStackNavigator();
const StackNavigator = () => {
  const { isLoggedIn } = useAuth();
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={isLoggedIn ? "Home" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        {isLoggedIn ? (
          <>
            <MainStack.Screen name="Home" component={BottomTabNavigator} />
            <MainStack.Screen
              name="Comments"
              component={CommentsScreen}
              options={{
                headerShown: true,
                title: "Коментарі",
                headerLeft: () => <BackButton />,
                headerStyle: {
                  borderBottomWidth: 1,
                  borderBottomColor: "#B3B3B3",
                },
                headerTitleAlign: "center",
                headerTitleStyle: styles.headerTitleStyle,
              }}
            />
              <MainStack.Screen
              name="Map"
              component={MapScreen}
              options={{
                headerShown: true,
                title: "Локація",
                headerLeft: () => <BackButton />,
                headerStyle: {
                  borderBottomWidth: 1,
                  borderBottomColor: "#B3B3B3",
                },
                headerTitleAlign: "center",
                headerTitleStyle: styles.headerTitleStyle,
              }}
            />
          </>
        ) : (
          <>
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
            />
            <MainStack.Screen name="Login" component={LoginScreen} />
          </>
        )}
       
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: 17,
    lineHeight: 22,
    paddingVertical: 11,
  },
});
export default StackNavigator;