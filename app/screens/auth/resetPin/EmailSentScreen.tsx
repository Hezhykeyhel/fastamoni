import React from "react";

import { Box, Button, Icon, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";

const EmailSentScreen = ({ navigation, route }) => {
  const { getEmail } = route.params;
  return (
    <BlurryBottomContainer shades="bottomBlur">
      <Box flex={1} marginTop="Ml" paddingHorizontal="md">
        <Box alignItems="center" flex={1} justifyContent="center">
          <Icon name="sentIcon" size={150} />
          <Box alignItems="center" justifyContent="center">
            <Text variant="header">Email Sent</Text>
            <Text
              marginHorizontal="md"
              paddingHorizontal="Ml"
              textAlign="center"
              variant="boldBody"
            >
              An Email has been sent to help your reset you password.
            </Text>
          </Box>
          <Box height={150} />
          <Button
            label="Continue"
            onPress={() =>
              navigation.replace("VerifyResetPin", {
                getEmail,
              })
            }
          />
        </Box>
      </Box>
    </BlurryBottomContainer>
  );
};

export default EmailSentScreen;
