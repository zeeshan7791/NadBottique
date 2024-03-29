import { createSlice } from "@reduxjs/toolkit";


const myOrderSlice = createSlice({
  name: "myOrders",
  initialState: { myOrders: null, isError: null, isLoading: false },
  reducers: {
    CREATE_ORDER_REQUEST: (state) => {
      state.isLoading = true;
    },
    CREATE_ORDER_SUCCESS: (state, action) => {
      state.myOrders = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    CREATE_ORDER_FAIL: (state, action) => {
      (state.isError = action.payload), (state.isLoading = null);
    },
  },
});
export const myOrderActions = myOrderSlice.actions;

export default myOrderSlice.reducer;
