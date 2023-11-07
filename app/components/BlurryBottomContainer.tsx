import React, { ReactNode } from "react";
import { ImageBackground } from "react-native";

import { blurryImg, mainBlur } from "@/assets/images";

type BlurryProps = {
  children: ReactNode;
  shades: "bottomBlur" | "topBottomBlur";
};
const BlurryBottomContainer = (props: BlurryProps) => {
  const { children, shades } = props;
  return (
    <>
      {shades === "bottomBlur" && (
        <ImageBackground
          resizeMode="cover"
          source={blurryImg}
          style={{ flex: 1 }}
        >
          {children}
        </ImageBackground>
      )}
      {shades === "topBottomBlur" && (
        <ImageBackground
          resizeMode="cover"
          source={mainBlur}
          style={{ flex: 1 }}
        >
          {children}
        </ImageBackground>
      )}
    </>
  );
};

export default BlurryBottomContainer;
