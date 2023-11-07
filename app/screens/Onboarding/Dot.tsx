import React from "react";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Box, BoxProps } from "@/components/";
import { screenWidth } from "@/constants/";
import { wp } from "@/constants/layout";
import { useTheme } from "@/constants/theme";

const AnimatedBox = Animated.createAnimatedComponent(Box);

interface DotProps {
  index: number;
  translateX: Animated.SharedValue<number>;
}

function Dot({ index, translateX }: DotProps) {
  const { colors } = useTheme();
  const inputRange = [
    (index - 1) * screenWidth,
    index * screenWidth,
    (index + 1) * screenWidth,
  ];
  const boxWidth = wp(8);
  const boxWidthFocus = wp(25);
  const boxHeight = wp(8);
  const boxHeightFocus = wp(8);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(translateX.value, inputRange, [
      colors.grey,
      colors.black,
      colors.grey,
    ]);

    return {
      backgroundColor: backgroundColor as string,
    };
  });

  const animatedProps = useAnimatedProps<BoxProps>(() => {
    const height = interpolate(translateX.value, inputRange, [
      boxHeight,
      boxHeightFocus,
      boxHeight,
    ]);
    const width = interpolate(translateX.value, inputRange, [
      boxWidth,
      boxWidthFocus,
      boxWidth,
    ]);

    return {
      height,
      width,
    };
  });
  return (
    <AnimatedBox
      animatedProps={animatedProps}
      borderRadius={wp(4)}
      marginRight="md"
      style={[animatedStyle]}
    />
  );
}

export default Dot;
