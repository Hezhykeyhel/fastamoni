/* eslint-disable unused-imports/no-unused-vars */
import { GestureResponderEvent } from "react-native";
import * as Animatable from "react-native-animatable";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";

import { useTheme } from "@/constants/theme";

import Box from "./Box";
import Icon, { IconName } from "./Icon";
import Pressable, { PressableProps } from "./Pressable";
import Text from "./Text";

const AnimatedBox = Animated.createAnimatedComponent(Box);

export type ButtonProps = PressableProps & {
  icon?: IconName;
  isloading?: boolean;
  label: string;
  loadingText?: string;
  variant?: "primary" | "secondary";
};

/**
 * Custom `Button` component with two variants (primary & secondary)
 * inherits Pressable Props
 * @see {@link PressableProps}
 */
function Button({
  icon,
  isloading = false,
  label,
  loadingText,
  variant = "primary",
  onPress,
  ...rest
}: ButtonProps) {
  const { spacing } = useTheme();
  const handlePress = (event?: GestureResponderEvent) => {
    if (isloading) return;
    if (onPress) {
      onPress(event);
    }
  };
  return (
    <Pressable
      alignSelf="center"
      backgroundColor={variant === "primary" ? "black" : "transparent"}
      borderRadius={6}
      justifyContent="center"
      onPress={handlePress}
      padding="md"
      type="scale"
      width={360}
    >
      {isloading ? (
        <AnimatedBox
          entering={FadeInUp}
          exiting={FadeOutDown}
          key={`${isloading}`}
        >
          <Box alignItems="center" flexDirection="row" justifyContent="center">
            {/* <AnimatedLottieView
              autoPlay
              loop
              resizeMode="cover"
              source={paperplane}
              // style={{
              //   height: 30,
              //   width: 30,
              // }}
            /> */}
            <Animatable.Text
              animation="flash"
              iterationCount="infinite"
              iterationDelay={50}
            >
              <Text color="white" variant="subHeading">
                {loadingText}
              </Text>
            </Animatable.Text>
          </Box>
        </AnimatedBox>
      ) : (
        <AnimatedBox
          alignItems="center"
          entering={FadeIn}
          exiting={FadeOut}
          flexDirection="row"
          justifyContent="center"
        >
          {icon ? (
            <Icon
              name={icon as IconName}
              size={16}
              style={{ marginRight: spacing.sm }}
            />
          ) : null}
          <Text
            color={variant === "primary" ? "mainBackground" : "black"}
            textAlign="justify"
            variant="button"
          >
            {label}
          </Text>
        </AnimatedBox>
      )}
    </Pressable>
  );
}

export default Button;
