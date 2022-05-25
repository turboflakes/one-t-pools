import { createSlice } from '@reduxjs/toolkit';

const chains = ['westend', 'kusama', 'polkadot'];

const validateChain = (path) => {
  const chain = path.substring(1, path.length)
  if (chains.includes(chain)) {
    return chain
  }
  // set default
  document.location.pathname = '/westend';
}

const initialState = {
  name: validateChain(document.location.pathname)
};

export const chainSlice = createSlice({
  name: 'chain',
  initialState,
  reducers: {
    changeTo: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const selectChain = (state) => state.chain.name;

export const { changeTo } = chainSlice.actions;

export default chainSlice.reducer;
