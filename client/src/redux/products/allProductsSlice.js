import { createSlice } from "@reduxjs/toolkit";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
} from "../constants/productConstants";

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: { allProducts: null, isError: null, isLoading: false },
  reducers: {
    [ALL_PRODUCT_REQUEST]: (state) => {
      state.isLoading = true;
    },
    [ALL_PRODUCT_SUCCESS]: (state, action) => {
      state.allProducts = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    [ALL_PRODUCT_FAIL]: (state, action) => {
      (state.isError = action.payload), (state.isLoading = null);
    },
  },
});
export const allProductsActions = allProductsSlice.actions;

export default allProductsSlice.reducer;
