/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/consistent-destructuring */
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

import { loginimg } from "@/assets/images";
import { Box, Button, Icon, Image, Pressable, Text } from "@/components/";
import BlurryBottomContainer from "@/components/BlurryBottomContainer";
import EyeTextInput from "@/components/EyeTextInput/EyeTextInput";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { useLoginMutation } from "@/reduxfile/redux/auth/service";
import { RootState } from "@/store/store";

type MyFormValues = {
  email: string;
  password: string;
};
const InitialValues: MyFormValues = {
  email: "",
  password: "",
};

const checkNetworkConnectivity = async () => {
  const netInfo = await NetInfo.fetch();

  if (!netInfo.isConnected) {
    Toast.show({
      text1: "No network connection was detected, please try again",
      type: "error",
    });
    return false;
  }

  try {
    const response = await fetch("https://www.facebook.com");
    if (!response.ok) {
      Toast.show({
        text1: "Network failed",
        type: "error",
      });
      return false;
    }
  } catch {
    console.log("Network request failed");
    return false;
  }

  return true;
};

const Login = ({ navigation }) => {
  const { userData, isAuthenticated } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const [values, setValues] = useState<MyFormValues>(InitialValues);
  const [welcomeback, setWelcomeback] = useState<MyFormValues>(InitialValues);
  const [loginuser, data] = useLoginMutation();
  const { isLoading } = data;
  const handleChange = (text: string, name: string) => {
    setValues({ ...values, [name]: text });
  };
  const handleWelcomeChange = (text: string, name: string) => {
    setWelcomeback({ ...welcomeback, [name]: text });
  };

  const [checkAuthenticate, setcheckAuthenticate] = useState(false);
  const [checkBiometrics, setCheckBiometrics] = useState(false);

  const checkBiometricAvailability = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    setCheckBiometrics(isBiometricAvailable);
  };

  const checkBiometricAuthentication = async () => {
    const isBiometricSet = await LocalAuthentication.isEnrolledAsync();
    if (isBiometricSet) {
      const storedCredentials = await AsyncStorage.getItem("credentials");
      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        const result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
          const { email: storedEmail, password: storedPassword } = credentials;
          loginuser({
            email: storedEmail,
            password: storedPassword,
          }).then((resp: any) => {
            if (resp?.error?.data?.error !== null) {
              return Toast.show({
                text1: `${resp?.error?.data?.error as string}`,
                type: "error",
              });
            }
            // if (resp?.data?.accessToken !== null) {
            //   return navigation.replace("DashboardTab", {
            //     screen: "HomeDashboard",
            //   });
            // }
          });
        }
      }
    }
    setcheckAuthenticate(false);
  };

  useEffect(() => {
    // checkBiometricAuthentication();
    checkBiometricAvailability();
  }, []);

  const handleSubmit = async () => {
    const isConnected = await checkNetworkConnectivity();
    const credentials = { email: values?.email, password: values?.password };
    await AsyncStorage.setItem("credentials", JSON.stringify(credentials));
    console.log(credentials);
    if (isConnected) {
      try {
        if (isLoading) return;
        if (!values?.email || !values?.password) {
          return Toast.show({
            text1: "Please fill in all fields",
            type: "error",
          });
        }
        await loginuser({
          email: values?.email,
          password: values?.password,
        }).then((resp: any) => {
          console.log(resp);
          if (resp?.error?.data?.error !== null) {
            return Toast.show({
              text1: `${resp?.error?.data?.error as string}`,
              type: "error",
            });
          }
          return navigation.replace("DashboardTab", {
            screen: "HomeDashboard",
          });
        });
      } catch (error: any) {
        Toast.show({
          text1: `${error?.error?.data?.error as string}`,
          type: "error",
        });
      }
    }
  };

  const handleWelcomeBack = async () => {
    const isConnected = await checkNetworkConnectivity();
    if (isConnected) {
      try {
        if (isLoading) return;
        if (!welcomeback?.password) {
          return Toast.show({
            text1: "Please enter your registered password",
            type: "error",
          });
        }
        await loginuser({
          email: userData?.email as string,
          password: welcomeback?.password,
        }).then((resp: any) => {
          console.log(resp);
          if (resp?.error?.status === 401 || resp?.error?.status === 500) {
            return Toast.show({
              text1: `${resp?.error?.data?.message as string}`,
              type: "error",
            });
          }
          if (resp?.data?.accessToken !== null) {
            return navigation.replace("DashboardTab", {
              screen: "HomeDashboard",
            });
          }
        });
      } catch (error) {
        return Toast.show({
          text1: `${error as string}`,
          type: "error",
        });
      }
    }
  };

  return (
    <BlurryBottomContainer shades="bottomBlur">
      <Box>
        {userData?.account_number === undefined && !isAuthenticated ? (
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
              <Image height={250} source={loginimg} width={250} />
            </Box>
            <EyeTextInput
              labelText="Email address"
              properties={{
                autoComplete: "off",
                onChangeText: (text) => handleChange(text, "email"),
                placeholder: "opeoluwasamuel@gmail.com",
                secureTextEntry: false,
                value: values?.email,
                variant: "subHeading",
              }}
            />
            <Box marginTop="sm">
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
              <Text
                onPress={() => navigation.navigate("ResetPin")}
                variant="boldBody"
              >
                Forgot password?
              </Text>
            </Box>
            <Box marginTop="xxl">
              <Button
                isloading={isLoading}
                label="Sign In"
                loadingText="Logging in..."
                // onPress={handleSubmit}
                onPress={() =>
                  navigation.replace("DashboardTab", {
                    screen: "HomeDashboard",
                  })
                }
              />
            </Box>

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
        ) : (
          <Box marginTop="xxl" paddingHorizontal="md">
            <Box>
              <TitleComponent handleBackPress={() => {}} title="Sign In" />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              marginVertical="lg"
            >
              <Image height={127} source={loginimg} width={127} />
            </Box>
            <Box alignItems="center" justifyContent="center">
              <Text marginBottom="xs" variant="header">
                Welcome Back
              </Text>
              <Text
                color="textColorTint"
                textTransform="capitalize"
                variant="subHeading"
              >
                {`${userData?.first_name} ${userData?.last_name}`}
              </Text>
            </Box>
            <Box marginTop="lg">
              <EyeTextInput
                hasEyes
                labelText="Password"
                properties={{
                  autoComplete: "off",
                  onChangeText: (event: string) =>
                    handleWelcomeChange(event, "password"),
                  placeholder: "********",
                  value: welcomeback.password,
                  variant: "subHeading",
                }}
              />
            </Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginHorizontal="md"
              marginTop="xs"
            >
              <Text
                marginRight="sm"
                onPress={() => navigation.navigate("ResetPin")}
                variant="subHeading"
              >
                Forgot password?
              </Text>
              <Text
                color="primary"
                onPress={() => navigation.navigate("LoginAnotherUser")}
                variant="subHeading"
              >
                Login another account ?
              </Text>
            </Box>
            <Box marginTop="xxl">
              <Button
                disabled={data.isLoading}
                isloading={isLoading}
                label="Sign In"
                loadingText="Logging in..."
                onPress={handleWelcomeBack}
              />
            </Box>

            <Box>
              <Pressable
                alignItems="center"
                disabled={data.isLoading}
                justifyContent="center"
                marginTop="lg"
                onPress={checkBiometricAuthentication}
              >
                <Icon name="fingerprint" size={100} />
              </Pressable>
            </Box>

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
        )}
      </Box>
    </BlurryBottomContainer>
  );
};

export default Login;
