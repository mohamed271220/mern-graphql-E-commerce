import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./cartSlice.js";

export const store = configureStore({
  reducer: {
    fav: favSlice,
  },
});

export type RootType = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
