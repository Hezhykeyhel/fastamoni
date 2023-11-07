import { GestureResponderEvent, Pressable as NSPressable } from "react-native";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { hapticFeedback } from "@/utils/";

import Box, { BoxProps } from "./Box";

const AnimatedBox = Animated.createAnimatedComponent(Box);

export type PressableProps = BoxProps & {
  children?: React.ReactNode;
  containerStyle?: PressableProps["style"];
  disabled?: boolean;
  longPressDelayMs?: number;
  onLongPress?(event?: GestureResponderEvent): void;
  onPress?(event?: GestureResponderEvent): void;
  opacityLevel?: number;
  scaleValue?: number;
  type?: "no-feedback" | "opacity" | "scale";
};

const config = {
  damping: 7,
  mass: 0.2,
  stiffness: 250,
};

/**
 * Custom themed `Pressable` component with three feedback types: `"no-feedback" | "opacity" | "scale";`.
 */
function Pressable({
  children,
  containerStyle,
  disabled,
  longPressDelayMs = 700,
  onLongPress,
  onPress,
  opacityLevel = 0.5,
  scaleValue = 0.95,
  type = "no-feedback",
  ...rest
}: PressableProps) {
  const baseScale = 1;

  const pressedOut = useSharedValue(false);
  const scale = useSharedValue(1);
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  useAnimatedReaction(
    () => pressedOut.value,
    () => {
      if (pressedOut.value) {
        scale.value = withSpring(baseScale, config);
        pressedOut.value = false;
      }
    },
  );

  const getOpacityStyle = (pressed: boolean) =>
    type === "opacity"
      ? {
          opacity: pressed ? opacityLevel : 1,
        }
      : undefined;
  const handleLongPress = (event?: GestureResponderEvent) => {
    if (onLongPress) {
      onLongPress(event);
    }
    hapticFeedback();
    if (type === "scale") {
      scale.value = withSpring(baseScale, config);
    }
  };
  const onPressIn = () => {
    if (type === "scale") {
      scale.value = withSpring(scaleValue, config);
    }
  };
  const onPressOut = () => {
    pressedOut.value = true;
  };

  return (
    <NSPressable
      delayLongPress={longPressDelayMs}
      disabled={disabled}
      onLongPress={handleLongPress}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed }) => [getOpacityStyle(pressed), containerStyle]}
    >
      <AnimatedBox opacity={disabled ? 0.4 : 1} {...rest} style={[scaleStyle]}>
        {children}
      </AnimatedBox>
    </NSPressable>
  );
}

export default Pressable;
