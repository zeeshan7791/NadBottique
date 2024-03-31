import { createSlice } from "@reduxjs/toolkit";


const myOrderSlice = createSlice({
  name: "myOrders",
  initialState: { myOrders: [], isError: null, isLoading: false },
  reducers: {
    CREATE_MYORDER_REQUEST: (state) => {
      state.isLoading = true;
    },
    CREATE_MYORDER_SUCCESS: (state, action) => {
      state.myOrders = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    CREATE_MYORDER_FAIL: (state, action) => {
      (state.isError = action.payload), (state.isLoading = false);
    },
  },
});
export const myOrderActions = myOrderSlice.actions;

export default myOrderSlice.reducer;
