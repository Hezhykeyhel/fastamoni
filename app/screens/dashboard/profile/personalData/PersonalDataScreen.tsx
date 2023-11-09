/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

import { Box, Button, Icon, Image } from "@/components/";
import BlurryContainer from "@/components/BlurryContainer";
import EyeTextInput from "@/components/EyeTextInput/EyeTextInput";
import DropDown from "@/components/Modals/DropDown";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { useUpdateProfileMutation } from "@/reduxfile/redux/users/service";

import { UpdateProfile, UpdateProfileInitValues } from "./types/profileTypes";

const PersonalDataScreen = ({ navigation }) => {
  const countries = ["Nigeria", "Cote d'ivoire", "Egypt", "Norway", "England"];
  const [selectCategory] = useState(false);
  const [values, setValues] = useState<UpdateProfile>(UpdateProfileInitValues);
  const handleChange = (text: string, name: string) => {
    setValues({ ...values, [name]: text });
  };
  const [updateProfile, data] = useUpdateProfileMutation();
  const { isLoading, data: updateData } = data;
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [hasGalleryPermission, setHasGalleryPermission] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const getFileInfo = async (fileURI: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    return fileInfo;
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) return;

      const { canceled, assets } = result;
      const fileInfo = await getFileInfo(assets[0].uri);

      if (!fileInfo?.exists) {
        Toast.show({
          position: "top",
          text1: "Oh no !!! an error occurred",
          type: "error",
        });
        return;
      }

      if (!canceled) {
        let response = assets[0].uri;
        if (Platform.OS === "ios") {
          response = response.replace("file:///", "").replace("file://", "");
          response = response.replaceAll("%20", " ");
          setImage(response);
          Toast.show({
            text1: "Yippie !!! Image successfully uploaded",
            type: "success",
          });
        }
        Toast.show({
          text1: "Yippie !!! Image successfully uploaded",
          type: "success",
        });
        setImage(assets[0].uri);
      }
      // Save or process with the result.assets[0].uri
    } catch (error) {
      Toast.show({
        text1: `${error as string}`,
        type: "warning",
      });
    }
  };

  const triggerUpdateProfile = () => {
    try {
      if (!values?.first_name) {
        return Toast.show({
          text1: "Please enter your first name",
          type: "error",
        });
      }
      if (!values?.email) {
        return Toast.show({
          text1: "Please enter your email",
          type: "error",
        });
      }
      if (!values?.country) {
        return Toast.show({
          text1: "Please enter your country",
          type: "error",
        });
      }
      updateProfile({
        country: values?.country,
        email: values?.email,
        first_name: values?.first_name,
      }).then((response: any) => {
        if (response?.data?.message === "User updated successfully") {
          setValues({
            country: "",
            email: "",
            first_name: "",
          });
          return navigation.navigate("PersonalDataSuccess");
        }
        if (response?.data?.message !== "User updated successfully") {
          Toast.show({
            text1: "Something went wrong, please try again",
            type: "error",
          });
        }
      });
    } catch (error) {
      Toast.show({
        text1: `${error as string}`,
        type: "error",
      });
    }
  };

  return (
    <BlurryContainer shades="blur">
      <Box marginHorizontal="md" marginTop="Ml">
        <TitleComponent
          handleBackPress={() => navigation.goBack()}
          title="Personal Data"
        />
        <ScrollView
          scrollEnabled={!selectCategory}
          showsVerticalScrollIndicator={false}
        >
          <Box alignItems="center" justifyContent="center" marginTop="lg">
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ borderRadius: 100, height: 100, width: 100 }}
              />
            ) : (
              <Icon name="no_profile" size={95} />
            )}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={pickImage}
              style={{
                marginLeft: 60,
                marginTop: -30,
              }}
            >
              <Icon name="edit_photo" size={50} />
            </TouchableOpacity>
          </Box>
          <Box marginTop="lg">
            <EyeTextInput
              labelText="First name"
              properties={{
                onChangeText: (event: string) =>
                  handleChange(event, "first_name"),
                placeholder: "Opeoluwa",
                secureTextEntry: false,
                value: values?.first_name,
                variant: "subHeading",
              }}
            />
            <EyeTextInput
              labelText="Email address"
              properties={{
                onChangeText: (event: string) => handleChange(event, "email"),
                placeholder: "opeoluwasamuel@gmail.com",
                secureTextEntry: false,
                value: values?.email,
                variant: "subHeading",
              }}
            />
          </Box>
          <DropDown
            defaultSubheading="Choose country"
            label="Country"
            listItems={countries}
            selected={values?.country}
            setSelected={(text: string) => handleChange(text, "country")}
          />
          <Box height={70} />
          <Button
            disabled={isLoading}
            isloading={isLoading}
            label="Update"
            loadingText="Updating profile..."
            onPress={triggerUpdateProfile}
          />
          <Toast />
        </ScrollView>
      </Box>
    </BlurryContainer>
  );
};

export default PersonalDataScreen;
