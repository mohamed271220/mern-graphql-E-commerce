import { createSlice } from "@reduxjs/toolkit";
import { favInitialState } from "../components/interfaces/user.js";

const initialState: favInitialState = {
  fav: [],
};

const favSlice = createSlice({
  name: "cart-slice",
  initialState,
  reducers: {
    addToFavRedux(state, action) {
      console.log("redux");
      console.log(action.payload);
      if (Array.isArray(action.payload)) {
        state.fav = [...state.fav, ...action.payload];
      } else {
        state.fav = [...state.fav, action.payload];
      }
    },

    removeFromFavRedux(state, action) {
      state.fav = state.fav.filter((obj) => {
        obj.productId !== action.payload;
      });
    },
  },
});

export const { addToFavRedux, removeFromFavRedux } = favSlice.actions;
export default favSlice.reducer;
