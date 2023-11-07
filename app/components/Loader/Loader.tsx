/* eslint-disable import/no-extraneous-dependencies */
import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { Modal } from "react-native";
import * as Animatable from "react-native-animatable";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import paperplane from "../../assets/lottie/paperplane.json";
import Box from "../Box";
import Text, { TextProps } from "../Text";

type LoaderProps = {
  text: string;
  textColor?: TextProps;
};

const Loader = (props: LoaderProps) => {
  const { text, textColor } = props;
  const insets = useSafeAreaInsets();
  return (
    <Modal
      animationType="fade"
      style={{
        flex: 1,
        height: 200,
        justifyContent: "center",
        width: 300,
      }}
      transparent
    >
      <Box
        alignItems="center"
        backgroundColor="white"
        flexDirection="row"
        justifyContent="center"
      >
        <AnimatedLottieView
          autoPlay
          loop
          resizeMode="cover"
          source={paperplane}
          style={{
            alignItems: "center",
            height: 100,
            justifyContent: "center",
            width: 100,
          }}
        />
        <Animatable.Text
          animation="flash"
          iterationCount="infinite"
          iterationDelay={50}
        >
          <Text {...textColor} variant="subHeading">
            {text}
          </Text>
        </Animatable.Text>
      </Box>
    </Modal>
  );
};

export default Loader;
