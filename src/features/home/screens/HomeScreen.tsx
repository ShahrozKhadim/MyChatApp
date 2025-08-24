import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Icon from '@react-native-vector-icons/ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootState } from '../../../store';
import { toggleTheme } from '../../../store/uiSlice';
import { RootStackParamList } from '../../../navigation/types';
import { ROUTES } from '../../../navigation/routes';
import { getGreeting, responsive, Colors, getThemeColors } from '../../../utils';

import QuickStatsCard from '../components/QuickStatsCard';
import RecentConversationCard from '../components/RecentConversationCard';
import QuickActionButton from '../components/QuickActionButton';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();

  const profile = useSelector((state: RootState) => state.profile);
  const conversations = useSelector((state: RootState) => state.chats.conversations);
  const theme = useSelector((state: RootState) => state.ui.theme);

  // Memoize theme-related calculations
  const isDark = theme === 'dark';
  const themeColors = useMemo(() => getThemeColors(isDark), [isDark]);

  // Calculate quick stats
  const unreadCount = conversations.filter(c => c.typing || Math.random() > 0.7).length; // Simulated unread
  const favoriteCount = conversations.filter(c => c.isFavorite).length;
  const onlineCount = conversations.filter(c => c.online).length;

  // Get recent conversations (last 3)
  const recentConversations = conversations.slice(0, 3);

  const handleChatPress = (conversation: any) => {
    navigation.navigate(ROUTES.CHAT_DETAIL, {
      conversationId: conversation.id,
      conversationName: conversation.name,
    });
  };

  const handleNewChat = () => {
    Alert.alert(
      'New Chat',
      'This feature will allow you to start a new conversation.',
      [{ text: 'OK' }]
    );
  };

  const handleViewAllChats = () => {
    // Navigate to Chats tab
    navigation.navigate(ROUTES.MAIN, { screen: ROUTES.CHATS });
  };

  const handleSearch = (searchQuery?: string) => {
    // Navigate to Chats tab and auto-open search
    navigation.navigate(ROUTES.MAIN, {
      screen: ROUTES.CHATS,
      params: {
        openSearch: true,
      }
    });
  };

  // Memoize dynamic styles
  const dynamicStyles = useMemo(() => ({
    container: [styles.container, { backgroundColor: themeColors.background }],
    header: [styles.header, { backgroundColor: themeColors.background }],
    welcome: [styles.welcome, { color: themeColors.text.primary }],
    greeting: [styles.greeting, { color: themeColors.text.tertiary }],
    sectionTitle: [styles.sectionTitle, { color: themeColors.text.primary }],
  }), [themeColors]);

  return (
    <SafeAreaView style={dynamicStyles.container} edges={['top']}>
      <View style={dynamicStyles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={dynamicStyles.welcome}>Welcome back!</Text>
            <Text style={dynamicStyles.greeting}>
              {getGreeting()}, {profile.name}
            </Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              onPress={() => dispatch(toggleTheme())}
              style={styles.themeButton}
            >
              <Icon
                name={isDark ? 'sunny' : 'moon'}
                size={responsive.fontSize.lg}
                color={isDark ? '#ffffff' : '#000000'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>Overview</Text>
          <View style={styles.statsContainer}>
            <QuickStatsCard
              title="Unread"
              value={unreadCount}
              icon="mail-unread"
              color={Colors.accent}
            />
            <QuickStatsCard
              title="Favorites"
              value={favoriteCount}
              icon="heart"
              color={Colors.accent}
            />
            <QuickStatsCard
              title="Online"
              value={onlineCount}
              icon="radio-button-on"
              color={Colors.success}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <QuickActionButton
              title="New Chat"
              icon="add-circle"
              color="#007AFF"
              onPress={handleNewChat}
            />
            <QuickActionButton
              title="Search"
              icon="search"
              color="#FF9500"
              onPress={handleSearch}
            />
            <QuickActionButton
              title="All Chats"
              icon="chatbubbles"
              color="#32D74B"
              onPress={handleViewAllChats}
            />
          </View>
        </View>

        {/* Recent Conversations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={dynamicStyles.sectionTitle}>Recent Conversations</Text>
            <TouchableOpacity onPress={handleViewAllChats}>
              <Text style={[styles.seeAllText, { color: Colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentConversations.map((conversation) => (
            <RecentConversationCard
              key={conversation.id}
              conversation={conversation}
              onPress={() => handleChatPress(conversation)}
            />
          ))}

          {recentConversations.length === 0 && (
            <View style={styles.emptyState}>
              <Icon
                name="chatbubbles-outline"
                size={responsive.fontSize.xxl * 2}
                color={isDark ? '#333333' : '#e0e0e0'}
              />
              <Text style={[styles.emptyText, { color: themeColors.text.tertiary }]}>
                No recent conversations
              </Text>
              <Text style={[styles.emptySubtext, { color: themeColors.text.tertiary }]}>
                Start chatting to see them here!
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: responsive.padding.md,
    paddingTop: responsive.padding.md,
    paddingBottom: responsive.padding.sm,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcome: {
    fontSize: responsive.fontSize.xl,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: responsive.fontSize.md,
    marginTop: responsive.margin.xs / 2,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeButton: {
    padding: responsive.padding.sm,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: responsive.padding.md,
    marginBottom: responsive.margin.xl,
  },
  sectionTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '700',
    marginBottom: responsive.margin.lg,
    letterSpacing: 0.3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.margin.md,
  },
  seeAllText: {
    color: '#007AFF',
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: -responsive.margin.xs,
    marginBottom: responsive.margin.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginHorizontal: -responsive.margin.xs,
    marginBottom: responsive.margin.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: responsive.padding.xl,
  },
  emptyText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
    marginTop: responsive.margin.md,
  },
  emptySubtext: {
    fontSize: responsive.fontSize.sm,
    marginTop: responsive.margin.xs,
    textAlign: 'center',
  },
  bottomPadding: {
    height: responsive.padding.xl,
  },
});

export default HomeScreen;
