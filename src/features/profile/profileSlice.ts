import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from './types';

const initialState: ProfileState = {
  id: 'user-1',
  name: 'Alex Smith',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  email: 'alex.smith@example.com',
  phone: '+1 (555) 123-4567',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return { ...state, ...action.payload };
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
  },
});

export const {
  updateProfile,
  updateName,
  updateAvatar,
  updateEmail,
  updatePhone,
} = profileSlice.actions;

export default profileSlice.reducer;
