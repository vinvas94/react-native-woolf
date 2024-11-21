import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";
const initialState = {
  items: [],
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.items = payload;
    },
  },
});
export const { setPosts } = postsSlice.actions;
export default postsSlice;