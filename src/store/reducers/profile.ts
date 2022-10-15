import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile } from '@/store/actions/users';

const initialState = {
  isLoading: true,
  profile: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserProfile.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
