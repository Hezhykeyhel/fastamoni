/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/consistent-function-scoping */

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import React, { useState } from "react";
import { showMessage } from "react-native-flash-message";

import { loginimg } from "@/assets/images";
import { Box, Button, Image, Text } from "@/components/";
import BlurryContainer from "@/components/BlurryContainer";
import EyeTextInput from "@/components/EyeTextInput/EyeTextInput";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { useLoginMutation } from "@/reduxfile/redux/auth/service";

type MyFormValues = {
  email: string;
  password: string;
  username: string;
};
const InitialValues: MyFormValues = {
  email: "",
  password: "",
  username: "",
};

const LoginOtherAccounts = ({ navigation }) => {
  const [values, setValues] = useState<MyFormValues>(InitialValues);
  const [login, data] = useLoginMutation();
  const { isLoading } = data;
  const handleChange = (text: string, name: string) => {
    setValues({ ...values, [name]: text });
  };

  const checkNetworkConnectivity = async () => {
    const netInfo = await NetInfo.fetch();

    if (!netInfo.isConnected) {
      showMessage({
        message: "No network connection was detected, please try again",
        type: "danger",
      });
      return false;
    }

    try {
      const response = await fetch("https://www.facebook.com");
      if (!response.ok) {
        showMessage({
          message: "Network failed",
          type: "danger",
        });
        return false;
      }
    } catch {
      console.log("Network request failed");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const isConnected = await checkNetworkConnectivity();
    const credentials = {
      email: values.email.trim(),
      password: values.password.trim(),
      username: values.username.trim(),
    };
    await AsyncStorage.setItem("credentials", JSON.stringify(credentials));
    // console.log(credentials);
    if (isConnected) {
      try {
        if (!values?.email || !values?.password || !values?.username) {
          return showMessage({
            message: "Please fill in all fields",
            type: "danger",
          });
        }
        await login({
          email: values.email.trim(),
          password: values.password.trim(),
        }).then((resp: any) => {
          console.log(resp);
          if (resp?.error?.data?.error) {
            return showMessage({
              message: `${resp?.error?.data?.error}`,
              type: "danger",
            });
          }
          if (resp?.data?.token !== null) {
            return navigation.replace("DashboardTab", {
              screen: "HomeDashboard",
            });
          }
        });
      } catch (error) {
        showMessage({
          message: `${error as string}`,
          type: "danger",
        });
      }
    }
  };
  return (
    <BlurryContainer shades="blur">
      <Box>
        <Box marginTop="Ml" paddingHorizontal="md">
          <Box>
            <TitleComponent
              handleBackPress={() => navigation.goBack()}
              title="Sign In"
            />
          </Box>
          <Box
            alignItems="center"
            borderRadius={100}
            justifyContent="center"
            marginBottom="lg"
          >
            <Image
              borderRadius={100}
              height={150}
              source={loginimg}
              width={150}
            />
          </Box>
          <EyeTextInput
            labelText="Username"
            properties={{
              autoComplete: "off",
              onChangeText: (text) => handleChange(text, "username"),
              placeholder: "hezhykeyhel",
              secureTextEntry: false,
              value: values?.username,
              variant: "subHeading",
            }}
          />
          <EyeTextInput
            labelText="Email address"
            properties={{
              autoComplete: "off",
              onChangeText: (text) => handleChange(text, "email"),
              placeholder: "hezhykeyhel@gmil.com",
              secureTextEntry: false,
              value: values?.email,
              variant: "subHeading",
            }}
          />
          <Box marginTop="xs">
            <EyeTextInput
              hasEyes
              labelText="Password"
              properties={{
                autoComplete: "off",
                onChangeText: (event: string) =>
                  handleChange(event, "password"),
                placeholder: "********",
                value: values.password,
                variant: "subHeading",
              }}
            />
          </Box>
          <Box marginHorizontal="md" marginTop="md">
            <Text variant="subHeading">Forgot password?</Text>
          </Box>
          <Box marginTop="xxl">
            <Button
              isloading={isLoading}
              label="Sign In"
              loadingText="Logging in..."
              onPress={handleSubmit}
            />
          </Box>
          {/* <Pressable
            alignItems="center"
            justifyContent="center"
            marginTop="lg"
            onPress={() => {}}
          >
            <Icon name="fingerprint" size={100} />
          </Pressable> */}
          <Box alignItems="center" justifyContent="center" marginTop="Ml">
            <Text variant="boldBody">
              Dont have an account?{" "}
              <Text
                onPress={() => navigation.navigate("UserSignUp")}
                variant="subHeading"
              >
                Sign Up
              </Text>
            </Text>
          </Box>
        </Box>
      </Box>
    </BlurryContainer>
  );
};

export default LoginOtherAccounts;
