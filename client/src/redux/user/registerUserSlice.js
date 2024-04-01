import { createSlice } from "@reduxjs/toolkit";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../constants/userConstants";
const initialState = {
  currentUser: null,
  isAuthenticated: false,
  token: null,
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
      state.token = null;
    },
    [signInSuccess]: (state, action) => {
      state.currentUser = action.payload.rest;
      state.isAuthenticated = true;
      (state.token = action.payload.token), (state.error = null);
      state.loading = false;
    },
    [signInFailure]: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    updateUserSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
      state.isAuthenticated = true;
    },
    updateUserFailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
      state.isAuthenticated = false;
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
      state.isAuthenticated = false;
    },
    signoutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.isAuthenticated = false;
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
