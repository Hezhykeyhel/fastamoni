import React from "react";

import Box from "../Box";
import Icon, { IconName } from "../Icon";
import Pressable from "../Pressable";
import Text from "../Text";

type TileContentProps = {
  heading: string;
  leftIcon: IconName;
  content: string;
  onProceed: () => void;
};

const TileContent = (props: TileContentProps) => {
  const {
    content,
    heading = "visit a nearby merchant and trasnfer from your walet and get equivalent cash",
    leftIcon,
    onProceed,
  } = props;
  return (
    <Pressable
      backgroundColor="white"
      borderRadius={20}
      marginBottom="md"
      onPress={onProceed}
      paddingHorizontal="lg"
      paddingVertical="md"
    >
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-evenly"
      >
        <Icon name={leftIcon} size={30} />
        <Box paddingHorizontal="xl">
          <Text variant="subHeading">{heading}</Text>
          <Text variant="boldBody">{content}</Text>
        </Box>
        <Icon name="right_chevron" size={20} />
      </Box>
    </Pressable>
  );
};

export default TileContent;
