import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./favSlice.js";
import cartSlice from "./CartSlice.js";

export const store = configureStore({
  reducer: {
    fav: favSlice,
    cart: cartSlice,
  },
});

export type RootType = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
