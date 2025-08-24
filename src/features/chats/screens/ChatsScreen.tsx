import React, { useCallback, useState, useMemo, useEffect, memo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import Icon from '@react-native-vector-icons/ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootState } from '../../../store';
import { setLoading } from '../../../store/uiSlice';
import {
  RootStackParamList,
  BottomTabParamList,
} from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { responsive, Colors, getThemeColors } from '../../../utils';
import { CONSTANTS } from '../../../constants';
import { useOptimizedSearch } from '../../../hooks/useOptimizedSearch';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../components/ToastManager';

import { Conversation } from '../types';
import ChatListItem from '../components/ChatListItem';

const MemoizedChatListItem = memo(ChatListItem);

const LoadingFooter: React.FC = memo(() => (
  <View style={styles.loadingFooter}>
    <LoadingSpinner size="small" text="Loading more..." />
  </View>
));

type ChatsScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type ChatsScreenRouteProp = RouteProp<BottomTabParamList, typeof ROUTES.CHATS>;

const ChatsScreen: React.FC = () => {
  const navigation = useNavigation<ChatsScreenNavigationProp>();
  const route = useRoute<ChatsScreenRouteProp>();
  const dispatch = useDispatch();

  const conversations = useSelector(
    (state: RootState) => state.chats.conversations,
  );
  const theme = useSelector((state: RootState) => state.ui.theme);

  // Memoize only expensive computations
  const isDark = theme === 'dark';
  const themeColors = useMemo(() => getThemeColors(isDark), [isDark]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const searchAnimation = useState(new Animated.Value(0))[0];

  // Reusable function to animate the search bar
  const animateSearch = useCallback(
    (visible: boolean, onComplete?: () => void) => {
      const toValue = visible ? 1 : 0;
      setIsSearchVisible(visible);

      Animated.timing(searchAnimation, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }).start(onComplete);
    },
    [searchAnimation],
  );

  // Handle navigation params for auto-opening search
  useEffect(() => {
    const params = route.params;
    if (params?.openSearch) {
      animateSearch(true, () => {
        // Set the initial search query if provided
        if (params.searchQuery) {
          setSearchQuery(params.searchQuery);
        } else if (!isLoading && searchQuery?.length > 0) {
          setSearchQuery('');
        }
      });
    }
  }, [route.params, animateSearch]);

  // Show loading on first time entering ChatsScreen
  useEffect(() => {
    if (isFirstLoad && conversations.length > 0) {
      dispatch(setLoading(true));

      // Simulate first-time loading
      const loadingTimeout = setTimeout(() => {
        dispatch(setLoading(false));
        setIsFirstLoad(false);
      }, CONSTANTS.CHAT.SEARCH_LOADING_DELAY);

      return () => {
        clearTimeout(loadingTimeout);
        dispatch(setLoading(false));
      };
    } else if (conversations.length === 0) {
      // Don't show loading if there are no conversations
      setIsFirstLoad(false);
    }
  }, [dispatch, isFirstLoad, conversations.length]);

  // Use optimized search hook with advanced features
  const searchResults = useOptimizedSearch(
    conversations,
    searchQuery,
    ['name', 'lastMessage'], // Search in both name and last message
    {
      debounceMs: 300,
      minSearchLength: 2,
      maxResults: 100,
      caseSensitive: false,
    },
  );

  const {
    results: filteredConversations,
    hasMore,
    totalMatches,
    isSearchActive,
    isLoading,
    searchQuery: debouncedSearchQuery,
  } = searchResults;

  const handleChatPress = useCallback((conversation: Conversation) => {
    navigation.navigate(ROUTES.CHAT_DETAIL, {
      conversationId: conversation.id,
      conversationName: conversation.name,
    });
  }, []);

  const toggleSearch = () => {
    const newVisibility = !isSearchVisible;

    animateSearch(newVisibility, () => {
      if (!newVisibility) {
        setSearchQuery('');
        dismissKeyboard();
      }
    });
  };

  const clearSearch = () => setSearchQuery('');

  // Dismiss keyboard when needed
  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await new Promise<void>(resolve =>
        setTimeout(resolve, CONSTANTS.CHAT.SEARCH_LOADING_DELAY),
      );

      // dispatch an action to refresh conversations here
      // dispatch(refreshConversations());

      // Show success feedback to user
      showSuccessToast('Refreshed', 'Conversations updated successfully');
    } catch (error) {
      console.error('Failed to refresh conversations:', error);
      showErrorToast(
        'Refresh Failed',
        'Unable to update conversations. Please check your connection and try again.',
      );
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Handle end reached for pagination/infinite scrolling
  const onEndReached = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (loadingMore || refreshing || isSearchActive) {
      return;
    }

    setLoadingMore(true);

    try {
      await new Promise<void>(resolve =>
        setTimeout(resolve, CONSTANTS.CHAT.LOAD_MORE_MESSAGES_DELAY),
      );

      // dispatch an action to load more conversations here
      // dispatch(loadMoreConversations());

    } catch (error) {
      showErrorToast(
        'Load More Failed',
        'Unable to load additional conversations. Please try again.',
      );
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, refreshing, isSearchActive]);

  // Memoized helper functions for FlatList performance
  const keyExtractor = useCallback((item: Conversation) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 80, // Approximate item height
      offset: 80 * index,
      index,
    }),
    [],
  );

  const renderChatItem = useCallback(
    ({ item }: { item: Conversation }) => (
      <MemoizedChatListItem
        conversation={item}
        onPress={() => handleChatPress(item)}
        searchQuery={debouncedSearchQuery}
      />
    ),
    [debouncedSearchQuery, handleChatPress],
  );

  // Memoized RefreshControl component
  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={[Colors.primary]}
        tintColor={Colors.primary}
        title="Pull to refresh"
        titleColor={themeColors.text.secondary}
        progressBackgroundColor={themeColors.surface}
      />
    ),
    [refreshing, onRefresh, themeColors],
  );

  // Memoize dynamic styles
  const dynamicStyles = useMemo(
    () => ({
      container: [
        styles.container,
        { backgroundColor: themeColors.background },
      ],
      header: [styles.header, { backgroundColor: themeColors.surface }],
      title: [styles.title, { color: themeColors.text.primary }],
      emptyState: [styles.emptyState, { color: themeColors.text.tertiary }],
      searchContainer: [
        styles.searchContainer,
        {
          paddingVertical: isSearchVisible ? responsive.padding.md : 0,
          backgroundColor: themeColors.surface,
          borderBottomColor: themeColors.border,
          height: searchAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 80],
          }),
          opacity: searchAnimation,
        },
      ],
      searchInput: [
        styles.searchInput,
        {
          backgroundColor: themeColors.card,
          borderColor: themeColors.border,
          color: themeColors.text.primary,
        },
      ],
    }),
    [themeColors, isSearchVisible, searchAnimation],
  );

  return (
    <SafeAreaView style={dynamicStyles.container} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header with Search Button */}
        <View style={dynamicStyles.header}>
          <View style={styles.headerContent}>
            <Text style={dynamicStyles.title}>Chats</Text>
            <TouchableOpacity style={styles.searchButton} onPress={toggleSearch}>
              <Icon
                name={isSearchVisible ? 'close' : 'search'}
                size={responsive.fontSize.lg}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

      {/* Animated Search Bar */}
      <Animated.View style={dynamicStyles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon
            name="search"
            size={responsive.fontSize.md}
            color={themeColors.text.tertiary}
            style={styles.searchIcon}
          />
          <TextInput
            style={dynamicStyles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={themeColors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={isSearchVisible}
            numberOfLines={1}
            maxLength={100} // Limit search query length
          />
          {isLoading && searchQuery.length >= 2 && (
            <Icon
              name="hourglass"
              size={responsive.fontSize.sm}
              color={themeColors.text.tertiary}
              style={styles.loadingIcon}
            />
          )}
          {searchQuery.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <Icon
                name="close-circle"
                size={responsive.fontSize.md}
                color={themeColors.text.tertiary}
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Search Results Counter */}
      {isSearchActive && (
        <View style={styles.searchResultsHeader}>
          <Text
            style={[
              styles.searchResultsText,
              { color: themeColors.text.secondary },
            ]}
          >
            {totalMatches} result{totalMatches !== 1 ? 's' : ''}
            {hasMore && ` (showing first ${filteredConversations.length})`}
          </Text>
        </View>
      )}

      {/* Results */}
      {filteredConversations.length === 0 ? (
        <View style={styles.emptyContainer}>
          {isSearchActive ? (
            <>
              <Icon
                name="search"
                size={responsive.fontSize.xxl * 2}
                color={themeColors.text.tertiary}
                style={styles.emptyIcon}
              />
              <Text style={dynamicStyles.emptyState}>
                No conversations found
              </Text>
              <Text style={dynamicStyles.emptyState}>
                Try a different search term
              </Text>
            </>
          ) : conversations.length === 0 ? (
            <>
              <Icon
                name="chatbubbles-outline"
                size={responsive.fontSize.xxl * 2}
                color={themeColors.text.tertiary}
                style={styles.emptyIcon}
              />
              <Text style={dynamicStyles.emptyState}>No conversations yet</Text>
              <Text style={dynamicStyles.emptyState}>
                Start chatting with someone!
              </Text>
            </>
          ) : null}
        </View>
      ) : (
        <FlatList
          data={filteredConversations}
          keyExtractor={keyExtractor}
          renderItem={renderChatItem}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={100}
          initialNumToRender={12}
          windowSize={8}
          getItemLayout={getItemLayout}
          disableVirtualization={false}
          legacyImplementation={false}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
          refreshControl={refreshControl}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          onScrollBeginDrag={dismissKeyboard}
          ListFooterComponent={loadingMore && !isSearchActive ? <LoadingFooter /> : null}
        />
      )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: responsive.padding.md,
    paddingTop: responsive.padding.md,
    paddingBottom: responsive.padding.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: responsive.fontSize.xl,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: responsive.padding.xs,
    borderRadius: responsive.padding.sm,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive.padding.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: responsive.padding.md,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: responsive.padding.md,
    minHeight: responsive.height.input,
  },
  searchIcon: {
    marginRight: responsive.margin.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: responsive.fontSize.md,
    paddingVertical: responsive.padding.sm,
    paddingHorizontal: 0,
  },
  loadingIcon: {
    marginHorizontal: responsive.margin.xs,
  },
  clearButton: {
    padding: responsive.padding.xs,
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsive.padding.lg,
  },
  searchResultsHeader: {
    paddingHorizontal: responsive.padding.md,
    paddingVertical: responsive.padding.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  searchResultsText: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
  },
  emptyIcon: {
    marginBottom: responsive.margin.md,
    opacity: 0.5,
  },
  emptyState: {
    fontSize: responsive.fontSize.md,
    textAlign: 'center',
    marginBottom: responsive.margin.xs,
  },
  loadingFooter: {
    paddingVertical: responsive.padding.lg,
    paddingHorizontal: responsive.padding.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Memoize the entire component to prevent unnecessary re-renders
export default React.memo(ChatsScreen);
