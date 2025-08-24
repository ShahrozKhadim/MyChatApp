import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsive } from '../../../utils';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  themeColors: any;
}

const SettingsSection: React.FC<SettingsSectionProps> = React.memo(({
  title,
  children,
  themeColors
}) => (
  <>
    <Text style={[styles.sectionTitle, { color: themeColors.text.tertiary }]}>
      {title}
    </Text>
    <View style={[
      styles.section,
      {
        backgroundColor: themeColors.surface,
        borderColor: themeColors.border,
      }
    ]}>
      {children}
    </View>
  </>
));

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '600',
    marginTop: responsive.margin.md,
    marginBottom: responsive.margin.sm,
    marginHorizontal: responsive.margin.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    marginHorizontal: responsive.margin.md,
    borderRadius: responsive.padding.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
});

export default SettingsSection;
