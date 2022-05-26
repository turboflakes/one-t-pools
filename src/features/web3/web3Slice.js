import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  account: undefined
};

export const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    changeTo: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const selectAccount = (state) => state.web3.account;

export const { changeTo } = web3Slice.actions;

export default web3Slice.reducer;
