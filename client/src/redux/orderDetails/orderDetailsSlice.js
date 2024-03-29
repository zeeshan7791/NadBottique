import { createSlice } from "@reduxjs/toolkit";


const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: { orderDetails: null, isError: null, isLoading: false },
  reducers: {
    CREATE_ORDER_REQUEST: (state) => {
      state.isLoading = true;
    },
    CREATE_ORDER_SUCCESS: (state, action) => {
      state.orderDetails = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    CREATE_ORDER_FAIL: (state, action) => {
      (state.isError = action.payload), (state.isLoading = null);
    },
  },
});
export const orderDetailsActions = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
