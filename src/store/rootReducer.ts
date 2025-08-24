import { combineReducers } from '@reduxjs/toolkit';
import { chatReducer } from '../features/chats/index';
import profileReducer from '../features/profile/profileSlice';
import settingsReducer from '../features/settings/settingsSlice';
import uiReducer from './uiSlice';

const rootReducer = combineReducers({
  chats: chatReducer,
  profile: profileReducer,
  settings: settingsReducer,
  ui: uiReducer,
});

export default rootReducer;
