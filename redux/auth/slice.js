import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.user = payload;
    },
    updateUser: (state, { payload }) => {
      state.user = payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};
export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);
export const { loginUser, updateUser, logoutUser } = authSlice.actions;
export default authSlice;