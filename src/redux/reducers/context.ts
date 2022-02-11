import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { setInitialConfigs } from 'utils/helpers';

interface InitialState {
  config: any,
  defaultConfig: any,
}

const initialState: InitialState = {
  config: null,
  defaultConfig: {
    containerWidth: '600px',
    containerHeight: '600px',
  }
};

export const contextSlice = createSlice({
  name: 'Context',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<any>) => {
      state.config = {
        ...action.payload,
        ...state.defaultConfig
      };
    },
    setDefaultConfig: (state, action: PayloadAction<any>) => {
      state.config = {
        ...action.payload,
        ...state.defaultConfig
      };
    },
  },
});

export const contextActions = { ...contextSlice.actions };

export default contextSlice.reducer;
