import { createBox } from "@shopify/restyle";
import LottieView from "lottie-react-native";

import { spinner } from "@/assets/lottie";
import { Theme, useTheme } from "@/constants/theme";

export const Lottie = createBox<Theme, React.ComponentProps<typeof LottieView>>(
  LottieView,
);

export type ActivityIndicatorProps = Omit<
  React.ComponentProps<typeof Lottie>,
  "source"
> & {
  size: number;
  type?: "dark" | "light";
};

/**
 * Custom `Activity` indicator for both platforms based on iOS design
 * @example
 * ```tsx
 * return (
 * ...
 *  <ActivityIndicator size={24} type="dark" />
 * ...
 * )
 * ```
 */
function ActivityIndicator({
  size,
  type = "light",
  ...rest
}: ActivityIndicatorProps) {
  const { colors } = useTheme();
  return (
    <Lottie
      {...rest}
      autoPlay
      colorFilters={Array.from({ length: 9 }).map((_, index) => ({
        color: type === "light" ? colors.white : colors.grey,
        keypath: `Shape Layer ${index + 1}`,
      }))}
      height={size}
      source={spinner}
      width={size}
    />
  );
}

export default ActivityIndicator;
