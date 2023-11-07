/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from "react";
import { Platform } from "react-native";

import Box from "../Box";
import Icon from "../Icon";
import Pressable from "../Pressable";
import Text from "../Text";
import TextInput, { TextInputProps } from "../TextInput";

type InputProps = {
  hasEyes?: boolean;
  labelText?: string;
  properties?: TextInputProps;
};

const EyeTextInput = (props: InputProps) => {
  const { hasEyes = false, labelText, properties } = props;

  const [switchEyes, setSwitchEyes] = useState<boolean>(false);
  return (
    <Box
      alignItems="center"
      backgroundColor="lightGrey"
      borderRadius={100}
      flexDirection="row"
      height={70}
      justifyContent="space-between"
      marginBottom="sm"
      paddingHorizontal="md"
      paddingVertical="sm"
    >
      <Box>
        <Text variant="boldBody">{labelText}</Text>
        <TextInput
          secureTextEntry={!switchEyes}
          style={{
            width:
              Platform.OS === "ios" || Platform.OS === "android" ? 250 : 280,
          }}
          {...properties}
          autoComplete="off"
          variant="boldBody"
        />
      </Box>
      {hasEyes && (
        <Pressable onPress={() => setSwitchEyes(!switchEyes)} padding="md">
          <Icon name={switchEyes ? "eye_off" : "eye"} size={30} />
        </Pressable>
      )}
    </Box>
  );
};

export default EyeTextInput;
