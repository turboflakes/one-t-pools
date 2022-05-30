import { createSlice } from '@reduxjs/toolkit';

const chains = ['westend', 'kusama', 'polkadot'];

const validateChain = () => {
  //example: hash= "#/polkadot"
  const chain = document.location.hash.substring(2, document.location.hash.length)
  if (document.location.pathname === '/' && chains.includes(chain)) {
    return chain
  }
  // set default
  document.location.hash = '#/kusama';
  document.location.pathname = '/';
  return 'kusama'
}

const initialState = {
  name: validateChain()
};

export const chainSlice = createSlice({
  name: 'chain',
  initialState,
  reducers: {
    changeTo: (state, action) => {
      state.name = action.payload;
    },
    setChainInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const selectChain = (state) => state.chain.name;
export const selectChainInfo = (state) => state.chain.info;

export const { changeTo, setChainInfo } = chainSlice.actions;

export default chainSlice.reducer;
