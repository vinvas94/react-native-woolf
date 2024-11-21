import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, { payload }) => {
      state.items = payload;
    },
  },
});
export const { setComments } = commentsSlice.actions;
export default commentsSlice;