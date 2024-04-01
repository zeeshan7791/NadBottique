import { createSlice } from "@reduxjs/toolkit";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: { productDetails: null, isError: null, isLoading: false },
  reducers: {
    [PRODUCT_DETAILS_REQUEST]: (state) => {
      state.isLoading = true;
    },
    [PRODUCT_DETAILS_SUCCESS]: (state, action) => {
      state.productDetails = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    [PRODUCT_DETAILS_FAIL]: (state, action) => {
      (state.isError = action.payload), (state.isLoading = false);
    },
  },
});
export const productDetailsAction = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
