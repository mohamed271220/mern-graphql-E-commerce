import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./favSlice.js";
import cartSlice from "./CartSlice.js";
import compareSlice from "./compareSlice.js";

export const store = configureStore({
  reducer: {
    fav: favSlice,
    cart: cartSlice,
    compare: compareSlice,
  },
});

export type RootType = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
