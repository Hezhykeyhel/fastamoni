/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/consistent-destructuring */
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";

import { loginimg } from "@/assets/images";
import { Box, Button, Icon, Image, Pressable, Text } from "@/components/";
import BlurryContainer from "@/components/BlurryContainer";
import EyeTextInput from "@/components/EyeTextInput/EyeTextInput";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { useLoginMutation } from "@/reduxfile/redux/auth/service";
import { RootState } from "@/store/store";

type MyFormValues = {
  username: string;
  email: string;
  password: string;
};
const InitialValues: MyFormValues = {
  email: "",
  password: "",
  username: "",
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

  const [getValues, setGetValues] = useState<any>();

  const getItems = async () => {
    const storedCredentials = await AsyncStorage.getItem("credentials");
    setGetValues(JSON.parse(storedCredentials as any));
  };

  useEffect(() => {
    getItems();
  }, []);

  const checkBiometricAvailability = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    setCheckBiometrics(isBiometricAvailable);
  };

  console.log(JSON.stringify(userData));

  const checkBiometricAuthentication = async () => {
    const isBiometricSet = await LocalAuthentication.isEnrolledAsync();
    try {
      if (isBiometricSet) {
        const storedCredentials = await AsyncStorage.getItem("credentials");
        if (storedCredentials) {
          const credentials = JSON.parse(storedCredentials);
          const result = await LocalAuthentication.authenticateAsync();
          if (result.success) {
            const { email: storedEmail, password: storedPassword } =
              credentials;
            loginuser({
              email: storedEmail,
              password: storedPassword,
            }).then((resp: any) => {
              if (resp?.data?.token !== null)
                return navigation.replace("DashboardTab", {
                  screen: "HomeDashboard",
                });
            });
          }
        }
      }
    } catch (error: any) {
      return showMessage({
        message: `${error?.error?.data?.error as string}`,
        type: "danger",
      });
    }
    setcheckAuthenticate(false);
  };

  useEffect(() => {
    // checkBiometricAuthentication();
    checkBiometricAvailability();
  }, []);

  const handleSubmit = async () => {
    const isConnected = await checkNetworkConnectivity();
    if (isConnected) {
      try {
        if (isLoading) return;
        if (!values?.email || !values?.password) {
          return showMessage({
            message: "Please fill in all fields",
            type: "danger",
          });
        }
        const credentials = {
          email: values?.email,
          password: values?.password,
        };
        await AsyncStorage.setItem("credentials", JSON.stringify(credentials));
        console.log(credentials);
        await loginuser({
          email: values?.email,
          password: values?.password,
        }).then((resp: any) => {
          console.log(resp, "herer");
          if (resp?.data?.token !== null)
            return navigation.replace("DashboardTab", {
              screen: "HomeDashboard",
            });
        });
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const handleWelcomeBack = async () => {
    const isConnected = await checkNetworkConnectivity();
    if (isConnected) {
      try {
        if (isLoading) return;
        if (!welcomeback?.password) {
          return showMessage({
            message: "Please enter your registered password",
            type: "danger",
          });
        }
        await loginuser({
          email: getValues?.email as any,
          password: welcomeback?.password,
        }).then((resp: any) => {
          console.log(resp);
          if (resp?.data?.token !== null) {
            return navigation.replace("DashboardTab", {
              screen: "HomeDashboard",
            });
          }
        });
      } catch (error: any) {
        return showMessage({
          message: `${error?.error?.data?.error as string}`,
          type: "danger",
        });
      }
    }
  };

  return (
    <BlurryContainer shades="blur">
      <Box>
        {getValues === null && !isAuthenticated ? (
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
            {/* <EyeTextInput
              labelText="Username"
              properties={{
                autoComplete: "off",
                onChangeText: (text) => handleChange(text, "username"),
                placeholder: "hezhykeyhel",
                secureTextEntry: false,
                value: values?.username,
                variant: "subHeading",
              }}
            /> */}
            <EyeTextInput
              labelText="Email address"
              properties={{
                autoComplete: "off",
                onChangeText: (text) => handleChange(text, "email"),
                placeholder: "anonymous@gmail.com",
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
              <Text variant="boldBody">Forgot password?</Text>
            </Box>
            <Box marginTop="xxl">
              <Button
                isloading={isLoading}
                label="Sign In"
                loadingText="Logging in..."
                onPress={handleSubmit}
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
              <TitleComponent
                handleBackPress={() => navigation.goBack()}
                title="Sign In"
              />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              marginVertical="lg"
            >
              <Image height={200} source={loginimg} width={200} />
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
                {getValues?.username}
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
              <Text marginRight="sm" variant="subHeading">
                Forgot password?
              </Text>
              <Text
                color="purple"
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
    </BlurryContainer>
  );
};

export default Login;
