// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   updateProfile,
//   User,
//   signOut,
// } from "firebase/auth";
// import { auth } from "../../config";
// import { setUserInfo, clearUserInfo } from "../redux/reducers/userSlice";
// // import { addUser, getUser, updateUserInFirestore } from "./firestore";
// // Функція для реєстрації користувача
// export const registerDB = async ({ email, password }) => {
//   try {
//     const credentials = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = credentials.user;
//     await addUser(user.uid, {
//       uid: user.uid,
//       email: user.email || "",
//       displayName: user.displayName || "",
//     });
//   } catch (error) {
//     console.log("SIGNUP ERROR:", error);
//   }
// };
// // Функція для логіну користувача та збереження його в Redux
// export const loginDB = async ({ email, password }, dispatch) => {
//   try {
//     const credentials = await signInWithEmailAndPassword(auth, email, password);
//     const user = credentials.user;
//     dispatch(
//       setUserInfo({
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName,
//       })
//     );
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };
// // Функція для логауту
// export const logoutDB = async (dispatch) => {
//   try {
//     await signOut(auth);
//     // Очистити інформацію про користувача у Redux
//     dispatch(clearUserInfo());
//   } catch (error) {
//     console.error("Logout error:", error);
//   }
// };
// // Відстеження змін у стані аутентифікації
// export const authStateChanged = (dispatch) => {
//   onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       const userData = await getUser(user.uid);
//       dispatch(
//         setUserInfo({
//           ...userData,
//           uid: user.uid,
//           email: user.email || "",
//         })
//       );
//     } else {
//       dispatch(clearUserInfo());
//     }
//   });
// };
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../config";
// import { auth } from "./config";
// export const registerDB = async ({ email, password }) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//   } catch (error) {
//     throw error;
//   }
// };
// або більш короткий запис цієї функції
// export const registerDB = async ({ email, password }) =>
//   await createUserWithEmailAndPassword(auth, email, password);
// const authStateChanged = async (onChange = () => {}) => {
//   onAuthStateChanged((user) => {
//     onChange(user);
//   });
// };
// export const loginDB = async ({ email, password }) => {
//   try {
//     const credentials = await signInWithEmailAndPassword(auth, email, password);
//     return credentials.user;
//   } catch (error) {
//     throw error;
//   }
// };
// export const updateUserProfile = async (update) => {
//   const user = auth.currentUser;
//   // якщо такий користувач знайдений
//   if (user) {
//     // оновлюємо його профайл
//     try {
//       await updateProfile(user, update);
//     } catch (error) {
//       throw error;
//     }
//   }
// };
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// const auth = getAuth();
// export const registerUser = async ({ email, password }) => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       // ...
//       console.log(user);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// };