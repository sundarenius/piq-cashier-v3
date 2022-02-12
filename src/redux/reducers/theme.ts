import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { isUserMobile } from 'utils/helpers';
import { merge } from 'lodash';

interface InitialTheme {
  theme: any
}

const initialTheme: InitialTheme = {
  theme: {
    input: {
      color: '#5b5b5b',
      fontSize: isUserMobile() ? '16px' : '14px',
      height: '52px',
      borderRadius: '2px',
    },
    inputbackground: {
      color: '#ffffff',
    },
    labels: {
      color: '#5b5b5b',
      fontSize: '12px',
    },
    headings: {
      color: '#000000',
      fontSize: '14px',
    },
    loader: {
      color: '#46beab',
    },
    error: {
      color: '#ff2e56',
    },
    success: {
      color: '#4BB543',
    },
    buttons: {
      color: '#46beab',
    },
    headerbackground: {
      color: '#ffffff',
    },
    background: {
      color: '#ffffff',
    },
    cashierbackground: {
      color: '#ffffff',
    },
    cardbackground: {
      color: 'transparent',
    },
    border: {
      radius: '3px',
    },
    margin: {
      size: '14px',
    },
    providerlogos: {
      list: '40px',
      dropdown: '26px',
    },
    creditcardicons: {
      creditcardUrl: 'default',
      cvvUrl: 'default',
      expirydateUrl: 'default',
    },
  },
};

export const contextSlice = createSlice({
  name: 'Theme',
  initialState: initialTheme,
  reducers: {
    setTheme: (state, action: PayloadAction<Partial<InitialTheme>>) => {
      state.theme = merge(state.theme, action.payload);
    },
  },
});

export const themeActions = { ...contextSlice.actions };

export default contextSlice.reducer;
