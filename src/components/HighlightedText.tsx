import React, { useMemo } from 'react';
import { Text, TextStyle } from 'react-native';

import { Colors, escapeRegex } from '../utils';
import { CONSTANTS } from '../constants';

interface HighlightedTextProps {
  text: string;
  searchTerm: string;
  style?: TextStyle | TextStyle[];
  highlightStyle?: TextStyle;
  maxHighlights?: number;
}

const SingleLineText: React.FC<{ style?: TextStyle | TextStyle[]; children: React.ReactNode }> = ({ style, children }) => (
  <Text style={style} numberOfLines={1} ellipsizeMode={'tail'}>{children}</Text>
);

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  searchTerm,
  style,
  highlightStyle,
  maxHighlights = CONSTANTS.CHAT.MAX_HIGHLIGHTS_PER_TEXT,
}) => {
  const highlightedContent = useMemo(() => {
    // Early return for empty search
    if (!searchTerm.trim() || searchTerm.length < CONSTANTS.CHAT.MIN_SEARCH_TERM_LENGTH) {
      return <SingleLineText style={style}>{text}</SingleLineText>;
    }

    // Performance optimization: limit text length for highlighting
    const maxTextLength = CONSTANTS.CHAT.MAX_HIGHLIGHT_TEXT_LENGTH;
    const textToProcess = text.length > maxTextLength
      ? text.substring(0, maxTextLength) + '...'
      : text;

    try {
      // Escape special regex characters
      const escapedTerm = escapeRegex(searchTerm);
      const regex = new RegExp(`(${escapedTerm})`, 'gi');

      // Split text and limit matches for performance
      const parts = textToProcess.split(regex);
      let highlightCount = 0;

      return (
        <SingleLineText style={style}>
          {parts.map((part, index) => {
            const isMatch = part.toLowerCase() === searchTerm.toLowerCase();

            // Limit number of highlights for performance
            if (isMatch && highlightCount < maxHighlights) {
              highlightCount++;
              return (
                <Text
                  key={index}
                  style={[
                    highlightStyle || {
                      backgroundColor: Colors.warning,
                      color: '#000',
                      fontWeight: '600',
                    }
                  ]}
                >
                  {part}
                </Text>
              );
            }

            return <Text key={index} style={style}>{part}</Text>;
          })}
        </SingleLineText>
      );
    } catch (error) {
      // Fallback to plain text if regex fails
      return <SingleLineText style={style}>{textToProcess}</SingleLineText>;
    }
  }, [text, searchTerm, style, highlightStyle, maxHighlights]);

  return highlightedContent;
};

export default HighlightedText;
