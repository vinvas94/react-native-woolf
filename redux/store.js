import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authSlice, { persistedAuthReducer } from "./auth/slice";
import postsSlice from "./posts/slice";
import commentsSlice from "./comments/slice";

const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: persistedAuthReducer,
    [postsSlice.reducerPath]: postsSlice.reducer,
    [commentsSlice.reducerPath]: commentsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);
export default { store, persistor };