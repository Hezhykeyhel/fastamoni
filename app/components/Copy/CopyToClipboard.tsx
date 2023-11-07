/* eslint-disable react/no-array-index-key */
import React from "react";

import Box from "../Box";
import Icon from "../Icon";
import Pressable from "../Pressable";
import Text from "../Text";

type ListItems = {
  selected: () => void;
  label: string;
  defaultSubheading: any;
};

const CopyToClipboard = (props: ListItems) => {
  const { selected, defaultSubheading, label } = props;

  return (
    <Pressable onPress={selected}>
      <Box
        alignItems="center"
        backgroundColor="lightGrey"
        borderRadius={100}
        flexDirection="row"
        height={70}
        justifyContent="space-between"
        marginBottom="sm"
        padding="md"
      >
        <Box>
          <Text variant="boldBody">{label}</Text>
          <Text variant="boldBody">{defaultSubheading}</Text>
        </Box>
        <Icon name="copy_clipboard" size={25} />
      </Box>
    </Pressable>
  );
};

export default CopyToClipboard;
