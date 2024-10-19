import { configureStore } from "@reduxjs/toolkit";

// slices
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    user: userReducer, // Set the user reducer to handle user state
  },
});
