import * as Updates from "expo-updates";
import React from "react";

import Box from "../Box";
import Pressable from "../Pressable";
import Text from "../Text";

/**
 * Restarts the app on press
 */
const handleRestart = async () => {
  Updates.reloadAsync();
};

/**
 * Fallback Screen for ErrorBoundary, this screen is displayed when the app crashes
 * due to an error in our component tree.
 */
function FallBack() {
  return (
    <Box alignItems="center" flex={1} justifyContent="center">
      <Text>Oops 😞!</Text>
      <Text>We Encountered an error,</Text>
      <Pressable onPress={handleRestart}>
        <Text>Restart the app</Text>
      </Pressable>
    </Box>
  );
}

export default FallBack;
