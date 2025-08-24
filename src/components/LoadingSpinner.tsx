import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { Colors, getThemeColors, responsive } from '../utils';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  text?: string;
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  text = 'Loading...',
  overlay = false
}) => {
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === 'dark';
  const themeColors = getThemeColors(isDark);

  const containerStyle = [
    styles.container,
    overlay && styles.overlay,
    {
      backgroundColor: overlay
        ? themeColors.overlay
        : 'transparent',
    },
  ];

  const contentStyle = [
    styles.content,
    overlay && {
      backgroundColor: themeColors.card,
      padding: responsive.padding.xl,
      borderRadius: responsive.padding.md,
    },
  ];

  const textStyle = [
    styles.text,
    { color: themeColors.text.secondary },
  ];

  return (
    <View style={containerStyle}>
      <View style={contentStyle}>
        <ActivityIndicator
          size={size}
          color={Colors.primary}
          style={styles.spinner}
        />
        {text && <Text style={textStyle}>{text}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginBottom: responsive.margin.sm,
  },
  text: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LoadingSpinner;
