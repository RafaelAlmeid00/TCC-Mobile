import React, { useEffect } from 'react';
import { Animated } from 'react-native';

const FadeInView = ({ children, style, fadeAnim, fadeIn }) => {
  useEffect(() => {
    fadeIn();
  }, [fadeIn]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
