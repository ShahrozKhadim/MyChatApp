import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from '@react-native-vector-icons/ionicons';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../store';
import { responsive } from '../../../utils';
import FastImage from '../../../components/FastImage';
import HighlightedText from '../../../components/HighlightedText';

import { Conversation } from '../types';
import { toggleFavorite } from '../chatSlice';

interface ChatListItemProps {
  conversation: Conversation;
  onPress: () => void;
  searchQuery?: string;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  conversation,
  onPress,
  searchQuery = '',
}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === 'dark';

  const formatTime = (timestamp: number) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours =
      (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } else if (diffInHours < 168) {
      // Less than a week
      return messageDate.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const handleFavoritePress = () => {
    dispatch(toggleFavorite(conversation.id));
  };

  const containerStyle = [
    styles.container,
    {
      backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
      borderBottomColor: isDark ? '#333333' : '#e0e0e0',
    },
  ];

  const nameStyle = [styles.name, { color: isDark ? '#ffffff' : '#000000' }];

  const lastMessageStyle = [
    styles.lastMessage,
    { color: isDark ? '#8e8e93' : '#8e8e93' },
  ];

  const timeStyle = [styles.time, { color: isDark ? '#8e8e93' : '#8e8e93' }];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <FastImage
          source={{ uri: conversation.avatar }}
          style={styles.avatar}
        />
        {conversation.online && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <View style={styles.nameContainer}>
            <HighlightedText
              text={conversation.name}
              searchTerm={searchQuery}
              style={nameStyle}
            />
          </View>
          <View style={styles.rightSection}>
            <Text style={timeStyle}>{formatTime(conversation.updatedAt)}</Text>
            <TouchableOpacity
              onPress={handleFavoritePress}
              style={styles.favoriteButton}
            >
              <Icon
                name={conversation.isFavorite ? 'heart' : 'heart-outline'}
                size={responsive.fontSize.md}
                color={
                  conversation.isFavorite
                    ? '#FF3B30'
                    : isDark
                    ? '#8e8e93'
                    : '#8e8e93'
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.messageRow}>
          <HighlightedText
            text={conversation.typing ? 'Typing...' : conversation.lastMessage}
            searchTerm={conversation.typing ? '' : searchQuery}
            style={lastMessageStyle}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: responsive.padding.md,
    paddingVertical: responsive.padding.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: responsive.margin.sm,
  },
  avatar: {
    width: responsive.fontSize.xxl * 2,
    height: responsive.fontSize.xxl * 2,
    borderRadius: responsive.fontSize.xxl,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: responsive.fontSize.sm,
    height: responsive.fontSize.sm,
    borderRadius: responsive.fontSize.sm / 2,
    backgroundColor: '#30d158',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.margin.xs / 2,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    maxWidth: responsive.width.half
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: responsive.fontSize.xs,
    marginRight: responsive.margin.xs,
  },
  favoriteButton: {
    padding: responsive.padding.xs / 2,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: responsive.fontSize.sm,
    flex: 1,
  },
});

export default ChatListItem;
