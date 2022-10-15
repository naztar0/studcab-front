import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/store/reducers/theme';
import languageReducer from '@/store/reducers/language';
import profileReducer from '@/store/reducers/profile';
import recordBookReducer from '@/store/reducers/recordBook';

const rootReducer = combineReducers({
  themeReducer,
  languageReducer,
  profileReducer,
  recordBookReducer,
});

// eslint-disable-next-line import/prefer-default-export
export const setupStore = () => configureStore({
  reducer: rootReducer,
});

// @ts-ignore
export type AppDispatch = typeof setupStore.dispatch;
