import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Box, Text } from "@/components/";
import { screenWidth, wp } from "@/constants/";

type WordsProps = {
  index: number;
  text: string;
  translateX: Animated.SharedValue<number>;
};
const AnimatedText = Animated.createAnimatedComponent(Text);

export const Heading = ({ index, text, translateX }: WordsProps) => {
  const inputRange = [
    (index - 1) * screenWidth,
    index * screenWidth,
    (index + 1) * screenWidth,
  ];

  const widthPixel = wp(36);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, inputRange, [
      (index - 1) * -widthPixel,
      index * -widthPixel,
      (index + 1) * -widthPixel,
    ]);

    const scale = interpolate(translateX.value, inputRange, [0.3, 1, 0.3]);

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <AnimatedText
      fontSize={32}
      marginBottom="sml"
      style={[animatedStyle]}
      variant="header"
    >
      {text}
    </AnimatedText>
  );
};
export const Description = ({ index, text, translateX }: WordsProps) => {
  const inputRange = [
    (index - 1) * screenWidth,
    index * screenWidth,
    (index + 1) * screenWidth,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, inputRange, [0, 1, 0]);

    const scale = interpolate(translateX.value, inputRange, [0.3, 1, 0.3]);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Box alignSelf="center" position="absolute">
      <AnimatedText
        fontSize={20}
        lineHeight={24}
        paddingHorizontal="lg"
        style={animatedStyle}
        textAlign="center"
        variant="body"
      >
        {text}
      </AnimatedText>
    </Box>
  );
};
