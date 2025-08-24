import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { responsive } from '../../../utils';
import { Colors } from '../../../utils';

interface SettingsSwitchOptionProps {
  icon: string;
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  isLast?: boolean;
  themeColors: any;
}

const SettingsSwitchOption: React.FC<SettingsSwitchOptionProps> = React.memo(({
  icon,
  title,
  value,
  onValueChange,
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
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: themeColors.border, true: Colors.primary }}
      thumbColor="#ffffff"
    />
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
});

export default SettingsSwitchOption;
