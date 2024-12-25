import { configureStore } from "@reduxjs/toolkit";
import userReducer, { clearUser, setAuthState } from "./slices/user";

const sessionMiddleware = (store) => (next) => (action) => {
  console.log("Middleware Triggered with Action:", action);

  if (action.type === "user/setUser") {
    console.log("Action payload for setUser:", action.payload);
  }

  const state = store.getState();
  const { session_exp_time } = state.user;

  console.log("session_exp_time in Middleware:", session_exp_time);

  if (session_exp_time) {
    const sessionExpirationTime = new Date(session_exp_time.replace(' ', 'T')).toISOString();
    const currentTime = new Date().toISOString();

    // Round to milliseconds and compare
    const currentTimestamp = new Date(currentTime).getTime();
    const sessionExpirationTimestamp = new Date(sessionExpirationTime).getTime();

    // If the session has expired, clear the user data
    if (currentTimestamp >= sessionExpirationTimestamp) {
      console.log("Session Expired");
      window.localStorage.removeItem('session');
      alert("Session expired. Please log ");     
      window.location.href = '/login';    // Redirect to login
    }
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sessionMiddleware),
});
