import React from 'react';
import { StyleProp, ImageStyle } from 'react-native';

import FastImage, { Source } from 'react-native-fast-image';

interface FastImageWrapperProps {
  source: Source | { uri: string };
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
}

const FastImageWrapper: React.FC<FastImageWrapperProps> = ({
  source,
  style,
  resizeMode = 'cover',
}) => {
  return (
    <FastImage
      source={source}
      style={style as any}
      resizeMode={FastImage.resizeMode[resizeMode]}
    />
  );
};

export default FastImageWrapper;
