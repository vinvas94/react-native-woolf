import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "../screens/PostsScreen";
import LogoutIcon from "../icons/LogoutIcon";
import MenuIcon from "../icons/MenuIcon";
import ProfileScreen from "../screens/ProfileScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import PersonIcon from "../icons/PersonIcon";
import { StyleSheet, View } from "react-native";
import AddButton from "../components/AddButton";
import BackButton from "../components/BackButton";
import LogoutButton from "../components/LogoutButton";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        headerStyle: { borderBottomWidth: 1, borderBottomColor: "#B3B3B3" },
        headerTitleAlign: "center",
        headerTitleStyle: styles.headerTitleStyle,

        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <LogoutButton />
            </View>
          ),
          tabBarIcon: ({ focused, color, size }) => <MenuIcon />,
        }}
      />

      <Tab.Screen
        name="CreatePosts"
        component={CreatePostScreen}
        options={{
          title: "Створити публікацію",
          headerLeft: () => <BackButton />,
          tabBarIcon: ({ focused, color, size }) => <AddButton />,
          tabBarStyle: { display: "none" },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Профіль",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => <PersonIcon />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: 17,
    lineHeight: 22,
    paddingVertical: 11,
  },

  tabBarStyle: {
    height: 83,
    borderTopWidth: 1,
    borderTopColor: "#B3B3B3",
    justifyContent: "center",
    paddingHorizontal: 60,
  },
});

export default BottomTabNavigator;