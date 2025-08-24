import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootState } from '../../../store';
import { toggleTheme } from '../../../store/uiSlice';
import { responsive, getThemeColors } from '../../../utils';
import FastImage from '../../../components/FastImage';

import { ProfileOption, InfoRow } from '../components';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const theme = useSelector((state: RootState) => state.ui.theme);

  // Memoize only expensive computations
  const isDark = theme === 'dark';
  const themeColors = useMemo(() => getThemeColors(isDark), [isDark]);

  const handleThemeToggle = () => dispatch(toggleTheme());

  // Memoize all dynamic styles
  const dynamicStyles = useMemo(() => ({
    container: [styles.container, { backgroundColor: themeColors.background }],
    header: [styles.header, { backgroundColor: themeColors.surface }],
    title: [styles.title, { color: themeColors.text.primary }],
    card: [
      styles.card,
      {
        backgroundColor: themeColors.surface,
        borderColor: themeColors.border,
      },
    ],
    name: [styles.name, { color: themeColors.text.primary }],
  }), [themeColors]);

  // Profile options data - simple array, no need to memoize
  const profileOptions = [
    {
      icon: isDark ? 'moon' : 'sunny',
      title: isDark ? 'Dark Mode' : 'Light Mode',
      onPress: handleThemeToggle,
    },
    {
      icon: 'create-outline',
      title: 'Edit Profile',
      onPress: () => {/* TODO: Implement edit profile */},
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy & Security',
      onPress: () => {/* TODO: Implement privacy settings */},
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      onPress: () => {/* TODO: Implement help */},
    },
  ];

  // Profile info data - simple array, no need to memoize
  const profileInfo = [
    { label: 'Email', value: profile.email || 'Not provided' },
    { label: 'Phone', value: profile.phone || 'Not provided' },
    { label: 'ID', value: profile.id },
  ];

  return (
    <SafeAreaView style={dynamicStyles.container} edges={['top']}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={dynamicStyles.card}>
          <View style={styles.profileInfo}>
            <FastImage source={{ uri: profile.avatar }} style={styles.avatar} />
            <Text style={dynamicStyles.name}>{profile.name}</Text>
          </View>

          <View style={styles.infoSection}>
            {profileInfo.map((info) => (
              <InfoRow
                key={info.label}
                label={info.label}
                value={info.value}
                themeColors={themeColors}
              />
            ))}
          </View>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {profileOptions.map((option, index) => (
            <ProfileOption
              key={option.title}
              icon={option.icon}
              title={option.title}
              onPress={option.onPress}
              isLast={index === profileOptions.length - 1}
              themeColors={themeColors}
            />
          ))}
        </View>
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
  card: {
    margin: responsive.margin.md,
    borderRadius: responsive.padding.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  profileInfo: {
    alignItems: 'center',
    paddingVertical: responsive.padding.lg,
  },
  avatar: {
    width: responsive.fontSize.xxl * 3,
    height: responsive.fontSize.xxl * 3,
    borderRadius: responsive.fontSize.xxl * 1.5,
    marginBottom: responsive.margin.md,
  },
  name: {
    fontSize: responsive.fontSize.lg,
    fontWeight: 'bold',
  },
  infoSection: {
    paddingHorizontal: responsive.padding.md,
    paddingBottom: responsive.padding.md,
  },
  optionsContainer: {
    marginHorizontal: responsive.margin.md,
    borderRadius: responsive.padding.md,
    overflow: 'hidden',
  },
});

// Memoize the entire component
export default ProfileScreen;
