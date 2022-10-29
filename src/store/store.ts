import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/store/reducers/theme';
import languageReducer from '@/store/reducers/language';
import loginReducer from '@/store/reducers/login';
import profileReducer from '@/store/reducers/profile';
import recordBookReducer from '@/store/reducers/recordBook';
import ratingReducer from '@/store/reducers/rating';
import syllabusReducer from '@/store/reducers/syllabus';
import coverReducer from '@/store/reducers/cover';

const rootReducer = combineReducers({
  themeReducer,
  languageReducer,
  loginReducer,
  profileReducer,
  recordBookReducer,
  ratingReducer,
  syllabusReducer,
  coverReducer,
});

// eslint-disable-next-line import/prefer-default-export
export const setupStore = () => configureStore({
  reducer: rootReducer,
});

// @ts-ignore
export type AppDispatch = typeof setupStore.dispatch;
