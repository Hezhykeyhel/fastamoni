/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable consistent-return */
import React, { useRef, useState } from "react";
import { ScrollView } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSelector } from "react-redux";

import { loginimg } from "@/assets/images";
import { Box, Button, Image, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";
import TextInput from "@/components/TextInput";
import { RootState } from "@/store/store";

const SetPin = ({ navigation, route }) => {
  const firstInput = useRef<null | any>(null);
  const secondInput = useRef<null | any>(null);
  const thirdInput = useRef<null | any>(null);
  const fourthInput = useRef<null | any>(null);
  const [firstPin, setFirstPin] = useState<number | any>({});
  const secOne = useRef<null | any>(null);
  const secTwo = useRef<null | any>(null);
  const secThree = useRef<null | any>(null);
  const secFour = useRef<null | any>(null);
  const [secondPin, setSecondPin] = useState<number | any>({});

  const { userData } = useSelector((state: RootState) => state.user);

  const handleSetPinBlast = async () => {
    try {
      if (!firstPin.a || !firstPin.b || !firstPin.c || !firstPin.d) {
        return Toast.show({
          text1: "Please complete the first pin input fields",
          type: "error",
        });
      }
      if (!secondPin.e || !secondPin.f || !secondPin.g || !secondPin.h) {
        return Toast.show({
          text1: "Please complete the second pin input fields",
          type: "error",
        });
      }
      if (
        firstPin.a !== secondPin.e ||
        firstPin.b !== secondPin.f ||
        firstPin.c !== secondPin.g ||
        firstPin.d !== secondPin.h
      ) {
        return Toast.show({
          text1: "Pins do not match, please try again",
          type: "error",
        });
      }
    } catch (error) {
      Toast.show({
        text1: `${error as string}`,
        type: "error",
      });
    }
  };

  return (
    <BlurryBottomContainer shades="bottomBlur">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box alignItems="center" justifyContent="center" marginTop="Ml">
          <Image height={150} source={loginimg} width={150} />
          <Box alignItems="center" justifyContent="center" marginTop="md">
            <Text variant="header">Set your Fastamoni PIN</Text>
            <Text
              marginHorizontal="Ml"
              marginTop="xxs"
              textAlign="center"
              variant="boldBody"
            >
              Your Fastamoni PIN protects your account from unauthorized access.
            </Text>
          </Box>
          <Box marginTop="Ml">
            <Text
              color="textColorTint"
              marginBottom="md"
              textAlign="center"
              variant="subHeading"
            >
              Secure your account with a 4 digit pin
            </Text>
            <Box flexDirection="row" justifyContent="space-between">
              <Box
                alignItems="center"
                borderColor="blockBg"
                borderRadius={8}
                borderWidth={1}
                height={70}
                justifyContent="center"
                marginHorizontal="xs"
                width={70}
              >
                <TextInput
                  fontSize={26}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={(text) => {
                    setFirstPin({ ...firstPin, a: text });
                    text && secondInput.current.focus();
                  }}
                  ref={firstInput}
                  style={{
                    textAlign: "center",
                  }}
                />
              </Box>
              <Box
                alignItems="center"
                borderColor="blockBg"
                borderRadius={8}
                borderWidth={1}
                height={70}
                justifyContent="center"
                marginHorizontal="xs"
                width={70}
              >
                <TextInput
                  fontSize={26}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={(text) => {
                    setFirstPin({ ...firstPin, b: text });
                    text
                      ? thirdInput.current.focus()
                      : firstInput.current.focus();
                  }}
                  ref={secondInput}
                  style={{
                    textAlign: "center",
                  }}
                />
              </Box>
              <Box
                alignItems="center"
                borderColor="blockBg"
                borderRadius={8}
                borderWidth={1}
                height={70}
                justifyContent="center"
                marginHorizontal="xs"
                width={70}
              >
                <TextInput
                  fontSize={26}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={(text) => {
                    setFirstPin({ ...firstPin, c: text });
                    text
                      ? fourthInput.current.focus()
                      : secondInput.current.focus();
                  }}
                  ref={thirdInput}
                  style={{
                    textAlign: "center",
                  }}
                />
              </Box>
              <Box
                alignItems="center"
                borderColor="blockBg"
                borderRadius={8}
                borderWidth={1}
                height={70}
                justifyContent="center"
                marginHorizontal="xs"
                width={70}
              >
                <TextInput
                  fontSize={26}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={(text) => {
                    setFirstPin({ ...firstPin, d: text });
                    !text && thirdInput.current.focus();
                  }}
                  ref={fourthInput}
                  style={{
                    textAlign: "center",
                  }}
                />
              </Box>
            </Box>
            <Text
              color="textColorTint"
              marginVertical="md"
              textAlign="center"
              variant="subHeading"
            >
              Confirm and secure your 4 digit pin
            </Text>
            <Box flexDirection="row" justifyContent="space-between">
              <Box
                alignItems="center"
                borderColor="blockBg"
                borderRadius={8}
                borderWidth={1}
                height={70}
                justifyContent="center"
                marginHorizontal="xs"
                width={70}
              >
                <TextInput
                  fontSize={26}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={(text) => {
                    setSecondPin({ ...secondPin, e: text });
                    text && secTwo.current.focus();
                  }}
                  ref={secOne}
                  style={{
                    textAlign: "center",
                  }}
                />
              </Box>
              <Box
                alignItems="center"
                borderColor="blockBg"
                borderRadius={8}
                borderWidth={1}
                height={70}
                justifyContent="center"
                marginHorizontal="xs"
                width={70}
              >
                <TextInput
                  fontSize={26}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={(text) => {
                    setSecondPin({ ...secondPin, f: text });
                    text ? secThree.current.focus() : secOne.current.focus();
                  }}
                  ref={secTwo}
                  style={{
                    textAlign: "center",
                  }}
                />
              </Box>
              <Box
                alignItems="center"
                borderColor="blockBg"
                borderRadius={8}
                borderWidth={1}
                height={70}
                justifyContent="center"
                marginHorizontal="xs"
                width={70}
              >
                <TextInput
                  fontSize={26}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={(text) => {
                    setSecondPin({ ...secondPin, g: text });
                    text ? secFour.current.focus() : secTwo.current.focus();
                  }}
                  ref={secThree}
                  style={{
                    textAlign: "center",
                  }}
                />
              </Box>
              <Box
                alignItems="center"
                borderColor="blockBg"
                borderRadius={8}
                borderWidth={1}
                height={70}
                justifyContent="center"
                marginHorizontal="xs"
                width={70}
              >
                <TextInput
                  fontSize={26}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={(text) => {
                    setSecondPin({ ...secondPin, h: text });
                    !text && secThree.current.focus();
                  }}
                  ref={secFour}
                  style={{
                    textAlign: "center",
                  }}
                />
              </Box>
            </Box>
            <Box height={60} />
            <Button
              label="Set PIN"
              loadingText="Processing request..."
              onPress={handleSetPinBlast}
            />
          </Box>
        </Box>
      </ScrollView>
    </BlurryBottomContainer>
  );
};

export default SetPin;
