import React from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  FadeInLeft,
  FadeOutLeft,
  Layout,
} from "react-native-reanimated";

import { Box, Icon, IconName, Pressable, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";

type InfoProps = {
  firstName: string;
  email: string;
  accountNumber: string;
  icons: IconName;
  showInfo: boolean;
  onLogout?: () => void;
  routeToPersonalData: () => void;
  routeToHelpSupport: () => void;
  toggleShow: () => void;
};

const Info = (props: InfoProps) => {
  const {
    email,
    icons,
    firstName,
    accountNumber,
    showInfo,
    onLogout,
    toggleShow,
    routeToHelpSupport,
    routeToPersonalData,
  } = props;

  return (
    <Box flex={1}>
      {showInfo && (
        <BlurryBottomContainer shades="topBottomBlur">
          <Animated.View
            entering={FadeInLeft.delay(100)}
            exiting={FadeOutLeft.delay(100)}
            layout={Layout.duration(100)}
          >
            <Box width="100%">
              <Box
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
                marginTop="Ml"
                paddingHorizontal="lg"
              >
                <Box>
                  <Icon name={icons} size={60} />
                </Box>
                <Pressable onPress={toggleShow}>
                  <Icon name="close" size={25} />
                </Pressable>
              </Box>
              <Box marginTop="md" paddingHorizontal="lg">
                <Text fontSize={28} textTransform="capitalize" variant="header">
                  {firstName}
                </Text>
                {/* <Text fontSize={28} variant="header" textTransform="capitalize">
                  {secondName}
                </Text> */}
                <Text color="white" marginBottom="xs" variant="subHeading">
                  {email}
                </Text>
                <Text color="white" marginBottom="sm" variant="subHeading">
                  {accountNumber}
                </Text>
              </Box>
              <Box marginTop="Ml">
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={routeToPersonalData}
                >
                  <Box
                    alignItems="center"
                    flexDirection="row"
                    marginHorizontal="lg"
                    marginVertical="lg"
                  >
                    <Icon name="black_profile" size={30} />
                    <Text
                      color="black"
                      marginHorizontal="md"
                      variant="subHeading"
                    >
                      Personal Data
                    </Text>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={routeToHelpSupport}
                >
                  <Box
                    alignItems="center"
                    flexDirection="row"
                    marginHorizontal="lg"
                  >
                    <Icon name="help_icon" size={30} />
                    <Text
                      color="black"
                      marginHorizontal="md"
                      variant="subHeading"
                    >
                      Help/Support
                    </Text>
                  </Box>
                </TouchableOpacity>
              </Box>
            </Box>
            <Box height={120} />
            <Pressable
              alignContent="stretch"
              alignItems="center"
              backgroundColor="black"
              borderRadius={100}
              flexDirection="row"
              height={43}
              justifyContent="center"
              marginHorizontal="lg"
              marginTop="Ml"
              onPress={onLogout}
              width={147}
            >
              <Icon name="logout" size={30} />
              <Text color="white" marginHorizontal="md" variant="subHeading">
                Sign Out
              </Text>
            </Pressable>
          </Animated.View>
        </BlurryBottomContainer>
      )}
    </Box>
  );
};

export default Info;
