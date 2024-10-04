

// redux/index.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/index"; // Import user slice reducer

export const store = configureStore({
  reducer: {
    user: userReducer, // Set the user reducer to handle user state
  },
});
