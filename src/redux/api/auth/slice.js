import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Ensure to import from 'react'
import toast from "react-hot-toast";

import signupPayloadSchema from "./zod/signup.zod";
import loginPayloadSchema from "./zod/login.zod";
import session from "../../../utils/session";
import axios from "axios";

const authApiSlice = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL, 
        prepareHeaders: (headers) => {
            headers.set('authorization', "token");
            return headers;
        }
    }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            queryFn: async (reqBody, _queryApi, _extraOptions, baseQuery) => {
                try {
                    signupPayloadSchema.parse(reqBody);

                    const result = await baseQuery({
                        url: '/signup',
                        method: 'POST',
                        body: reqBody,
                    });

                    if (result.error) {
                        toast.error(`Signup failed: ${result.error.message || 'Request Error'}`);
                        return { error: result.error };
                    }

                    toast.success(`User registered successfully. Redirecting to login`);

                    setTimeout(() => window.location.href = "/login", 3000);
                } catch (error) {
                    toast.error(`Signup failed: ${error.message || 'Request Error'}`);
                    return { error }
                }
            },
        }),
        login: builder.mutation({
            queryFn: async (reqBody, _queryApi, _extraOptions, baseQuery) => {
                try {
                    loginPayloadSchema.parse(reqBody);

                    const result = await baseQuery({
                        url: '/login',
                        method: 'POST',
                        body: reqBody,
                        credentials: "include"
                    });
                    
                    console.log(result.headers);

                    if (result?.error) {
                        toast.error(`Login failed: ${result.error.message || 'Request Error'}`);
                        return { error: result?.error || "Error" };
                    }

                    const sessionToken = result.meta.response.headers.get('session_token');

                    if (!sessionToken) {
                        toast.error(`Login failed: ${result.error.message || 'Request Error'}`);
                        return { error: 'Login Error: Couldn\' find session token' };
                    }

                    session.sessionToken.setter(sessionToken);

                    toast.success(result.data.message);
                    window.location.href = "/";
                } catch (error) {
                    console.log(error)
                    toast.error(`Login failed: 'Request Error'}`);
                    return { error: 'error' }
                }
            }
        })
    }),
});

export default authApiSlice;
export const { useSignupMutation, useLoginMutation } = authApiSlice;
