import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  Config,
  Mode
} from 'types/globals';

interface InitialState {
  config: null|Partial<Config>, // will contain all
  defaultConfig: null|Partial<Config>, // will contain all
}

const initialState: InitialState = {
  config: null,
  defaultConfig: null
};

export const contextSlice = createSlice({
  name: 'Context',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<Partial<Config>>) => {
      state.config = {
        ...state.defaultConfig && state.defaultConfig,
        ...state.config && state.config,
        ...action.payload,
      };
    },
    setDefaultConfig: (state, action: PayloadAction<Partial<Config>>) => {
      state.defaultConfig = {
        ...state.defaultConfig && state.defaultConfig,
        ...action.payload,
      };
    },
  },
});

export const contextActions = { ...contextSlice.actions };

export default contextSlice.reducer;
