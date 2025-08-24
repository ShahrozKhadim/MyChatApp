import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from '@react-native-vector-icons/ionicons';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store';
import { responsive, getThemeColors, Shadows } from '../../../utils';

interface QuickStatsCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ title, value, icon, color }) => {
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === 'dark';
  const themeColors = getThemeColors(isDark);

  const cardStyle = [
    styles.card,
    {
      backgroundColor: themeColors.card,
      borderColor: themeColors.border,
    },
    Shadows.card(isDark),
  ];

  const titleStyle = [
    styles.title,
    { color: themeColors.text.tertiary },
  ];

  const valueStyle = [
    styles.value,
    { color: themeColors.text.primary },
  ];

  return (
    <View style={cardStyle}>
      <View style={styles.header}>
        <Icon name={icon as any} size={responsive.fontSize.lg} color={color} />
        <Text style={titleStyle}>{title}</Text>
      </View>
      <Text style={valueStyle}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingVertical: responsive.padding.md,
    borderRadius: responsive.padding.md,
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: responsive.margin.xs,
    minHeight: responsive.height.button * 1.8,
    rowGap: responsive.margin.xs,
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
    justifyContent:'center',
  },
  title: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
  },
  value: {
    fontSize: responsive.fontSize.xl,
    fontWeight: 'bold',
  },
});

export default QuickStatsCard;
