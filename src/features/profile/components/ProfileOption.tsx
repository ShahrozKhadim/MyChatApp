import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
import { responsive } from '../../../utils';

interface ProfileOptionProps {
  icon: string;
  title: string;
  onPress?: () => void;
  isLast?: boolean;
  themeColors: any;
}

const ProfileOption: React.FC<ProfileOptionProps> = React.memo(({
  icon,
  title,
  onPress,
  isLast = false,
  themeColors
}) => (
  <TouchableOpacity
    style={[
      styles.option,
      {
        backgroundColor: themeColors.surface,
        borderBottomColor: themeColors.border,
        borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
      }
    ]}
    onPress={onPress}
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
    <Icon
      name="chevron-forward"
      size={responsive.fontSize.md}
      color={themeColors.text.tertiary}
    />
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
  },
  optionIcon: {
    marginRight: responsive.margin.sm,
  },
  optionText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
  },
});

export default ProfileOption;
