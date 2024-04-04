import { createSlice } from "@reduxjs/toolkit";


const adminOrdersSlice = createSlice({
  name: "orders",
  initialState: { orders: null, isError: null, isLoading: false ,totalAmount:null},
  reducers: {
    ADMIN_ORDER_REQUEST: (state) => {
      state.isLoading = true;
    },
    ADMIN_ORDER_SUCCESS: (state, action) => {
      state.orders = action.payload.orders;
      state.totalAmount = action.payload.totalAmount;

      state.isError = null;
      state.isLoading = false;
    },
    DELETE_ORDER_SUCCESS: (state,action) => {
      state.orders = state.orders.filter((order) => order._id !== action.payload);
      state.isError = null;
      state.isLoading = false;
    },
    ADMIN_ORDER_FAIL: (state, action) => {
      (state.isError = action.payload), (state.isLoading = false);
    },
  },
});
export const adminOrdersActions = adminOrdersSlice.actions;

export default adminOrdersSlice.reducer;
