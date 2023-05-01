import { compareInterface } from "./../context/isAuth";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { compare: compareInterface[] } = {
  compare: [],
};

const compareSlice = createSlice({
  name: "compare-slice",
  initialState,
  reducers: {
    addToCompareRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.compare = [...action.payload, ...state.compare];
      } else {
        state.compare = [action.payload, ...state.compare];
      }
    },

    removeFromCompareRedux(state, action) {
      state.compare = state.compare.filter(
        (obj) => obj.productId !== action.payload
      );
    },
  },
});

export const { addToCompareRedux, removeFromCompareRedux } =
  compareSlice.actions;
export default compareSlice.reducer;
