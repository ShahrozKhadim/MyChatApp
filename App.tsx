/**
 * MyChatApp - React Native Chat Application
 * Feature-based architecture with Redux Toolkit
 *
 * @format
 */

import React, { useMemo } from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';

import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store, persistor, RootState } from './src/store';
import { getThemeColors } from './src/utils';
import LoadingSpinner from './src/components/LoadingSpinner';
import ToastManager from './src/components/ToastManager';
import RootNavigator from './src/navigation/RootNavigator';

// Dynamic StatusBar component that responds to theme changes
const DynamicStatusBar: React.FC = React.memo(() => {
  const theme = useSelector((state: RootState) => state.ui.theme);

  // Memoize derived values for performance
  const { themeColors, barStyle } = useMemo(() => {
    const isDark = theme === 'dark';
    const themeColors = getThemeColors(isDark);
    const barStyle: StatusBarStyle = isDark ? "light-content" : "dark-content";

    return { isDark, themeColors, barStyle };
  }, [theme]);

  return (
    <StatusBar
      barStyle={barStyle}
      backgroundColor={themeColors.surface}
      translucent={true}
      animated={true}
    />
  );
});

// Global Loading Overlay component
const GlobalLoadingOverlay: React.FC = React.memo(() => {
  const isLoading = useSelector((state: RootState) => state.ui.loading);
  const error = useSelector((state: RootState) => state.ui.error);

  if (!isLoading) {
    return null;
  }

  // Dynamic loading messages based on context
  const getLoadingMessage = () => {
    if (error) return "Retrying...";
    return "Loading...";
  };

  return (
    <LoadingSpinner
      text={getLoadingMessage()}
      overlay={true}
      size="large"
    />
  );
});

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <DynamicStatusBar />
          <RootNavigator />
          <GlobalLoadingOverlay />
          <ToastManager />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
