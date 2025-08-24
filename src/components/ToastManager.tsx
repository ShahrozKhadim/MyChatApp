import React from 'react';

import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

import { Colors, truncateText } from '../utils';
import { CONSTANTS } from '../constants';

/**
 * ToastManager - Centralized toast notification component
 *
 * This component provides a consistent toast notification system
 * across the entire application with custom styling and configurations.
 */

// Custom toast configurations
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.success,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
        marginTop: 2,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: Colors.accent,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
        marginTop: 2,
      }}
    />
  ),
  /*
    Overwrite 'info' type,
    by modifying the existing `InfoToast` component
  */
  info: (props: any) => (
    <InfoToast
      {...props}
      style={{
        borderLeftColor: Colors.primary,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        color: '#666',
        marginTop: 2,
      }}
    />
  ),
};

/**
 * ToastManager Component
 *
 * Provides the Toast component with custom styling and configurations.
 * Should be placed at the root level of the app to ensure toasts appear above all content.
 */
const ToastManager: React.FC = () => {
  return <Toast config={toastConfig} />;
};

export default ToastManager;

/**
 * Utility functions for showing different types of toasts
 * Import these functions to show toasts from anywhere in the app
 */

export const showSuccessToast = (title: string, message?: string) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: CONSTANTS.TOAST.SUCCESS_DURATION,
    autoHide: true,
    topOffset: CONSTANTS.TOAST.TOP_OFFSET,
  });
};

export const showErrorToast = (title: string, message?: string) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: CONSTANTS.TOAST.ERROR_DURATION,
    autoHide: true,
    topOffset: CONSTANTS.TOAST.TOP_OFFSET,
  });
};

export const showInfoToast = (title: string, message?: string) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: CONSTANTS.TOAST.INFO_DURATION,
    autoHide: true,
    topOffset: CONSTANTS.TOAST.TOP_OFFSET,
  });
};

export const showMessageToast = (senderName: string, messageText: string) => {
  Toast.show({
    type: 'info',
    text1: senderName,
    text2: truncateText(messageText, CONSTANTS.CHAT.MAX_MESSAGE_PREVIEW_LENGTH),
    position: 'top',
    visibilityTime: CONSTANTS.TOAST.MESSAGE_DURATION,
    autoHide: true,
    topOffset: CONSTANTS.TOAST.TOP_OFFSET,
  });
};
