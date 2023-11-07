/* eslint-disable react/no-array-index-key */
/* eslint-disable no-promise-executor-return */
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useDispatch } from "react-redux";

import { Box, Icon, Pressable, Text } from "@/components/";
import LogoutModal from "@/components/Modals/Logout";
import Tile from "@/components/Tile";
import TitleComponent from "@/components/TitleComponent/TitleComponent";
import { logout } from "@/reduxfile/redux/auth/slices";
import { useLazyUserInfoQuery } from "@/reduxfile/redux/userInfo/service";

import { profileNavigation } from "./data/data";

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const ProfileScreen = ({ navigation }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenModal = () => bottomSheetRef.current?.present();
  const handleCloseModal = () => bottomSheetRef.current?.dismiss();
  const dispatch = useDispatch();
  const [getUserInfo, userInfoData] = useLazyUserInfoQuery();
  const [showPullDownToRefresh, setShowPullDownToRefresh] = useState(false);

  const onRefresh = React.useCallback(() => {
    getUserInfo();
    wait(2000).then(() => setShowPullDownToRefresh(false));
  }, [getUserInfo]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);
  return (
    <Box backgroundColor="white">
      <Box marginTop="Ml" paddingHorizontal="lg">
        <TitleComponent
          handleBackPress={() => navigation.goBack()}
          title="Profile"
        />
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
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={userInfoData?.isLoading || userInfoData.isFetching}
            />
          }
          scrollEventThrottle={20}
          showsVerticalScrollIndicator={false}
        >
          <Box
            alignItems="center"
            alignSelf="center"
            justifyContent="center"
            paddingTop="xxl"
            position="absolute"
            top={-8}
          />
          <Box alignItems="center" justifyContent="center" marginTop="lg">
            <Icon name="no_profile" size={95} />
            <Text fontSize={30} textTransform="capitalize" variant="header">
              Tommy Brooke
              {/* {`${userInfoData?.data?.user?.first_name} ${userInfoData?.data?.user?.last_name}`} */}
            </Text>
            <Text variant="boldBody">
              {/* {`${userInfoData?.data?.user?.email}`} */}
              Tommybrooke@gmail.com
            </Text>
          </Box>
          <Box marginTop="lg">
            <Tile
              icon="right_arrow"
              onProceed={() => navigation.navigate("PersonalDataScreen")}
              text="Edit Personal Data"
            />
            <Box marginHorizontal="md" marginVertical="xxs">
              <Text color="textColorTint" variant="subHeading">
                General Settings
              </Text>
            </Box>
            <Box>
              {profileNavigation.map((data, id) => (
                <Tile
                  icon={data.icon}
                  key={id}
                  onProceed={data.onClick}
                  text={data.text}
                />
              ))}
              <Box alignItems="center" justifyContent="center">
                <Pressable
                  alignItems="center"
                  backgroundColor="black"
                  borderRadius={100}
                  height={60}
                  justifyContent="center"
                  marginVertical="md"
                  onPress={handleOpenModal}
                  width={360}
                >
                  <Text
                    color="white"
                    marginHorizontal="md"
                    variant="subHeading"
                  >
                    Log Out
                  </Text>
                </Pressable>
              </Box>
            </Box>
          </Box>
          <Box height={120} />
        </ScrollView>
        <LogoutModal
          bottomSheetModalRef={bottomSheetRef}
          handleClose={handleCloseModal}
          onProceed={() => {
            dispatch(logout());
            handleCloseModal();
          }}
        />
      </Box>
    </Box>
  );
};

export default ProfileScreen;
