/**
 * Application-wide constants
 * 
 * This file contains all the constants used throughout the application
 * to maintain consistency and make it easy to update values in one place.
 */

// ===== CHAT CONSTANTS =====
export const CHAT_CONSTANTS = {
  // Pagination
  MESSAGES_PER_PAGE: 20,
  
  // Message limits
  MAX_MESSAGE_LENGTH: 1000,
  MAX_MESSAGE_PREVIEW_LENGTH: 50,
  MAX_HIGHLIGHT_TEXT_LENGTH: 200,
  MAX_HIGHLIGHTS_PER_TEXT: 5,
  
  // Minimum search term length
  MIN_SEARCH_TERM_LENGTH: 2,
  
  // Auto-response delay (in milliseconds)
  AUTO_RESPONSE_DELAY: 2000,
  
  // Loading delays (in milliseconds)
  INITIAL_LOADING_DELAY: 2500,
  LOAD_MORE_MESSAGES_DELAY: 500,
  SCROLL_TO_BOTTOM_DELAY: 200,
  SEARCH_LOADING_DELAY: 1500,
  
  // Scroll threshold
  AUTO_SCROLL_THRESHOLD: 50,
} as const;

// ===== TOAST CONSTANTS =====
export const TOAST_CONSTANTS = {
  // Visibility durations (in milliseconds)
  SUCCESS_DURATION: 4000,
  ERROR_DURATION: 5000,
  INFO_DURATION: 4000,
  MESSAGE_DURATION: 4000,
  
  // Position offset from top
  TOP_OFFSET: 60,
} as const;

// ===== ANIMATION CONSTANTS =====
export const ANIMATION_CONSTANTS = {
  // Typing indicator animation
  TYPING_DOT_DURATION: 500,
  TYPING_DOT_DELAY: 200,
  
  // General animation durations
  FAST_ANIMATION: 200,
  MEDIUM_ANIMATION: 300,
  SLOW_ANIMATION: 500,
} as const;

// ===== TIME CONSTANTS =====
export const TIME_CONSTANTS = {
  // Time offsets for sample data (in milliseconds)
  MINUTES_5: 5 * 60 * 1000,
  MINUTES_30: 30 * 60 * 1000,
  HOUR_1: 60 * 60 * 1000,
  HOURS_2: 2 * 60 * 60 * 1000,
  HOURS_3: 3 * 60 * 60 * 1000,
  HOURS_4: 4 * 60 * 60 * 1000,
  HOURS_5: 5 * 60 * 60 * 1000,
  HOURS_6: 6 * 60 * 60 * 1000,
  HOURS_7: 7 * 60 * 60 * 1000,
  HOURS_8: 8 * 60 * 60 * 1000,
  HOURS_9: 9 * 60 * 60 * 1000,
  HOURS_10: 10 * 60 * 60 * 1000,
  HOURS_11: 11 * 60 * 60 * 1000,
  HOURS_12: 12 * 60 * 60 * 1000,
  HOURS_13: 13 * 60 * 60 * 1000,
  HOURS_14: 14 * 60 * 60 * 1000,
} as const;

// ===== UI CONSTANTS =====
export const UI_CONSTANTS = {
  // Border radius
  BORDER_RADIUS_SM: 8,
  BORDER_RADIUS_MD: 12,
  BORDER_RADIUS_LG: 16,
  
  // Shadow opacity
  SHADOW_OPACITY_LIGHT: 0.1,
  SHADOW_OPACITY_MEDIUM: 0.2,
  SHADOW_OPACITY_DARK: 0.3,
  
  // Overlay opacity
  OVERLAY_OPACITY_LIGHT: 0.4,
  OVERLAY_OPACITY_DARK: 0.6,
  
  // Avatar/image sizes
  AVATAR_SIZE_SM: 40,
  AVATAR_SIZE_MD: 50,
  AVATAR_SIZE_LG: 60,
  
  // Image dimensions for sample data
  SAMPLE_AVATAR_SIZE: 150,
} as const;

// ===== SAMPLE DATA CONSTANTS =====
export const SAMPLE_DATA = {
  // Auto-response messages
  AUTO_RESPONSES: [
    'That sounds great!',
    'I agree with you.',
    'Thanks for sharing!',
    'Interesting perspective.',
    'Let me think about that.',
    'Good point!',
  ],
  
  // Sample avatar URLs (for development/demo purposes)
  AVATAR_URLS: [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1645990754769-66f8fb8f9618?q=80&w=1364&auto=format&fit=cropx',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1688588343159-c0694f3ed81f?q=80&w=1227&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1488508872907-592763824245?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  ],
} as const;

// ===== APP METADATA =====
export const APP_METADATA = {
  NAME: 'MyChatApp',
  VERSION: '1.0.0',
  DESCRIPTION: 'A modern React Native chat application',
} as const;

// ===== VALIDATION CONSTANTS =====
export const VALIDATION = {
  // Text input validation
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_MESSAGE_LENGTH: 1,
  
  // Profile validation
  MIN_BIO_LENGTH: 0,
  MAX_BIO_LENGTH: 160,
} as const;

// Export all constants as a single object for convenience
export const CONSTANTS = {
  CHAT: CHAT_CONSTANTS,
  TOAST: TOAST_CONSTANTS,
  ANIMATION: ANIMATION_CONSTANTS,
  TIME: TIME_CONSTANTS,
  UI: UI_CONSTANTS,
  SAMPLE_DATA,
  APP_METADATA,
  VALIDATION,
} as const;
