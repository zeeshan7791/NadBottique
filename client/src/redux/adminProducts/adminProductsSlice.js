import { createSlice } from "@reduxjs/toolkit";


const adminProductsSlice = createSlice({
  name: "products",
  initialState: { products: null, isError: null, isLoading: false },
  reducers: {
    ADMIN_PRODUCT_REQUEST: (state) => {
      state.isLoading = true;
    },
    ADMIN_PRODUCT_SUCCESS: (state, action) => {
      state.products = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    ADMIN_PRODUCT_FAIL: (state, action) => {
      (state.isError = action.payload), (state.isLoading = false);
    },
  },
});
export const adminProductsActions = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
