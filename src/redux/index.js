import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// slices
import userReducer from "./slices/user";

// api slices
import rtkQuery from "./api";

export const store = configureStore({
  reducer: {
    user: userReducer, // Set the user reducer to handle user state
    ...rtkQuery.apiSlices,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQuery.apiSliceMiddlewares)
});

setupListeners(store.dispatch)
