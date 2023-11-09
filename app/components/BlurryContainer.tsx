import React, { ReactNode } from "react";
import { ImageBackground } from "react-native";

import { blurry } from "@/assets/images";

import Box from "./Box";

type BlurryProps = {
  children: ReactNode;
  shades: "blur";
};
const BlurryContainer = (props: BlurryProps) => {
  const { children, shades } = props;
  return (
    <Box flex={1}>
      {shades === "blur" && (
        <ImageBackground resizeMode="cover" source={blurry} style={{ flex: 1 }}>
          {children}
        </ImageBackground>
      )}
    </Box>
  );
};

export default BlurryContainer;
