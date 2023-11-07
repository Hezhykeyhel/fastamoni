import React, { useEffect } from "react";

import { Box, Button, Icon, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";

const SetPinSuccess = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("DashboardTab", { screen: "SettingsScreen" });
    }, 2000);
  }, [navigation]);
  return (
    <BlurryBottomContainer shades="topBottomBlur">
      <Box alignItems="center" flex={0.9} justifyContent="center">
        <Box marginVertical="lg">
          <Icon name="blue_check" size={100} />
        </Box>
        <Text fontSize={30} variant="header">
          Transaction Pin Completed
        </Text>
        <Box height={50} />
        <Button
          label="Complete"
          onPress={() =>
            navigation.replace("DashboardTab", {
              screen: "SettingsScreen",
            })
          }
        />
      </Box>
    </BlurryBottomContainer>
  );
};

export default SetPinSuccess;
