import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



import AsyncStorage from "@react-native-async-storage/async-storage";
const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "react-native-woolf.firebaseapp.com",
  projectId: "react-native-woolf",
};
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);