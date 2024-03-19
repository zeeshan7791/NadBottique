import { createSlice } from "@reduxjs/toolkit";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../constants/userConstants";
const initialState = {
  currentUser: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    [signInStart]: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [signInSuccess]: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    [signInFailure]: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    updateUserFailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signoutUserStart: (state) => {
      state.loading = true;
    },
    signoutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signoutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
