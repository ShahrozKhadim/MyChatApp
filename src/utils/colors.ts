export const Colors = {
  // Primary brand colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA3FF',

  // Secondary colors
  secondary: '#5856D6',
  accent: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',

  // Neutral colors - Light theme
  light: {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    card: '#FFFFFF',
    border: '#E5E5EA',
    borderLight: '#F2F2F7',
    text: {
      primary: '#1C1C1E',
      secondary: '#3A3A3C',
      tertiary: '#8E8E93',
      disabled: '#C7C7CC',
    },
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },

  // Neutral colors - Dark theme
  dark: {
    background: '#000000',
    surface: '#1C1C1E',
    card: '#2C2C2E',
    border: '#38383A',
    borderLight: '#48484A',
    text: {
      primary: '#FFFFFF',
      secondary: '#EBEBF5',
      tertiary: '#8E8E93',
      disabled: '#636366',
    },
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // Status colors
  online: '#34C759',
  offline: '#8E8E93',
  typing: '#FF9500',

  // Message bubble colors
  messageBubble: {
    sent: '#007AFF',
    received: {
      light: '#E5E5EA',
      dark: '#2C2C2E',
    },
  },
};

export const getThemeColors = (isDark: boolean) => isDark ? Colors.dark : Colors.light;
