// api slices
import authApiSlice from "./auth/slice";

const apiSlices = {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
};

const apiSliceMiddlewares = [
    authApiSlice.middleware,
]

export default {
    apiSlices,
    apiSliceMiddlewares
};