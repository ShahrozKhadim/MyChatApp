/**
 * Common utility functions and helpers
 *
 */

import { CONSTANTS } from '../constants';

// ===== TIME & DATE UTILITIES =====

/**
 * Format timestamp to readable time string
 */
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - timestamp;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Less than 1 minute
  if (diffMins < 1) {
    return 'Just now';
  }

  // Less than 1 hour
  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }

  // Less than 24 hours
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  // Less than 7 days
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  // More than 7 days, show date
  return date.toLocaleDateString();
};

/**
 * Format timestamp for chat messages (shows time for recent, date for older)
 */
export const formatMessageTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isYesterday) {
    return 'Yesterday';
  }

  return date.toLocaleDateString();
};

/**
 * Get greeting based on time of day
 */
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

// ===== STRING UTILITIES =====

/**
 * Truncate text to a specified length with ellipsis
 */
export const truncateText = (text: string, maxLength: number = CONSTANTS.CHAT.MAX_MESSAGE_PREVIEW_LENGTH): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Escape special regex characters in a string
 */
export const escapeRegex = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};


/**
 * Generate a simple unique ID (for development purposes)
 * In production, we will be using a more robust UUID library
 */
export const generateId = (prefix: string = ''): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
};

// ===== VALIDATION UTILITIES =====

/**
 * Validate message text
 */
export const isValidMessage = (text: string): boolean => {
  return text.trim().length >= CONSTANTS.VALIDATION.MIN_MESSAGE_LENGTH &&
         text.trim().length <= CONSTANTS.CHAT.MAX_MESSAGE_LENGTH;
};

/**
 * Validate search term
 */
export const isValidSearchTerm = (term: string): boolean => {
  return term.trim().length >= CONSTANTS.CHAT.MIN_SEARCH_TERM_LENGTH;
};


// ===== ARRAY UTILITIES =====

/**
 * Get random item from an array
 */
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};


/**
 * Remove duplicates from an array
 */
export const removeDuplicates = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

// ===== CHAT-SPECIFIC UTILITIES =====

/**
 * Generate auto-response message
 */
export const generateAutoResponse = (): string => {
  return getRandomItem([...CONSTANTS.SAMPLE_DATA.AUTO_RESPONSES]);
};

/**
 * Get random avatar URL (for development/demo)
 */
export const getRandomAvatar = (): string => {
  return getRandomItem([...CONSTANTS.SAMPLE_DATA.AVATAR_URLS]);
};

/**
 * Create a message object with proper structure
 */
export const createMessage = (sender: 'me' | 'other', text: string): { sender: 'me' | 'other'; text: string; timestamp: number } => ({
  sender,
  text: text.trim(),
  timestamp: Date.now(),
});

/**
 * Sort conversations by last message time (most recent first)
 */
export const sortConversationsByTime = <T extends { updatedAt: number }>(conversations: T[]): T[] => {
  return [...conversations].sort((a, b) => b.updatedAt - a.updatedAt);
};

/**
 * Filter conversations by search term
 */
export const filterConversations = <T extends { name: string; lastMessage: string }>(
  conversations: T[],
  searchTerm: string
): T[] => {
  if (!isValidSearchTerm(searchTerm)) return conversations;

  const lowercaseSearch = searchTerm.toLowerCase();
  return conversations.filter(conv =>
    conv.name.toLowerCase().includes(lowercaseSearch) ||
    conv.lastMessage.toLowerCase().includes(lowercaseSearch)
  );
};

// ===== ASYNC UTILITIES =====

/**
 * Create a delay/timeout promise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// ===== ERROR HANDLING UTILITIES =====

/**
 * Safe JSON parse with fallback
 */
export const safeJsonParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
};

/**
 * Get error message from various error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};

// ===== DEVELOPMENT UTILITIES =====

/**
 * Log function for development (can be easily disabled in production)
 */
export const devLog = (...args: any[]): void => {
  if (__DEV__) {
    console.log('[DevLog]', ...args);
  }
};

// ===== TYPE GUARDS =====

/**
 * Check if the value is not null or undefined
 */
export const isNotNullish = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Check if the string is not empty
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Check if array has items
 */
export const hasItems = <T>(array: T[]): boolean => {
  return Array.isArray(array) && array.length > 0;
};
