import { Platform, ViewStyle } from 'react-native';

export const Shadows = {
  // Card shadows
  card: (isDark: boolean): ViewStyle => ({
    ...Platform.select({
      ios: {
        shadowColor: isDark ? '#000' : '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.3 : 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  }),

  // Small elevation
  small: (isDark: boolean): ViewStyle => ({
    ...Platform.select({
      ios: {
        shadowColor: isDark ? '#000' : '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isDark ? 0.2 : 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  }),

  // Medium elevation
  medium: (isDark: boolean): ViewStyle => ({
    ...Platform.select({
      ios: {
        shadowColor: isDark ? '#000' : '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.25 : 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  }),

  // Large elevation
  large: (isDark: boolean): ViewStyle => ({
    ...Platform.select({
      ios: {
        shadowColor: isDark ? '#000' : '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: isDark ? 0.3 : 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  }),

  // Button shadow
  button: (isDark: boolean): ViewStyle => ({
    ...Platform.select({
      ios: {
        shadowColor: isDark ? '#000' : '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.2 : 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  }),
};
