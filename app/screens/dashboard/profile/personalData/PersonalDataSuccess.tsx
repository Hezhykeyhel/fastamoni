import React, { useEffect } from "react";

import { Box, Button, Icon, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";

const PersonalDataSuccess = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("ProfileScreen");
    }, 2000);
  }, []);
  return (
    <BlurryBottomContainer shades="bottomBlur">
      <Box
        alignItems="center"
        flex={1}
        justifyContent="center"
        marginTop="Ml"
        paddingHorizontal="md"
      >
        <Box marginBottom="md">
          <Icon name="check" size={100} />
        </Box>
        <Text marginHorizontal="Ml" textAlign="center" variant="header">
          Update Complete
        </Text>
        <Box height={100} />
        <Button
          label="Okay"
          onPress={() => navigation.navigate("ProfileScreen")}
        />
      </Box>
    </BlurryBottomContainer>
  );
};

export default PersonalDataSuccess;
