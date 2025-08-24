/**
 * Sample conversation data for development and testing
 *
 * This file contains mock data to populate the chat application
 * during development. In production, this would be replaced
 * with data from backend API.
 */

import { Conversation } from '../types';
import { CONSTANTS } from '../../../constants';
import { getRandomAvatar } from '../../../utils';

export const sampleConversations: Conversation[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: getRandomAvatar(),
    isFavorite: true,
    lastMessage: 'Hey there! How are you doing?',
    updatedAt: Date.now() - CONSTANTS.TIME.MINUTES_5,
    online: true,
    messages: [
      {
        id: 'm1',
        sender: 'other',
        text: 'Hey there! How are you doing?',
        timestamp: Date.now() - CONSTANTS.TIME.MINUTES_5,
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'Hi John! I\'m doing great, thanks for asking. How about you?',
        timestamp: Date.now() - (CONSTANTS.TIME.MINUTES_5 - 60000),
      },
    ],
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    avatar: getRandomAvatar(),
    isFavorite: false,
    lastMessage: 'See you tomorrow!',
    updatedAt: Date.now() - CONSTANTS.TIME.HOUR_1,
    online: false,
    messages: [
      {
        id: 'm3',
        sender: 'other',
        text: 'Are we still on for lunch tomorrow?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOUR_1 + 100000),
      },
      {
        id: 'm4',
        sender: 'me',
        text: 'Absolutely! Looking forward to it.',
        timestamp: Date.now() - (CONSTANTS.TIME.HOUR_1 + 50000),
      },
      {
        id: 'm5',
        sender: 'other',
        text: 'See you tomorrow!',
        timestamp: Date.now() - CONSTANTS.TIME.HOUR_1,
      },
    ],
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: getRandomAvatar(),
    isFavorite: true,
    lastMessage: 'Thanks for your help!',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_2,
    online: true,
    typing: true, // Set to true for testing typing indicator
    messages: [
      {
        id: 'm6',
        sender: 'other',
        text: 'Can you help me with the project?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_2 + 100000),
      },
      {
        id: 'm7',
        sender: 'me',
        text: 'Of course! What do you need help with?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_2 + 50000),
      },
      {
        id: 'm8',
        sender: 'other',
        text: 'Thanks for your help!',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_2,
      },
    ],
  },
  {
    id: '4',
    name: 'Nathaniel Cunningham-Jones',
    avatar: getRandomAvatar(),
    isFavorite: false,
    lastMessage: 'Perfect! Let me know if you need anything else.',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_3,
    online: true,
    typing: false,
    messages: [
      {
        id: 'm9',
        sender: 'me',
        text: 'Hi Emma! Can you review the design mockups?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_3 + 200000),
      },
      {
        id: 'm10',
        sender: 'other',
        text: 'Sure! I\'ll take a look and get back to you.',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_3 + 100000),
      },
      {
        id: 'm11',
        sender: 'other',
        text: 'Perfect! Let me know if you need anything else.',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_3,
      },
    ],
  },
  {
    id: '5',
    name: 'Alex Chen',
    avatar: getRandomAvatar(),
    isFavorite: true,
    lastMessage: 'The meeting is at 3 PM tomorrow',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_4,
    online: false,
    typing: true,
    messages: [
      {
        id: 'm12',
        sender: 'other',
        text: 'Hey! Don\'t forget about our team meeting tomorrow.',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_4 + 100000),
      },
      {
        id: 'm13',
        sender: 'me',
        text: 'Thanks for the reminder! What time again?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_4 + 50000),
      },
      {
        id: 'm14',
        sender: 'other',
        text: 'The meeting is at 3 PM tomorrow',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_4,
      },
    ],
  },
  {
    id: '6',
    name: 'Lisa Rodriguez',
    avatar: getRandomAvatar(),
    isFavorite: false,
    lastMessage: 'Sounds good to me! 👍',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_5,
    online: true,
    typing: false,
    messages: [
      {
        id: 'm15',
        sender: 'me',
        text: 'Want to grab coffee this weekend?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_5 + 200000),
      },
      {
        id: 'm16',
        sender: 'other',
        text: 'That sounds great! Saturday morning?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_5 + 100000),
      },
      {
        id: 'm17',
        sender: 'me',
        text: 'Perfect! 10 AM at the usual place?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_5 + 50000),
      },
      {
        id: 'm18',
        sender: 'other',
        text: 'Sounds good to me! 👍',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_5,
      },
    ],
  },
  {
    id: '7',
    name: 'David Kim',
    avatar: getRandomAvatar(),
    isFavorite: false,
    lastMessage: 'I\'ll send you the files shortly',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_6,
    online: false,
    typing: false,
    messages: [
      {
        id: 'm19',
        sender: 'other',
        text: 'Can you send me the project files?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_6 + 200000),
      },
      {
        id: 'm20',
        sender: 'me',
        text: 'Which ones specifically?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_6 + 100000),
      },
      {
        id: 'm21',
        sender: 'other',
        text: 'The design assets and documentation',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_6 + 50000),
      },
      {
        id: 'm22',
        sender: 'me',
        text: 'I\'ll send you the files shortly',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_6,
      },
    ],
  },
  {
    id: '8',
    name: 'Rachel Green',
    avatar: getRandomAvatar(),
    isFavorite: true,
    lastMessage: 'Can\'t wait to see everyone! 🎉',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_7,
    online: true,
    typing: true,
    messages: [
      {
        id: 'm23',
        sender: 'other',
        text: 'Are you coming to the party this Friday?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_7 + 200000),
      },
      {
        id: 'm24',
        sender: 'me',
        text: 'Absolutely! Wouldn\'t miss it.',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_7 + 100000),
      },
      {
        id: 'm25',
        sender: 'other',
        text: 'Can\'t wait to see everyone! 🎉',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_7,
      },
    ],
  },
  {
    id: '9',
    name: 'Elizabeth Montgomery Davis',
    avatar: getRandomAvatar(),
    isFavorite: false,
    lastMessage: 'Let me check and get back to you',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_8,
    online: false,
    typing: false,
    messages: [
      {
        id: 'm26',
        sender: 'me',
        text: 'Do you have the quarterly reports ready?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_8 + 200000),
      },
      {
        id: 'm27',
        sender: 'other',
        text: 'I\'m still working on the final numbers.',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_8 + 100000),
      },
      {
        id: 'm28',
        sender: 'me',
        text: 'When do you think they\'ll be ready?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_8 + 50000),
      },
      {
        id: 'm29',
        sender: 'other',
        text: 'Let me check and get back to you',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_8,
      },
    ],
  },
  {
    id: '10',
    name: 'Sophie Taylor',
    avatar: getRandomAvatar(),
    isFavorite: true,
    lastMessage: 'Thanks! You\'re the best! ❤️',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_9,
    online: true,
    typing: false,
    messages: [
      {
        id: 'm30',
        sender: 'other',
        text: 'Could you help me with the presentation?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_9 + 200000),
      },
      {
        id: 'm31',
        sender: 'me',
        text: 'Of course! What do you need help with?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_9 + 100000),
      },
      {
        id: 'm32',
        sender: 'other',
        text: 'Thanks! You\'re the best! ❤️',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_9,
      },
    ],
  },
  {
    id: '11',
    name: 'James Wilson',
    avatar: getRandomAvatar(),
    isFavorite: false,
    lastMessage: 'Great! See you there.',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_10,
    online: false,
    typing: false,
    messages: [
      {
        id: 'm33',
        sender: 'me',
        text: 'The client meeting is at 2 PM today',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_10 + 200000),
      },
      {
        id: 'm34',
        sender: 'other',
        text: 'Perfect timing! I\'ll be there.',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_10 + 100000),
      },
      {
        id: 'm35',
        sender: 'me',
        text: 'Don\'t forget to bring the contracts',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_10 + 50000),
      },
      {
        id: 'm36',
        sender: 'other',
        text: 'Great! See you there.',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_10,
      },
    ],
  },
  {
    id: '12',
    name: 'Maya Patel',
    avatar: getRandomAvatar(),
    isFavorite: false,
    lastMessage: 'I\'ll review it tonight and send feedback',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_11,
    online: true,
    typing: false,
    messages: [
      {
        id: 'm37',
        sender: 'other',
        text: 'Can you take a look at the new proposal?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_11 + 200000),
      },
      {
        id: 'm38',
        sender: 'me',
        text: 'Sure! When do you need feedback by?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_11 + 100000),
      },
      {
        id: 'm39',
        sender: 'other',
        text: 'End of the week would be perfect',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_11 + 50000),
      },
      {
        id: 'm40',
        sender: 'me',
        text: 'I\'ll review it tonight and send feedback',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_11,
      },
    ],
  },
  {
    id: '13',
    name: 'Chris Brown',
    avatar: getRandomAvatar(),
    isFavorite: true,
    lastMessage: 'Looking forward to it! 🚀',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_12,
    online: false,
    typing: false,
    messages: [
      {
        id: 'm41',
        sender: 'me',
        text: 'The new feature is ready for testing',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_12 + 200000),
      },
      {
        id: 'm42',
        sender: 'other',
        text: 'Awesome! I\'ll test it first thing tomorrow.',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_12 + 100000),
      },
      {
        id: 'm43',
        sender: 'me',
        text: 'Let me know if you find any issues',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_12 + 50000),
      },
      {
        id: 'm44',
        sender: 'other',
        text: 'Looking forward to it! 🚀',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_12,
      },
    ],
  },
  {
    id: '14',
    name: 'Nina Martinez',
    avatar: getRandomAvatar(),
    isFavorite: false,
    lastMessage: 'Perfect! Talk soon.',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_13,
    online: true,
    typing: false,
    messages: [
      {
        id: 'm45',
        sender: 'other',
        text: 'Can we schedule a call for next week?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_13 + 200000),
      },
      {
        id: 'm46',
        sender: 'me',
        text: 'Sure! Tuesday afternoon works for me.',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_13 + 100000),
      },
      {
        id: 'm47',
        sender: 'other',
        text: 'Tuesday at 3 PM it is!',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_13 + 50000),
      },
      {
        id: 'm48',
        sender: 'me',
        text: 'Perfect! Talk soon.',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_13,
      },
    ],
  },
  {
    id: '15',
    name: 'Ryan Cooper',
    avatar: getRandomAvatar(),
    isFavorite: false,
    lastMessage: 'Thanks for the update! 👍',
    updatedAt: Date.now() - CONSTANTS.TIME.HOURS_14,
    online: false,
    typing: false,
    messages: [
      {
        id: 'm49',
        sender: 'me',
        text: 'The server maintenance is complete',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_14 + 200000),
      },
      {
        id: 'm50',
        sender: 'other',
        text: 'Great! Any issues during the process?',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_14 + 100000),
      },
      {
        id: 'm51',
        sender: 'me',
        text: 'Everything went smoothly. All systems are back online.',
        timestamp: Date.now() - (CONSTANTS.TIME.HOURS_14 + 50000),
      },
      {
        id: 'm52',
        sender: 'other',
        text: 'Thanks for the update! 👍',
        timestamp: Date.now() - CONSTANTS.TIME.HOURS_14,
      },
    ],
  },
];

/**
 * Helper function to get sample conversations
 * In development, returns sample data
 * In production, this would fetch from API
 */
export const getSampleConversations = (): Conversation[] => {
    return sampleConversations;
};
/*export const getSampleConversations = (): Conversation[] => {
  // In production, replace this with API call
  if (__DEV__) {
    return sampleConversations;
  }

  // Return empty array in production or will fetch from API
  return [];
};*/
