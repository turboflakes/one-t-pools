import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice'
import chainReducer from '../features/chain/chainSlice';

export const store = configureStore({
  reducer: {
    chain: chainReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
