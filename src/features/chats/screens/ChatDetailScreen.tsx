import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Icon from '@react-native-vector-icons/ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootState } from '../../../store';
import { setLoading } from '../../../store/uiSlice';
import { RootStackParamList } from '../../../navigation/types';
import { responsive, getThemeColors, Colors, createMessage, generateAutoResponse } from '../../../utils';
import { CONSTANTS } from '../../../constants';
import TypingIndicator from '../../../components/TypingIndicator';

import { Message } from '../types';
import { addMessage } from '../chatSlice';
import ChatBubble from '../components/ChatBubble';

type ChatDetailScreenRouteProp = RouteProp<RootStackParamList, 'ChatDetail'>;

const ChatDetailScreen: React.FC = () => {
  const route = useRoute<ChatDetailScreenRouteProp>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { conversationId, conversationName } = route.params;

  const conversation = useSelector((state: RootState) =>
    state.chats.conversations.find(c => c.id === conversationId)
  );
  const theme = useSelector((state: RootState) => state.ui.theme);

  // Memoize only expensive computations
  const isDark = theme === 'dark';
  const themeColors = useMemo(() => getThemeColors(isDark), [isDark]);

  const [messageText, setMessageText] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [messagesPage, setMessagesPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Messages per page for pagination
  const MESSAGES_PER_PAGE = CONSTANTS.CHAT.MESSAGES_PER_PAGE;

  // Show loading when entering ChatDetail screen
  useEffect(() => {
    dispatch(setLoading(true));

    // Simulate loading time
    const loadingTimeout = setTimeout(() => {
      dispatch(setLoading(false));
      setIsInitialLoading(false);
    }, CONSTANTS.CHAT.INITIAL_LOADING_DELAY);

    return () => {
      clearTimeout(loadingTimeout);
      dispatch(setLoading(false));
      setIsInitialLoading(false);
    };
  }, [dispatch]);

  // Get paginated messages (show latest messages first, then load older ones)
  const paginatedMessages = useMemo(() => {
    if (!conversation?.messages) return [];

    // For chat, we want to show the most recent messages first,
    // So we take the last (messagesPage * MESSAGES_PER_PAGE) messages
    const totalMessages = conversation.messages.length;
    const messagesToShow = messagesPage * MESSAGES_PER_PAGE;
    const startIndex = Math.max(0, totalMessages - messagesToShow);

    return conversation.messages.slice(startIndex);
  }, [conversation?.messages, messagesPage, MESSAGES_PER_PAGE]);

  const hasMoreMessages = conversation?.messages
    ? paginatedMessages.length < conversation.messages.length
    : false;

  // Scroll to bottom after initial loading completes or when new messages are added
  useEffect(() => {
    if (!isInitialLoading && conversation?.messages.length) {
      const scrollTimeout = setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, CONSTANTS.CHAT.SCROLL_TO_BOTTOM_DELAY);

      return () => clearTimeout(scrollTimeout);
    }
  }, [isInitialLoading, conversation?.messages.length]);

  // Load more messages (older messages) - triggered by onEndReached
  const loadMoreMessages = useCallback(() => {
    if (!isLoadingMore && hasMoreMessages) {
      setIsLoadingMore(true);

      // Simulate loading delay
      setTimeout(() => {
        setMessagesPage(prev => prev + 1);
        setIsLoadingMore(false);
      }, CONSTANTS.CHAT.LOAD_MORE_MESSAGES_DELAY);
    }
  }, [isLoadingMore, hasMoreMessages]);

  // Handle onEndReached for automatic loading
  const handleEndReached = () => loadMoreMessages();

  // Helper function to create a message object
  const createChatMessage = (sender: 'me' | 'other', text: string): Omit<Message, 'id'> => ({
    ...createMessage(sender, text),
  });

  // Helper function to send a message to Redux store
  const sendMessage = useCallback((message: Omit<Message, 'id'>, showToast: boolean = true) => {
    if (!conversation) return;

    dispatch(addMessage({
      conversationId: conversation.id,
      message,
      showToast,
    }));
  }, [conversation, dispatch]);

  // Helper function to generate auto-response (using utility)
  const getAutoResponse = () => generateAutoResponse();

  // Helper function to simulate auto-response with delay
  const simulateAutoResponse = () => {
    setTimeout(() => {
      const responseText = getAutoResponse();
      const responseMessage = createChatMessage('other', responseText);
      // Don't show toast for auto-responses when user is on this chat screen
      sendMessage(responseMessage, false);
    }, CONSTANTS.CHAT.AUTO_RESPONSE_DELAY);
  };

  // Clear input field
  const clearMessageInput = () => setMessageText('');

  // Validate the message before sending
  const isValidMessage = (text: string) => {
    return text.trim().length > 0 && conversation !== undefined;
  };

  // Main handler - orchestrates the message sending flow
  const handleSendMessage = useCallback(() => {
    if (!isValidMessage(messageText)) {
      return;
    }

    // Create and send user message
    const userMessage = createChatMessage('me', messageText);
    sendMessage(userMessage);

    // Clear input immediately for better UX
    clearMessageInput();

    // Trigger auto-response
    simulateAutoResponse();
  }, [messageText, sendMessage]); // Only memoize what's actually needed

  // Memoized functions for FlatList performance
  const keyExtractor = useCallback((item: Message) => item.id, []);

  const renderMessage = useCallback(({ item }: { item: Message }) => (
    <ChatBubble message={item} />
  ), []);

  // Header component for loading indicator
  const renderListHeader = () => {
    if (!isLoadingMore) return null;

    return (
      <View style={styles.loadingIndicator}>
        <Text style={[styles.loadingText, { color: themeColors.text.tertiary }]}>
          Loading older messages...
        </Text>
      </View>
    );
  };

  // Memoized dynamic styles
  const dynamicStyles = useMemo(() => ({
    container: [styles.container, { backgroundColor: themeColors.background }],
    header: [
      styles.header,
      {
        backgroundColor: themeColors.surface,
        borderBottomColor: themeColors.border,
      },
    ],
    headerTitle: [styles.headerTitle, { color: themeColors.text.primary }],
    statusText: [styles.statusText, { color: themeColors.text.tertiary }],
    onlineText: [styles.onlineText, { color: '#4CAF50' }], // Green for online
    offlineText: [styles.offlineText, { color: themeColors.text.tertiary }],
    errorText: [styles.errorText, { color: themeColors.text.primary }],
    inputContainer: [
      styles.inputContainer,
      {
        backgroundColor: themeColors.surface,
        borderTopColor: themeColors.border,
      },
    ],
    textInput: [
      styles.textInput,
      {
        backgroundColor: themeColors.background,
        color: themeColors.text.primary,
        borderColor: themeColors.border,
      },
    ],
    placeholderColor: themeColors.text.tertiary,
  }), [themeColors]);

  // Memoized send button style (depends on messageText)
  const sendButtonStyle = useMemo(() => [
    styles.sendButton,
    {
      backgroundColor: messageText.trim() ? Colors.primary : themeColors.border,
    },
  ], [messageText, themeColors.border]);

  // Memoized send icon color (depends on messageText)
  const sendIconColor = useMemo(() =>
    messageText.trim() ? '#ffffff' : themeColors.text.tertiary,
    [messageText, themeColors.text.tertiary]
  );

  if (!conversation) {
    return (
      <SafeAreaView style={dynamicStyles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={dynamicStyles.errorText}>
            Conversation not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={dynamicStyles.container} edges={['top']}>
      {/* Custom Header */}
      <View style={dynamicStyles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon
              name="chevron-back"
              size={responsive.fontSize.xxl}
              color={themeColors.text.primary}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={dynamicStyles.headerTitle} numberOfLines={1} ellipsizeMode='tail'>
              {conversationName}
            </Text>
            {conversation?.typing ? (
              <View style={styles.statusContainer}>
                <Text style={dynamicStyles.statusText}>typing
                  <TypingIndicator color={themeColors.text.tertiary} />
                </Text>
              </View>
            ) : conversation?.online ? (
              <Text style={dynamicStyles.onlineText}>online</Text>
            ) : (
              <Text style={dynamicStyles.offlineText}>last seen recently</Text>
            )}
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={paginatedMessages}
          keyExtractor={keyExtractor}
          renderItem={renderMessage}
          ListHeaderComponent={renderListHeader}
          showsVerticalScrollIndicator={false}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={100}
          initialNumToRender={15}
          windowSize={10}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: CONSTANTS.CHAT.AUTO_SCROLL_THRESHOLD,
          }}
          keyboardShouldPersistTaps="handled"
        />

        <View style={dynamicStyles.inputContainer}>
          <TextInput
            style={dynamicStyles.textInput}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type a message..."
            placeholderTextColor={dynamicStyles.placeholderColor}
            multiline
            maxLength={CONSTANTS.CHAT.MAX_MESSAGE_LENGTH}
            returnKeyType="send"
            submitBehavior={'submit'}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            style={sendButtonStyle}
            onPress={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <Icon
              name="send"
              size={responsive.fontSize.md}
              color={sendIconColor}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: responsive.padding.xs,
    paddingVertical: responsive.padding.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.margin.xs,
  },
  backButton: {
    padding: responsive.padding.xs,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '600',
    maxWidth: responsive.width.half,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusText: {
    fontSize: responsive.fontSize.xs,
    fontStyle: 'italic',
  },
  onlineText: {
    fontSize: responsive.fontSize.xs,
    fontWeight: '500',
    marginTop: 1,
  },
  offlineText: {
    fontSize: responsive.fontSize.xs,
    marginTop: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: responsive.padding.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: responsive.padding.md,
    paddingVertical: responsive.padding.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: responsive.padding.lg,
    paddingHorizontal: responsive.padding.md,
    paddingVertical: responsive.padding.sm,
    marginRight: responsive.margin.sm,
    maxHeight: 100,
    fontSize: responsive.fontSize.md,
  },
  sendButton: {
    width: responsive.height.button * 0.8,
    height: responsive.height.button * 0.8,
    borderRadius: responsive.height.button * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: responsive.fontSize.md,
  },
  loadingIndicator: {
    paddingVertical: responsive.padding.md,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
  },
});

// Memoize the entire component
export default React.memo(ChatDetailScreen);
