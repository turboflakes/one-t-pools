import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice'
import chainReducer from '../features/chain/chainSlice';
import web3Reducer from '../features/web3/web3Slice';

export const store = configureStore({
  reducer: {
    chain: chainReducer,
    web3: web3Reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
