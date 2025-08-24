import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

import { responsive } from '../utils';

interface TypingIndicatorProps {
  color: string;
  size?: number;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = React.memo(({
  color,
  size = 4
}) => {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 500,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);

    // Cleanup function to stop animations when component unmounts
    return () => {
      dot1.stopAnimation();
      dot2.stopAnimation();
      dot3.stopAnimation();
    };
  }, [dot1, dot2, dot3]);

  const dotStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    marginHorizontal: 1,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[dotStyle, { backgroundColor: color, opacity: dot1 }]} />
      <Animated.View style={[dotStyle, { backgroundColor: color, opacity: dot2 }]} />
      <Animated.View style={[dotStyle, { backgroundColor: color, opacity: dot3 }]} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: responsive.margin.xs,
  },
});

export default TypingIndicator;
