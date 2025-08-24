// Navigation type definitions
import { NavigatorScreenParams } from '@react-navigation/native';
import { ROUTES } from './routes';

export type RootStackParamList = {
  [ROUTES.MAIN]: NavigatorScreenParams<BottomTabParamList> | undefined;
  [ROUTES.CHAT_DETAIL]: {
    conversationId: string;
    conversationName: string;
  };
};

export type BottomTabParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.CHATS]: { 
    openSearch?: boolean;
    searchQuery?: string;
  } | undefined;
  [ROUTES.PROFILE]: undefined;
  [ROUTES.SETTINGS]: undefined;
};
