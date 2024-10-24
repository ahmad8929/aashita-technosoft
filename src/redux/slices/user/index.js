// redux/slices/index.js

import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  userId: null,
  sessionToken: null,
  session_exp_time: null,
  isLoggedIn: false,
};

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.user_id;
      state.sessionToken = action.payload.session_token;
      state.session_exp_time = action.payload.session_exp_time;
    },
    setAuthState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    clearUser: (state) => {
      state.userId = null;
      state.isLoggedIn = null;
      state.sessionToken = null;
      state.session_exp_time = null;
    },
  },
});

// Export actions and reducer from user slice
export const { setUser, setAuthState, clearUser } = userSlice.actions;
export default userSlice.reducer;
