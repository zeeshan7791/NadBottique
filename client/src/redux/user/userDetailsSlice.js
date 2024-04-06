import { createSlice } from "@reduxjs/toolkit";
 const userDetailsSlice = createSlice({
    name: "user",
    initialState: { user: {}, isError: null, isLoading: false },
    reducers: {
      ADMIN_USERDETAILS_REQUEST: (state) => {
        state.isLoading = true;
      },
      ADMIN_USERDETAILS_SUCCESS: (state, action) => {
        state.user = action.payload;
        state.isError = null;
        state.isLoading = false;
      },
    
      ADMIN_USERDETAILS_FAIL: (state, action) => {
        (state.isError = action.payload), (state.isLoading =false);
      },
      
    },
  });
  export const userDetailsActions = userDetailsSlice.actions;
  
  export default userDetailsSlice.reducer;