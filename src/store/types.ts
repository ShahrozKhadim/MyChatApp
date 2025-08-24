import { ChatsState } from '../features/chats';
import { ProfileState } from '../features/profile/types';
import { SettingsState } from '../features/settings/types';

export type UIState = {
  theme: "light" | "dark";
  loading: boolean;
  error?: string;
};

// Root state shape
export type RootState = {
  chats: ChatsState;
  profile: ProfileState;
  settings: SettingsState;
  ui: UIState;
};
