import React, { useEffect } from "react";

import { Box, Icon, Pressable, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";

const RegistrationWelcomePage = ({ navigation }) => {
  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate("HomeDashboard");
    // }, 3000);
  }, [navigation]);
  return (
    <BlurryBottomContainer shades="topBottomBlur">
      <Box alignItems="center" flex={0.9} justifyContent="center">
        <Box marginVertical="lg">
          <Icon name="blue_check" size={100} />
        </Box>
        <Text fontSize={30} variant="header">
          Welcome
        </Text>
        <Box height={50} />
        <Text paddingHorizontal="lg" textAlign="center" variant="subHeading">
          Welcome to Fastamoni, Your account was created successfully, {`\n`}
          {`\n`}
          {/* Click proceed to set your PIN */}
        </Text>
        <Box alignItems="center" justifyContent="space-around" marginTop="lg">
          <Pressable
            alignItems="center"
            backgroundColor="black"
            borderRadius={6}
            flexDirection="row"
            justifyContent="center"
            marginRight="sm"
            onPress={() => navigation.navigate("UserSignIn")}
            paddingHorizontal="lg"
            paddingVertical="sm"
          >
            <Text color="white" marginHorizontal="sm" variant="subHeading">
              Proceed
            </Text>
          </Pressable>
        </Box>
      </Box>
    </BlurryBottomContainer>
  );
};

export default RegistrationWelcomePage;
