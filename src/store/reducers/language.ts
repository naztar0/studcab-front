import { createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import { Language } from '@/constants/settings';

const initialState = {
  language: cookies.get('language') ? Number(cookies.get('language')) : Language.Ukrainian,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
