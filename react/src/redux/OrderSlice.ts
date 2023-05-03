import { createSlice } from "@reduxjs/toolkit";

const initialState: { order: string[] } = {
  order: [],
};

const orderSlice = createSlice({
  name: "order-slice",
  initialState,
  reducers: {
    addToOrderRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.order = [...action.payload, ...state.order];
      } else {
        state.order = [action.payload, ...state.order];
      }
    },

    removeFromOrderRedux(state, action) {
      const arr = action.payload;
      for (const el of arr) {
        state.order = state.order.filter((st: any) => st._id !== el);
      }
    },

    updateOrderRedux(state, action) {
      state.order = state.order.map((order: any) =>
        action.payload.id === order._id
          ? {
              ...order,
              state: action.payload.state,
              deliveredAt: action.payload.deliveredAt,
            }
          : order
      );
    },
  },
});

export const { addToOrderRedux, removeFromOrderRedux, updateOrderRedux } =
  orderSlice.actions;
export default orderSlice.reducer;
