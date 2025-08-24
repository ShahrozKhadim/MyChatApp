import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsive } from '../../../utils';

interface InfoRowProps {
  label: string;
  value: string;
  themeColors: any;
}

const InfoRow: React.FC<InfoRowProps> = React.memo(({ label, value, themeColors }) => (
  <View style={[styles.infoRow, { borderBottomColor: themeColors.border }]}>
    <Text style={[styles.label, { color: themeColors.text.tertiary }]}>{label}</Text>
    <Text style={[styles.value, { color: themeColors.text.primary }]} numberOfLines={2}>{value}</Text>
  </View>
));

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsive.padding.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
    maxWidth: responsive.width.quarter
  },
  value: {
    fontSize: responsive.fontSize.sm,
    flex: 1,
    textAlign: 'right',
    maxWidth: responsive.width.half
  },
});

export default InfoRow;
