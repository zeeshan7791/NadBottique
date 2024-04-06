import { createSlice } from "@reduxjs/toolkit";


const productReviewsSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], error: null, loading: false },
  reducers: {
    ADMIN_PRODUCTALLREVIEWS_REQUEST: (state) => {
      state.loading = true;
    },
    ADMIN_PRODUCTALLREVIEWS_SUCCESS: (state, action) => {
      state.reviews = action.payload;
      state.error = null;
      state.loading = false;
    },
    ADMIN_DELETEREVIEW_SUCCESS: (state, action) => {
      state.reviews = state.reviews.filter((review) => review._id !== action.payload);
      state.error = null;
      state.loading = false;
    },
    ADMIN_PRODUCTALLREVIEWS_FAIL: (state, action) => {
      (state.error = action.payload), (state.loading = null);
    },
  },
});
export const productAllReviewsAction = productReviewsSlice.actions;

export default productReviewsSlice.reducer;
