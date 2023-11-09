/* eslint-disable no-promise-executor-return */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";
import Animated, { FadeInRight, Layout } from "react-native-reanimated";

import { Box, Button, Image, Text } from "@/components/";
import EyeTextInput from "@/components/EyeTextInput/EyeTextInput";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { useUpdateProfileMutation } from "@/reduxfile/redux/users/service";

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const HistoryScreen = ({ navigation, route, onRefresh }) => {
  const [
    triggerUpdate,
    { isLoading: updateInfoLoading, data: updateData, isError },
  ] = useUpdateProfileMutation();
  const [showPullDownToRefresh, setShowPullDownToRefresh] = useState(false);
  const { values } = route.params;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (updateData) {
      showMessage({
        message: `User ${values.first_name} ${values.last_name} of id ${values.id}, was updated successfully`,
        type: "success",
      });
      navigation.navigate("HomeDashboard", {
        onRefresh,
      });
    }
    if (isError) {
      showMessage({
        message: "Something went wrong",
        type: "danger",
      });
    }
  }, [updateData, isError]);

  console.log(updateData, isError);

  return (
    <Box flex={1}>
      <Box marginTop="Ml" paddingHorizontal="lg">
        <TitleComponent
          handleBackPress={() => navigation.goBack()}
          title="Edit Users"
        />
        <Box>
          <ScrollView
            onScroll={({ nativeEvent }) => {
              const {
                contentOffset: { y },
              } = nativeEvent;
              if (y < 60) {
                setShowPullDownToRefresh(true);
                return;
              }
              if (y > 100 && showPullDownToRefresh) {
                setShowPullDownToRefresh(false);
              }
            }}
            // refreshControl={
            //   <RefreshControl onRefresh={onRefresh} refreshing={isLoading} />
            // }
            scrollEventThrottle={20}
            showsVerticalScrollIndicator={false}
          >
            <Box
              alignItems="center"
              alignSelf="center"
              justifyContent="center"
              position="absolute"
              top={3}
            >
              {showPullDownToRefresh && (
                <Animated.View
                  entering={FadeInRight.delay(200)}
                  layout={Layout.duration(200)}
                >
                  <Box
                    alignItems="center"
                    backgroundColor="primary"
                    borderRadius={4}
                    justifyContent="center"
                    padding="xs"
                    width={120}
                  >
                    <Text color="white" variant="body">
                      Pull down to refresh
                    </Text>
                  </Box>
                </Animated.View>
              )}
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              marginHorizontal="md"
              marginTop="sm"
            >
              <Image
                borderRadius={100}
                height={100}
                source={{ uri: values.avatar }}
                width={100}
              />
            </Box>
            <Box height={60} />
            <EyeTextInput
              labelText="Edit First Name"
              properties={{
                onChangeText: (event) => setFirstName(event),
                placeholder: `${values.first_name}` || firstName,
                secureTextEntry: false,
                value: firstName,
              }}
            />
            <Box height={10} />
            <EyeTextInput
              labelText="Edit Last Name"
              properties={{
                onChangeText: (event) => setLastName(event),
                placeholder: `${values.last_name}` || lastName,
                secureTextEntry: false,
                value: lastName,
              }}
            />
            <Box height={10} />
            <EyeTextInput
              labelText="Edit Email"
              properties={{
                editable: false,
                onChangeText: (event) => setEmail(event),
                placeholder: `${values.email}` || email,
                secureTextEntry: false,
                value: email,
              }}
            />
            <Box height={10} />
            <Button
              isloading={updateInfoLoading}
              label="Update Info"
              loadingText="Updating..."
              onPress={() => triggerUpdate(values.id)}
            />
          </ScrollView>
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryScreen;
