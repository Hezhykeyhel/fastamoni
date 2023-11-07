import { createBox } from "@shopify/restyle";
import { Image as NativeImage } from "react-native";

import { Theme } from "@/constants/theme";

const Image = createBox<
  Theme,
  React.ComponentProps<typeof NativeImage> & { children?: React.ReactNode }
>(NativeImage);

export type ImageProps = React.ComponentProps<typeof Image>;

export default Image;
