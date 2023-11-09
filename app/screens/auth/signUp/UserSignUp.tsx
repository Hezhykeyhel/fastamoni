/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Box, Button, Text } from "@/components/";
import BlurryContainer from "@/components/BlurryContainer";
import EyeTextInput from "@/components/EyeTextInput/EyeTextInput";
import TextInput from "@/components/TextInput";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { useRegisterMutation } from "@/reduxfile/redux/auth/service";

import { UserInitValues, UserValues } from "./uservalues/uservalues";

const UserSignUp = ({ navigation }) => {
  const [values, setValues] = useState<UserValues>(UserInitValues);
  const handleChange = (text: string, name: string) => {
    setValues({ ...values, [name]: text });
  };
  const [selectCategory, setSelectCategory] = useState(false);
  const [handleRegisterTrigger, result] = useRegisterMutation();

  const handleSubmit = async () => {
    if (!values.email) {
      return showMessage({
        message: "Enter your email address",
        type: "danger",
      });
    }

    if (!values.password) {
      return showMessage({
        message: "Enter your password",
        type: "danger",
      });
    }
    if (!values.password2) {
      return showMessage({
        message: "Re-enter your password",
        type: "danger",
      });
    }
    if (values.password2 !== values.password) {
      return showMessage({
        message: "Passwords do not match",
        type: "danger",
      });
    }
    await handleRegisterTrigger({
      email: values?.email,
      password: values?.password,
    }).then((resp: any) => {
      console.log(resp);
      if (resp?.data?.token !== null) {
        return navigation.replace("RegistrationWelcomePage");
      }
      return showMessage({
        message: `${resp?.error?.data?.error as string}`,
        type: "danger",
      });
    });
  };

  return (
    <BlurryContainer shades="blur">
      <Box marginTop="Ml" paddingHorizontal="md">
        <TitleComponent
          handleBackPress={() => navigation.goBack()}
          title="Sign Up"
        />
        <Box height={20} />
        <ScrollView
          scrollEnabled={!selectCategory}
          showsVerticalScrollIndicator={false}
        >
          <Box
            backgroundColor="lightGrey"
            borderRadius={100}
            height={70}
            marginBottom="sm"
            paddingHorizontal="md"
            paddingVertical="sm"
          >
            <Text color="textColorTint" variant="boldBody">
              Email Address
            </Text>
            <TextInput
              autoComplete="off"
              onChangeText={(text) => handleChange(text, "email")}
              placeholder="opeoluwasamuel@gmail.com"
              value={values.email}
              variant="boldBody"
            />
          </Box>
          <EyeTextInput
            hasEyes
            labelText="Password"
            properties={{
              autoComplete: "off",
              onChangeText: (event: string) => handleChange(event, "password"),
              placeholder: "********",
              value: values.password,
              variant: "subHeading",
            }}
          />
          <EyeTextInput
            hasEyes
            labelText="Confirm password"
            properties={{
              autoComplete: "off",
              onChangeText: (event: string) => handleChange(event, "password2"),
              placeholder: "********",
              value: values.password2,
              variant: "subHeading",
            }}
          />
          <Box height={40} />
          <Button
            isloading={result.isLoading}
            label="Sign Up"
            loadingText="Creating account..."
            onPress={handleSubmit}
          />
          <Box height={60} />
          <Text textAlign="center" variant="subHeading">
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate("UserSignIn")}
              variant="bigSubHeading"
            >
              Sign In
            </Text>
          </Text>
        </ScrollView>
      </Box>
    </BlurryContainer>
  );
};

export default UserSignUp;
