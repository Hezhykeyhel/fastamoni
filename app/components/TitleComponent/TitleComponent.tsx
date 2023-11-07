import React from "react";

import Box from "../Box";
import Icon from "../Icon";
import Pressable from "../Pressable";
import Text from "../Text";

type TitleProps = {
  title?: string;
  handleBackPress?: () => void;
  handleCancel?: () => void;
  hasCancel?: boolean;
  handleHistoryClick?: () => void;
  hasHistory?: boolean;
};

const TitleComponent = (props: TitleProps) => {
  const {
    title,
    handleBackPress,
    handleCancel,
    hasCancel = false,
    hasHistory = false,
    handleHistoryClick,
  } = props;
  return (
    <Box
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      paddingVertical="md"
    >
      <Box alignItems="center" flexDirection="row">
        <Pressable onPress={handleBackPress} paddingHorizontal="sm">
          <Icon name="chevron_back" />
        </Pressable>
        <Box marginHorizontal="lg">
          <Text variant="subHeading">{title}</Text>
        </Box>
      </Box>
      {hasCancel && (
        <Box>
          <Pressable onPress={handleCancel}>
            <Icon name="close" />
          </Pressable>
        </Box>
      )}
      {hasHistory && (
        <Box>
          <Pressable onPress={handleHistoryClick}>
            <Text color="primary" marginHorizontal="md" variant="bigSubHeading">
              History
            </Text>
          </Pressable>
        </Box>
      )}
    </Box>
  );
};

export default TitleComponent;
