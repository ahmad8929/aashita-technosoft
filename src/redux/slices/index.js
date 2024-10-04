// redux/slices/index.js

import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  user: null,
  isLoggedIn: false,
};

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;  // Set login state to true when user data is set
    },
    setAuthState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;  // Clear user and set login state to false
    },
  },
});

// Export actions and reducer from user slice
export const { setUser, setAuthState, clearUser } = userSlice.actions;
export default userSlice.reducer;
