import React from "react";

import { palette } from "@/constants/theme";

import Box, { BoxProps } from "../Box";
import Icon, { IconName } from "../Icon";
import Pressable from "../Pressable";
import Text, { TextProps } from "../Text";

type ContentProps = {
  icons: IconName | any;
  text: string;
  boxStyle?: BoxProps;
  handleClick?: () => void;
  textProps?: TextProps;
};

const ContentBox = (props: ContentProps) => {
  const { icons, text, textProps, handleClick = () => {}, boxStyle } = props;

  return (
    <Pressable onPress={handleClick}>
      <Box
        alignItems="center"
        backgroundColor="white"
        borderRadius={8}
        height={140}
        justifyContent="center"
        style={{
          elevation: 4,
          shadowColor: palette.black,
          shadowOffset: {
            height: 3,
            width: 3,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        }}
        width={140}
        {...boxStyle}
      >
        <Icon color="" name={icons} size={35} />
        <Text marginTop="sm" variant="subHeading" {...textProps}>
          {text}
        </Text>
      </Box>
    </Pressable>
  );
};

export default ContentBox;
