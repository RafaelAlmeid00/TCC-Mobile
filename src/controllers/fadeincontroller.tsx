import { useRef, useState } from 'react';
import { Animated } from 'react-native';

const useFadeInAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [navigator, setNavigator] = useState(0)

  const fadeIn = () => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setNavigator(1)
      console.debug('ta indo aq', navigator)
    });
  };

  return { fadeAnim, fadeIn, navigator};
};

export default useFadeInAnimation;
