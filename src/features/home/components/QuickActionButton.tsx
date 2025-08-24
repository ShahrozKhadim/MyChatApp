import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import Icon from '@react-native-vector-icons/ionicons';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store';
import { responsive, getThemeColors, Shadows } from '../../../utils';

interface QuickActionButtonProps {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ title, icon, color, onPress }) => {
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === 'dark';
  const themeColors = getThemeColors(isDark);

  const buttonStyle = [
    styles.button,
    {
      backgroundColor: themeColors.card,
      borderColor: themeColors.border,
    },
    Shadows.button(isDark),
  ];

  const textStyle = [
    styles.text,
    { color: themeColors.text.primary },
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Icon name={icon as any} size={responsive.fontSize.lg} color={color} />
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsive.padding.lg,
    borderRadius: responsive.padding.lg,
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: responsive.margin.xs,
    minHeight: responsive.height.button * 1.8,
  },
  text: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    marginTop: responsive.margin.sm,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});

export default QuickActionButton;
