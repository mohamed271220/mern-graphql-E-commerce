import { createSlice } from "@reduxjs/toolkit";
import { cartInitialState } from "../interfaces/user";

const initialState: cartInitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart-slice",
  initialState,
  reducers: {
    addToCartRedux(state, action) {
      console.log("redux");
      console.log(action.payload);
      if (Array.isArray(action.payload)) {
        state.cart = [...action.payload, ...state.cart];
      } else {
        state.cart = [action.payload, ...state.cart];
      }
    },

    removeFromCartRedux(state, action) {
      const arr = action.payload;
      for (const el of arr) {
        state.cart = state.cart.filter((obj) => obj.productId !== el);
      }
    },

    changeCartCountRedux(state, action) {
      console.log({ action: action.payload });
      state.cart = state.cart.map((obj) =>
        action.payload.productId === obj.productId
          ? { ...obj, count: action.payload.count }
          : obj
      );
    },
  },
});

export const { addToCartRedux, removeFromCartRedux, changeCartCountRedux } =
  cartSlice.actions;
export default cartSlice.reducer;
