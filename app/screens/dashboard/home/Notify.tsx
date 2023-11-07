import React from "react";
import Animated, {
  BounceInDown,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";

import { Box, Icon, Pressable, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";

type InfoProps = {
  amount: string;
  showInfo: boolean;
  toggleShow: () => void;
};

const Notify = (props: InfoProps) => {
  const { showInfo, toggleShow, amount } = props;

  return (
    <Box flex={1}>
      {showInfo && (
        <BlurryBottomContainer shades="topBottomBlur">
          <Animated.View
            entering={BounceInDown.delay(100)}
            exiting={FadeOutLeft.delay(100)}
            layout={Layout.duration(100)}
          >
            <Box
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box>
                <Text color="white">Today</Text>
              </Box>
              <Box>
                <Text color="white">{amount}</Text>
              </Box>
              <Pressable onPress={toggleShow}>
                <Icon name="close" size={25} />
              </Pressable>
            </Box>
          </Animated.View>
        </BlurryBottomContainer>
      )}
    </Box>
  );
};

export default Notify;
