import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@react-native-vector-icons/ionicons';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { BottomTabParamList } from './types';
import { ROUTES } from './routes';
import { responsive } from '../utils';
import { HomeScreen } from '../features/home/index';
import { ChatsScreen } from '../features/chats/index';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import SettingsScreen from '../features/settings/screens/SettingsScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const getTabBarIcon = (iconName: string) => ({ color, size }: { color: string; size: number }) => (
  <Icon name={iconName as any} size={size} color={color} />
);
const BottomTabs: React.FC = () => {
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === 'dark';

  const tabBarStyle = {
    backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    borderTopColor: isDark ? '#333333' : '#e0e0e0',
    height: responsive.height.tabBar,
    paddingBottom: responsive.padding.xs,
    paddingTop: responsive.padding.xs,
  };

  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: isDark ? '#8E8E93' : '#999999',
    tabBarStyle,
    tabBarLabelStyle: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '600' as const,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: getTabBarIcon('home-outline'),
        }}
      />
      <Tab.Screen
        name={ROUTES.CHATS}
        component={ChatsScreen}
        options={{
          tabBarIcon: getTabBarIcon('chatbubbles-outline'),
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: getTabBarIcon('person-outline'),
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarIcon: getTabBarIcon('settings-outline'),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
