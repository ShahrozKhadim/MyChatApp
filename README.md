# MyChatApp 💬

A modern, feature-rich React Native chat application built with professional architecture, advanced UI/UX patterns, and industry best practices. Features real-time messaging simulation, advanced search capabilities, toast notifications, pull-to-refresh, infinite scrolling, and comprehensive keyboard handling.

## 🏗️ Architecture

This app follows a **feature-based architecture** for scalability and maintainability:

```
src/
 ├── features/
 │    ├── home/
 │    │    ├── components/       (QuickStatsCard.tsx, RecentConversationCard.tsx, QuickActionButton.tsx)
 │    │    ├── screens/          (HomeScreen.tsx with theme toggle & test features)
 │    │    └── types.ts
 │    ├── chats/
 │    │    ├── components/       (ChatBubble.tsx, ChatListItem.tsx with highlighting)
 │    │    ├── screens/          (ChatsScreen.tsx, ChatDetailScreen.tsx with advanced features)
 │    │    ├── data/             (sampleConversations.ts with realistic chat data)
 │    │    ├── chatSlice.ts      (Redux slice with toast notifications)
 │    │    └── types.ts
 │    ├── profile/
 │    │    ├── components/       (ProfileOption.tsx, InfoRow.tsx)
 │    │    ├── screens/          (ProfileScreen.tsx)
 │    │    ├── profileSlice.ts
 │    │    └── types.ts
 │    └── settings/
 │         ├── components/       (SettingsOption.tsx, SettingsSection.tsx, etc.)
 │         ├── screens/          (SettingsScreen.tsx)
 │         ├── settingsSlice.ts
 │         └── types.ts
 ├── navigation/
 │    ├── BottomTabs.tsx         (React Navigation with theme-aware styling)
 │    ├── RootNavigator.tsx      (Stack navigation with proper StatusBar)
 │    ├── routes.ts              (Centralized route constants)
 │    └── types.ts
 ├── store/
 │    ├── index.ts               (Redux Toolkit + redux-persist configuration)
 │    ├── rootReducer.ts         (Combined reducers)
 │    ├── uiSlice.ts             (UI state management)
 │    └── types.ts
 ├── utils/
 │    ├── responsive.ts          (Screen size responsive helpers)
 │    ├── colors.ts              (Professional color system with theme support)
 │    ├── shadows.ts             (Elevation and shadow utilities)
 │    ├── typography.ts          (Typography scale and font weights)
 │    ├── helpers.ts             (Utility functions and data helpers)
 │    └── index.ts               (Centralized exports)
 ├── constants/
 │    ├── app.ts                 (Application constants and configuration)
 │    └── index.ts               (Centralized constant exports)
 ├── hooks/
 │    ├── useDebounce.ts         (Custom debounce hook)
 │    └── useOptimizedSearch.ts  (Advanced search with performance optimization)
 ├── components/
 │    ├── LoadingSpinner.tsx     (Theme-aware loading component)
 │    ├── HighlightedText.tsx    (Search result highlighting with performance optimization)
 │    ├── ToastManager.tsx       (Centralized toast notification system)
 │    ├── FastImage.tsx          (Optimized image component wrapper)
 │    └── TypingIndicator.tsx    (Animated typing indicator)
 └── App.tsx                     (Root component with StatusBar management)
```

## 📊 Data Structure (Redux State Shape)

```typescript
type RootState = {
  chats: ChatsState;      // Conversations and messages
  profile: ProfileState;   // User profile information
  settings: SettingsState; // App settings (notifications, language)
  ui: UIState;            // UI state (theme, loading, errors)
};
```

### Message & Conversation Types

```typescript
type Message = {
  id: string;
  sender: "me" | "other";
  text: string;
  timestamp: number;
};

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  isFavorite: boolean;
  lastMessage: string;
  updatedAt: number;
  typing?: boolean;
  online?: boolean;
  messages: Message[];
};
```

## 🛠️ Tech Stack

- **React Native 0.81** - Latest stable version with Fabric renderer
- **Redux Toolkit** - Modern state management with RTK Query ready
- **redux-persist + AsyncStorage** - Persistent storage with automatic rehydration
- **React Navigation 6** - Stack and tab navigation with theme integration
- **react-native-toast-message** - Professional toast notification system
- **react-native-responsive-screen** - Responsive design utilities
- **@react-native-vector-icons/ionicons** - Modern icon system with tree-shaking
- **react-native-safe-area-context** - Safe area handling for all devices
- **react-native-fast-image** - Optimized image loading and caching
- **TypeScript** - Full type safety with strict configuration
- **Professional Code Organization** - Import sorting, circular dependency prevention

## ✨ Features

### 🏠 Home Dashboard
- **Welcome screen** with personalized greeting
- **Quick stats** showing unread messages, favorites, and online contacts
- **Recent conversations** with quick access to last 3 chats
- **Quick actions** for new chat, search, and navigation
- **Theme toggle** directly from home screen

### 📱 Advanced Chat Features
- **Real-time messaging simulation** with chat bubbles and auto-responses
- **Advanced search system** with debounced input and optimized performance
- **Animated search bar** with smooth slide transitions
- **Intelligent text highlighting** in search results with performance optimization
- **Pull-to-refresh** with native refresh control and success feedback
- **Infinite scrolling** with automatic pagination and loading indicators
- **Smart keyboard handling** - UI pushes up properly, dismisses on scroll
- **Conversation management** with favorites, online status, and typing indicators
- **Toast notifications** for new messages with customizable styling
- **Message timestamps** with smart relative formatting
- **Search result counters** showing total matches and pagination info
- **Performance optimized lists** with virtualization and memoization

### 🎨 Advanced UI/UX Features
- **Professional Design System** with consistent colors, shadows, and typography
- **Dynamic theme system** with proper StatusBar handling across platforms
- **Platform-specific optimizations** - iOS padding vs Android height behavior
- **Responsive design utilities** with screen size adaptations
- **Advanced animation system** - search bar slides, loading states, toast transitions
- **Toast notification system** with success/error/info variants and custom styling
- **Smart keyboard management** - KeyboardAvoidingView with platform-specific behavior
- **Performance optimizations** - memoized components, virtualized lists, debounced search
- **Professional loading states** with spinners and skeleton screens
- **Elevation and shadow system** with consistent depth hierarchy
- **Accessible design patterns** with proper touch targets and screen reader support
- **Modern card-based layouts** with clean visual hierarchy and spacing
- **Smooth micro-interactions** throughout the user journey

### ⚙️ Settings & Profile
- **Profile management** with avatar, email, phone
- **Notification preferences**
- **Language settings** (framework ready)
- **Data export/clear** options
- **Theme persistence** across app restarts

## 🚀 Getting Started

### Prerequisites

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions.

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```
   ```bash
   npm install --legacy-peer-deps
   ```
   > **Note**: We use `--legacy-peer-deps` to resolve installation conflicts with `react-native-fast-image`.
   > This ensures compatibility with React Native 0.81 and prevents peer dependency errors.


3. **iOS Setup:**
   ```bash
   bundle install
   bundle exec pod install
   ```

4. **Start Metro bundler:**
   ```bash
   npm start
   ```

5. **Run the app:**
   ```bash
   # iOS
   npm run ios

   # Android
   npm run android
   ```

## 🔧 Development

### Adding New Features

1. **Create feature directory** in `src/features/`
2. **Add Redux slice** with actions and reducers
3. **Create components and screens**
4. **Add navigation routes** if needed
5. **Update root reducer** to include new slice

### State Management

- **Persistent state**: `chats`, `profile`, `settings`
- **Session state**: `ui` (theme, loading, errors)
- **Actions**: All state changes through Redux actions
- **Selectors**: Use `useSelector` for accessing state

### Responsive Design

Use the responsive utilities from `src/utils/responsive.ts`:

```typescript
import { responsive } from '../utils/responsive';

const styles = StyleSheet.create({
  container: {
    padding: responsive.padding.md,
    fontSize: responsive.fontSize.lg,
  },
});
```

## 📦 Key Dependencies

```json
{
  "@reduxjs/toolkit": "^1.9.x",
  "react-redux": "^8.1.x",
  "redux-persist": "^6.0.x",
  "@react-navigation/native": "^6.1.x",
  "@react-navigation/bottom-tabs": "^6.5.x",
  "@react-navigation/stack": "^6.3.x",
  "react-native-responsive-screen": "^1.4.x",
  "@react-native-vector-icons/ionicons": "^10.0.x",
  "react-native-toast-message": "^2.1.x",
  "react-native-safe-area-context": "^4.7.x",
  "react-native-fast-image": "^8.6.x",
  "@react-native-async-storage/async-storage": "^1.19.x"
}
```

## 🎯 Architecture Benefits

- **Scalability**: Feature-based architecture allows easy expansion without code conflicts
- **Maintainability**: Professional import organization, circular dependency prevention
- **Performance**: Memoized components, virtualized lists, debounced search, optimized re-renders
- **User Experience**: Native platform behaviors, smooth animations, smart keyboard handling
- **Code Quality**: Consistent import sorting, centralized constants, reusable utilities
- **Type Safety**: Full TypeScript coverage with strict configuration
- **Persistence**: Redux-persist with AsyncStorage for seamless app state restoration
- **Modern Patterns**: Custom hooks, advanced search, toast notifications, pull-to-refresh

## 📱 App Structure & Key Features

### 🏠 Home Dashboard
- **Personalized welcome** with dynamic greetings
- **Quick statistics** showing unread messages, favorites, and online contacts
- **Recent conversations** with quick access to last 3 active chats
- **Theme toggle** with instant visual feedback
- **Quick action buttons** for common tasks

### 💬 Chat System
- **Advanced conversation list** with search, pull-to-refresh, infinite scrolling
- **Real-time messaging simulation** with auto-responses and typing indicators
- **Smart search** with debounced input and result highlighting
- **Individual chat screens** with optimized message rendering
- **Toast notifications** for incoming messages with smart context awareness

### 👤 Profile & Settings
- **Comprehensive profile management** with avatar, contact information
- **Settings screen** with notification preferences and theme controls
- **Data management** options for export and clearing

## 🔮 Future Enhancements

- **Real-time messaging** with WebSocket integration
- **Push notifications** with Firebase Cloud Messaging
- **Media sharing** - images, files, voice messages
- **Group conversations** with admin controls
- **Advanced message features** - reactions, replies, forwarding
- **End-to-end encryption** for secure messaging
- **Message persistence** with cloud synchronization
- **Video calling** integration
- **Message search** across all conversations
- **Dark mode scheduling** and automatic theme switching

## 🏆 Technical Highlights

### 🎯 Performance Optimizations
- **Virtualized lists** with `getItemLayout` for fixed-height items
- **Memoized components** preventing unnecessary re-renders
- **Debounced search** with `useOptimizedSearch` custom hook
- **Smart pagination** with `onEndReached` infinite scrolling
- **Optimized image loading** with `react-native-fast-image`

### 🎨 Advanced UI Patterns
- **KeyboardAvoidingView** with platform-specific behavior
- **Animated search bar** with smooth slide transitions
- **Pull-to-refresh** with native `RefreshControl`
- **Toast notifications** with custom styling and positioning
- **Theme-aware StatusBar** with proper platform handling

### 🏗️ Code Architecture
- **Import sorting** following industry standards (React → Third-party → Internal → Local)
- **Circular dependency prevention** with direct component imports
- **Centralized constants** and utility functions
- **Feature-based organization** with clear separation of concerns
- **TypeScript strict mode** with comprehensive type coverage

## 📊 Project Summary

**MyChatApp** is a comprehensive React Native chat application that demonstrates advanced mobile development skills and modern architectural patterns. Built with professional-grade code organization, performance optimizations, and user experience enhancements.

### ✨ Key Achievements
- **🏗️ Professional Architecture** - Feature-based organization with clean separation of concerns
- **⚡ Performance Excellence** - Virtualized lists, memoization, debounced search, optimized rendering
- **🎨 Advanced UI/UX** - Theme system, animations, keyboard handling, toast notifications
- **📱 Platform Optimization** - iOS/Android specific behaviors, native patterns
- **🔧 Code Quality** - TypeScript strict mode, import organization, circular dependency prevention
- **🚀 Modern Patterns** - Custom hooks, Redux Toolkit, pull-to-refresh, infinite scrolling

### 🎯 Technical Skills Demonstrated
- Advanced React Native development with latest patterns
- Redux Toolkit for scalable state management
- Performance optimization techniques
- Professional UI/UX implementation
- Cross-platform mobile development
- TypeScript for type-safe development
- Modern development practices and code organization

---

**Built with ❤️ using React Native and industry best practices.**

## 📋 Original React Native Instructions

This project was bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Troubleshooting

If you're having issues, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

### Learn More

- [React Native Website](https://reactnative.dev) - learn more about React Native
- [Getting Started](https://reactnative.dev/docs/environment-setup) - overview of React Native and environment setup
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - guided tour of React Native basics
- [Blog](https://reactnative.dev/blog) - latest official React Native blog posts
