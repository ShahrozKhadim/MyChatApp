import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from '@react-native-vector-icons/ionicons';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store';
import { responsive, getThemeColors, Shadows } from '../../../utils';
import FastImage from '../../../components/FastImage';

import { Conversation } from '../../chats';

interface RecentConversationCardProps {
  conversation: Conversation;
  onPress: () => void;
}

const RecentConversationCard: React.FC<RecentConversationCardProps> = ({ conversation, onPress }) => {
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === 'dark';
  const themeColors = getThemeColors(isDark);

  const formatTime = (timestamp: number) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } else {
      return messageDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const cardStyle = [
    styles.card,
    {
      backgroundColor: themeColors.card,
      borderColor: themeColors.border,
    },
    Shadows.small(isDark),
  ];

  const nameStyle = [
    styles.name,
    { color: themeColors.text.primary },
  ];

  const messageStyle = [
    styles.message,
    { color: themeColors.text.secondary },
  ];

  const timeStyle = [
    styles.time,
    { color: themeColors.text.tertiary },
  ];

  return (
    <TouchableOpacity style={cardStyle} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <FastImage source={{ uri: conversation.avatar }} style={styles.avatar} />
        {conversation.online && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={nameStyle} numberOfLines={1}>
            {conversation.name}
          </Text>
          {conversation.isFavorite && (
            <Icon name="heart" size={responsive.fontSize.sm} color="#FF3B30" />
          )}
        </View>

        <Text style={messageStyle} numberOfLines={1}>
          {conversation.typing ? 'Typing...' : conversation.lastMessage}
        </Text>

        <Text style={timeStyle}>{formatTime(conversation.updatedAt)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: responsive.padding.md,
    borderRadius: responsive.padding.md,
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: responsive.margin.xs,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: responsive.margin.sm,
  },
  avatar: {
    width: responsive.fontSize.xxl * 1.5,
    height: responsive.fontSize.xxl * 1.5,
    borderRadius: responsive.fontSize.xxl * 0.75,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: responsive.fontSize.sm,
    height: responsive.fontSize.sm,
    borderRadius: responsive.fontSize.sm / 2,
    backgroundColor: '#30d158',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.margin.xs / 2,
  },
  name: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    flex: 1,
  },
  message: {
    fontSize: responsive.fontSize.sm,
    marginBottom: responsive.margin.xs / 2,
  },
  time: {
    fontSize: responsive.fontSize.xs,
  },
});

export default RecentConversationCard;
