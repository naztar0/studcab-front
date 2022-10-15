import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProfile, fetchUserRecordBook } from '@/requests/users';

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
