import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootState } from '../../../store';
import { toggleTheme } from '../../../store/uiSlice';
import { responsive, getThemeColors } from '../../../utils';

import { toggleNotifications } from '../settingsSlice';
import {
  SettingsSection,
  SettingsOption,
  SettingsSwitchOption,
  SettingsValueOption
} from '../components';

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const theme = useSelector((state: RootState) => state.ui.theme);

  // Memoize only expensive computations
  const isDark = theme === 'dark';
  const themeColors = useMemo(() => getThemeColors(isDark), [isDark]);

  // Simple handlers - no need to memoize
  const handleNotificationToggle = () => dispatch(toggleNotifications());
  const handleThemeToggle = () => dispatch(toggleTheme());

  const handleLanguageChange = () => {
    Alert.alert(
      'Language Settings',
      'Language selection will be available in a future update.',
      [{ text: 'OK' }]
    );
  };

  const handleDataExport = () => {
    Alert.alert(
      'Export Data',
      'This feature will allow you to export your chat data.',
      [{ text: 'OK' }]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all your chat data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive' },
      ]
    );
  };

  const handleHelpSupport = () => {
    Alert.alert(
      'Help & Support',
      'Contact support or visit our help center.',
      [{ text: 'OK' }]
    );
  };

  // Memoized dynamic styles
  const dynamicStyles = useMemo(() => ({
    container: [styles.container, { backgroundColor: themeColors.background }],
    header: [styles.header, { backgroundColor: themeColors.surface }],
    title: [styles.title, { color: themeColors.text.primary }],
  }), [themeColors]);

  return (
    <SafeAreaView style={dynamicStyles.container} edges={['top']}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Appearance Section */}
        <SettingsSection title="APPEARANCE" themeColors={themeColors}>
          <SettingsSwitchOption
            icon={isDark ? 'moon' : 'sunny'}
            title="Dark Mode"
            value={isDark}
            onValueChange={handleThemeToggle}
            isLast={true}
            themeColors={themeColors}
          />
        </SettingsSection>

        {/* Notifications Section */}
        <SettingsSection title="NOTIFICATIONS" themeColors={themeColors}>
          <SettingsSwitchOption
            icon="notifications"
            title="Push Notifications"
            value={settings.notificationsEnabled}
            onValueChange={handleNotificationToggle}
            isLast={true}
            themeColors={themeColors}
          />
        </SettingsSection>

        {/* Language Section */}
        <SettingsSection title="LANGUAGE" themeColors={themeColors}>
          <SettingsOption
            icon="language"
            title="Language"
            onPress={handleLanguageChange}
            isLast={true}
            rightElement={
              <View style={styles.optionRight}>
                <Text style={[styles.valueText, { color: themeColors.text.tertiary }]}>
                  {settings.language === 'en' ? 'English' : settings.language}
                </Text>
              </View>
            }
            themeColors={themeColors}
          />
        </SettingsSection>

        {/* Data & Privacy Section */}
        <SettingsSection title="DATA & PRIVACY" themeColors={themeColors}>
          <SettingsOption
            icon="download"
            title="Export Data"
            onPress={handleDataExport}
            themeColors={themeColors}
          />
          <SettingsOption
            icon="trash"
            title="Clear All Data"
            onPress={handleClearData}
            iconColor="#FF3B30"
            titleColor="#FF3B30"
            isLast={true}
            themeColors={themeColors}
          />
        </SettingsSection>

        {/* About Section */}
        <SettingsSection title="ABOUT" themeColors={themeColors}>
          <SettingsValueOption
            icon="information-circle"
            title="Version"
            value="1.0.0"
            themeColors={themeColors}
          />
          <SettingsOption
            icon="help-circle"
            title="Help & Support"
            onPress={handleHelpSupport}
            isLast={true}
            themeColors={themeColors}
          />
        </SettingsSection>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: responsive.padding.md,
    paddingTop: responsive.padding.md,
    paddingBottom: responsive.padding.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: responsive.fontSize.xl,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: responsive.fontSize.md,
    marginRight: responsive.margin.xs,
  },
  bottomPadding: {
    height: responsive.padding.xl,
  },
});

export default SettingsScreen;
