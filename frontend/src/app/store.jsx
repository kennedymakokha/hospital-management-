import { configureStore } from '@reduxjs/toolkit'
import authReducer from './../features/slices/authSlice.jsx'
import { apiSlice } from '../features/slices/apiSlice.js'
import logger from 'redux-logger'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(apiSlice.middleware),
    devTools: true
})
