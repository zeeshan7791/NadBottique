import { createSlice } from "@reduxjs/toolkit";
 const adminAllUserSlice = createSlice({
    name: "allUsers",
    initialState: { allUsers: null, isError: null, isLoading: false },
    reducers: {
      ADMIN_ALLUSERS_REQUEST: (state) => {
        state.isLoading = true;
      },
      ADMIN_ALLUSERS_SUCCESS: (state, action) => {
        state.allUsers = action.payload;
        state.isError = null;
        state.isLoading = false;
      },
      ADMIN_DELETEUSER_SUCCESS: (state,action) => {
        state.allUsers = state.allUsers.filter((user) => user._id !== action.payload);
        state.isError = null;
        state.isLoading = false;
      },
      ADMIN_ALLUSERS_FAIL: (state, action) => {
        (state.isError = action.payload), (state.isLoading = null);
      },
      
    },
  });
  export const allUsersActions = adminAllUserSlice.actions;
  
  export default adminAllUserSlice.reducer;