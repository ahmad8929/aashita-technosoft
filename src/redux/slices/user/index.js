import { createSlice } from "@reduxjs/toolkit";
const isValidDate = (date) => !isNaN(new Date(date).getTime());

const initialState = {
    session_token: localStorage.getItem("session_token") || null,
    session_exp_time: isValidDate(localStorage.getItem("session_exp_time")) 
                      ? localStorage.getItem("session_exp_time") 
                      : null,
    user_id: localStorage.getItem("user_id") || null,
    name: localStorage.getItem("name") || null,
    licenseType: localStorage.getItem("licenseType") || null,
    isLoggedIn: !!localStorage.getItem("session_token"),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.session_token = action.payload.session_token;
            state.session_exp_time = new Date(action.payload.session_exp_time).toISOString();
            state.user_id = action.payload.user_id;
            state.name = action.payload.name;
            state.licenseType = action.payload.licenseType;

            localStorage.setItem("session_token", action.payload.session_token);
            localStorage.setItem("session_exp_time", state.session_exp_time);  // Store as ISO string
            localStorage.setItem("user_id", action.payload.user_id);
            localStorage.setItem("name", action.payload.name);
            localStorage.setItem("licenseType", action.payload.licenseType);
        },
        setAuthState: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        clearUser: (state) => {
            state.session_token = null;
            state.session_exp_time = null;
            state.user_id = null;
            state.name = null;
            state.licenseType = null;
            state.isLoggedIn = false;
            localStorage.removeItem("session_token");
            localStorage.removeItem("session_exp_time");
            localStorage.removeItem("user_id");
            localStorage.removeItem("name");
            localStorage.removeItem("licenseType");
        }
    }
});

export const { setUser, setAuthState, clearUser } = userSlice.actions;
export default userSlice.reducer;
