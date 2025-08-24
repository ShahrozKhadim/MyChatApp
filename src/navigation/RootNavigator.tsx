import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { RootStackParamList } from './types';
import { ROUTES } from './routes';
import BottomTabs from './BottomTabs';
import { ChatDetailScreen } from '../features/chats/index';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === 'dark';

  const navigationTheme = {
    dark: isDark,
    colors: {
      primary: '#007AFF',
      background: isDark ? '#000000' : '#ffffff',
      card: isDark ? '#1a1a1a' : '#ffffff',
      text: isDark ? '#ffffff' : '#000000',
      border: isDark ? '#333333' : '#e0e0e0',
      notification: '#FF3B30',
    },
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: 'normal' as const,
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: 'System',
        fontWeight: 'bold' as const,
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '900' as const,
      },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
            borderBottomColor: isDark ? '#333333' : '#e0e0e0',
          },
          headerTintColor: isDark ? '#ffffff' : '#000000',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen
          name={ROUTES.MAIN}
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.CHAT_DETAIL}
          component={ChatDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
