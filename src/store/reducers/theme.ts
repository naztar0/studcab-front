import { createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import { Theme } from '@/constants/settings';

const initialState = {
  theme: cookies.get('theme') ? Number(cookies.get('theme')) : Theme.Dark,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === Theme.Light ? Theme.Dark : Theme.Light;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
