import React from "react";

import Box from "./Box";
import Icon, { IconName } from "./Icon";
import Pressable from "./Pressable";
import Text from "./Text";

type TileProps = {
  text: string;
  icon: IconName | any;
  onProceed: () => void;
};

const Tile = (props: TileProps) => {
  const { icon, text, onProceed } = props;
  return (
    <Pressable
      alignItems="center"
      backgroundColor="lightGrey"
      borderRadius={100}
      marginVertical="sm"
      onPress={onProceed}
      padding="md"
    >
      <Box
        alignItems="center"
        flexDirection="row"
        height={40}
        justifyContent="space-between"
        marginHorizontal="md"
        width="100%"
      >
        <Text variant="subHeading">{text}</Text>
        <Icon name={icon} />
      </Box>
    </Pressable>
  );
};

export default Tile;
