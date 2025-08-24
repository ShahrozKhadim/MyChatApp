import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

import { RootState } from '../../../store';
import { formatTime, responsive } from '../../../utils';

import { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === 'dark';
  const isMe = message.sender === 'me';

  const bubbleStyle = [
    styles.bubble,
    isMe ? styles.myBubble : styles.otherBubble,
    {
        backgroundColor: isMe
        ? '#007AFF'
        : isDark
        ? '#2c2c2e'
        : '#e5e5ea',
    },
  ];

  const textStyle = [
    styles.text,
    {
      color: isMe
        ? '#ffffff'
        : isDark
        ? '#ffffff'
        : '#000000',
    },
  ];

  const timeStyle = [
    styles.time,
    {
      color: isMe
        ? 'rgba(255, 255, 255, 0.7)'
        : isDark
        ? 'rgba(255, 255, 255, 0.6)'
        : 'rgba(0, 0, 0, 0.6)',
    },
  ];

  return (
    <View style={[styles.container, isMe ? styles.myContainer : styles.otherContainer]}>
      <View style={bubbleStyle}>
        <Text style={textStyle}>{message.text}</Text>
        <Text style={timeStyle}>{formatTime(message.timestamp)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: responsive.margin.xs,
    paddingHorizontal: responsive.padding.md,
  },
  myContainer: {
    alignItems: 'flex-end',
  },
  otherContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: responsive.padding.md,
    paddingVertical: responsive.padding.sm,
    borderRadius: responsive.padding.lg,
  },
  myBubble: {
    borderBottomRightRadius: responsive.padding.xs,
  },
  otherBubble: {
    borderBottomLeftRadius: responsive.padding.xs,
  },
  text: {
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.3,
  },
  time: {
    fontSize: responsive.fontSize.xs,
    marginTop: responsive.margin.xs / 2,
    alignSelf: 'flex-end',
  },
});

export default ChatBubble;
