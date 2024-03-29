import { createSlice } from "@reduxjs/toolkit";


const newOrderSlice = createSlice({
  name: "orders",
  initialState: { orders: null, isError: null, isLoading: false },
  reducers: {
    CREATE_ORDER_REQUEST: (state) => {
      state.isLoading = true;
    },
    CREATE_ORDER_SUCCESS: (state, action) => {
      state.orders = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    CREATE_ORDER_FAIL: (state, action) => {
      (state.isError = action.payload), (state.isLoading = null);
    },
  },
});
export const orderActions = newOrderSlice.actions;

export default newOrderSlice.reducer;
