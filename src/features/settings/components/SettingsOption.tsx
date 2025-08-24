import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { responsive } from '../../../utils';

interface SettingsOptionProps {
  icon: string;
  title: string;
  onPress?: () => void;
  isLast?: boolean;
  rightElement?: React.ReactNode;
  iconColor?: string;
  titleColor?: string;
  themeColors: any;
}

const SettingsOption: React.FC<SettingsOptionProps> = React.memo(({
  icon,
  title,
  onPress,
  isLast = false,
  rightElement,
  iconColor,
  titleColor,
  themeColors
}) => (
  <TouchableOpacity
    style={[
      styles.option,
      {
        borderBottomColor: themeColors.border,
        borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
      }
    ]}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.optionLeft}>
      <Icon
        name={icon as any}
        size={responsive.fontSize.lg}
        color={iconColor || themeColors.text.primary}
        style={styles.optionIcon}
      />
      <Text style={[styles.optionText, { color: titleColor || themeColors.text.primary }]}>
        {title}
      </Text>
    </View>
    {rightElement || (
      <Icon
        name="chevron-forward"
        size={responsive.fontSize.md}
        color={themeColors.text.tertiary}
      />
    )}
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.padding.md,
    paddingVertical: responsive.padding.md,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: responsive.margin.sm,
  },
  optionText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
  },
});

export default SettingsOption;
