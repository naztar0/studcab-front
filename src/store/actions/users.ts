import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUserProfile,
  fetchUserRecordBook,
  fetchUserRating,
  fetchUserSyllabus,
} from '@/requests/users';

export const getUserProfile = createAsyncThunk(
  'get_user_profile',
  async ({ user }: { user: number }) => (
    await fetchUserProfile(user)
  ).data,
);

export const getUserRecordBook = createAsyncThunk(
  'get_user_record_book',
  async ({ user, semester }: { user: number, semester: number }) => (
    await fetchUserRecordBook(user, semester)
  ).data,
);

export const getUserRating = createAsyncThunk(
  'get_user_rating',
  async ({ user, semester }: { user: number, semester: number }) => (
    await fetchUserRating(user, semester)
  ).data,
);

export const getUserSyllabus = createAsyncThunk(
  'get_user_syllabus',
  async ({ user, semester }: { user: number, semester: number }) => (
    await fetchUserSyllabus(user, semester)
  ).data,
);
