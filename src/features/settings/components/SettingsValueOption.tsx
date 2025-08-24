import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { responsive } from '../../../utils';

interface SettingsValueOptionProps {
  icon: string;
  title: string;
  value: string;
  isLast?: boolean;
  themeColors: any;
}

const SettingsValueOption: React.FC<SettingsValueOptionProps> = React.memo(({
  icon,
  title,
  value,
  isLast = false,
  themeColors
}) => (
  <View
    style={[
      styles.option,
      {
        borderBottomColor: themeColors.border,
        borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
      }
    ]}
  >
    <View style={styles.optionLeft}>
      <Icon
        name={icon as any}
        size={responsive.fontSize.lg}
        color={themeColors.text.primary}
        style={styles.optionIcon}
      />
      <Text style={[styles.optionText, { color: themeColors.text.primary }]}>
        {title}
      </Text>
    </View>
    <Text style={[styles.valueText, { color: themeColors.text.tertiary }]}>
      {value}
    </Text>
  </View>
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
  valueText: {
    fontSize: responsive.fontSize.md,
    marginRight: responsive.margin.xs,
  },
});

export default SettingsValueOption;
