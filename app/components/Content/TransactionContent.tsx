import React from "react";
import { Platform } from "react-native";

import Box, { BoxProps } from "../Box";
import Image from "../Image";
import Pressable from "../Pressable";
import Text from "../Text";

type ContentProps = {
  handleClick?: () => void;
  name?: string;
  email: string;
  boxStyle?: BoxProps;
  image?: string;
};

const TransactionContent = (props: ContentProps) => {
  const { handleClick, name, boxStyle, image, email } = props;

  return (
    <Pressable onPress={handleClick}>
      <Box
        alignItems="center"
        backgroundColor="white"
        borderRadius={4}
        elevation={4}
        flexDirection="row"
        justifyContent="space-between"
        marginVertical="sm"
        padding="md"
        style={{
          borderColor: "rgba(0,0,0,0.2)",
          elevation: 4,
          // shadowColor: palette.transparent,
          shadowOffset: {
            height: Platform.OS === "ios" ? 3 : 0,
            width: Platform.OS === "ios" ? 3 : 0,
          },
          shadowOpacity: Platform.OS === "ios" ? 0.1 : 0,
          shadowRadius: Platform.OS === "ios" ? 4 : 0,
        }}
        {...boxStyle}
      >
        <Box alignItems="center" flexDirection="row" justifyContent="center">
          <Image
            height={50}
            source={{ uri: image }}
            style={{ borderRadius: 100 }}
            width={50}
          />
          <Box marginHorizontal="sm">
            <Text variant="subHeading">{name}</Text>
            <Text variant="body">{email}</Text>
          </Box>
        </Box>
        <Pressable onPress={handleClick}>
          <Text color="primary" variant="body">
            EDIT
          </Text>
        </Pressable>
      </Box>
    </Pressable>
  );
};

export default TransactionContent;
