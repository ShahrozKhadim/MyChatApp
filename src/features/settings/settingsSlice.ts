import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from './types';

const initialState: SettingsState = {
  notificationsEnabled: true,
  language: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    updateSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  toggleNotifications,
  setNotifications,
  setLanguage,
  updateSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
