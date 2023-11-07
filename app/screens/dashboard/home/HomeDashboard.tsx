/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-promise-executor-return */
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import Animated, {
  FadeInUp,
  Layout,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

import { exploreimg, exploreimg2, exploreimg3 } from "@/assets/images";
import { Box, Icon, Image, Pressable, Text } from "@/components/";
import LogoutModal from "@/components/Modals/Logout";
import { wptdp } from "@/constants/";
import { logout } from "@/reduxfile/redux/auth/slices";
import { useLazyUserInfoQuery } from "@/reduxfile/redux/userInfo/service";
import Dot from "@/screens/Onboarding/Dot";
import { RootState } from "@/store/store";

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const HomeDashboard = ({ navigation, route }) => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  const images = [exploreimg, exploreimg2, exploreimg3];
  const [getUserInfo, userInfoData] = useLazyUserInfoQuery();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleOpenModal = () => bottomSheetRef.current?.present();
  const handleCloseModal = () => bottomSheetRef.current?.dismiss();
  const [showPullDownToRefresh, setShowPullDownToRefresh] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const onRefresh = React.useCallback(() => {
    getUserInfo();
    wait(2000).then(() => setShowPullDownToRefresh(false));
  }, [getUserInfo]);

  const { userData } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isFocused && route.params && route.params.onRefresh) {
      route.params.onRefresh();
    }
    getUserInfo();
  }, [route.params]);

  return (
    <Box backgroundColor="white" flex={1} paddingTop="xl">
      <Box
        alignItems="center"
        alignSelf="center"
        justifyContent="center"
        paddingTop="xxl"
        position="absolute"
        top={20}
      >
        {showPullDownToRefresh && (
          <Animated.View
            entering={FadeInUp.delay(200)}
            layout={Layout.duration(200)}
          >
            <Box
              alignItems="center"
              backgroundColor="primary"
              borderRadius={4}
              justifyContent="center"
              padding="xs"
              // width={120}
            >
              <Text color="white" variant="body">
                Pull down to refresh
              </Text>
            </Box>
          </Animated.View>
        )}
      </Box>
      <Box>
        {/* Top navigation and title */}

        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="sm"
          paddingHorizontal="lg"
          paddingTop="xxl"
        >
          <Box alignItems="center" flexDirection="row">
            <Pressable onPress={() => navigation.navigate("ProfileScreen")}>
              <Icon name="no_profile" size={53} />
            </Pressable>
            <Text marginHorizontal="md" variant="header">
              Welcome,{" "}
              <Text textTransform="capitalize" variant="bigSubHeading">
                {/* {userInfoData?.data?.user?.first_name} */}
                Brooke
              </Text>
            </Text>
          </Box>
          <Pressable>
            <Icon color="primary" name="notify" size={40} />
          </Pressable>
        </Box>

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
          <Box flex={1}>
            {/* Animated images */}
            <Box alignItems="center" justifyContent="center" marginTop="md">
              <Animated.ScrollView
                bounces={false}
                horizontal
                onScroll={scrollHandler}
                pagingEnabled
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
              >
                {images.map((image, id) => (
                  <Pressable key={id}>
                    <Image
                      height={150}
                      key={id}
                      resizeMode="contain"
                      source={image}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 5,
                        transform: [{ scale: 0.9 }],
                      }}
                      width={wptdp(99)}
                    />
                  </Pressable>
                ))}
              </Animated.ScrollView>
            </Box>
            {/* Animated Dots  */}
            <Box>
              <Box
                alignItems="center"
                flexDirection="row"
                justifyContent="center"
                marginBottom="md"
                marginTop="md"
              >
                {images.map((_text, index) => (
                  <Dot index={index} key={index} translateX={translateX} />
                ))}
              </Box>
            </Box>
            {/* Quick Links  */}
            {/* <Box marginHorizontal="lg">
              <Box
                alignItems="center"
                flex={1}
                flexDirection="row"
                justifyContent="space-evenly"
              >
                {homeNavigation.slice(0, 2).map((item, index) => (
                  <ContentBox
                    boxStyle={{
                      marginVertical: "sm",
                    }}
                    icons={item.iconName}
                    key={index}
                    text={item.name}
                  />
                ))}
              </Box>
              <Box
                alignItems="center"
                flex={1}
                flexDirection="row"
                justifyContent="space-evenly"
              >
                {homeNavigation.slice(2, 4).map((item, index) => (
                  <ContentBox
                    boxStyle={{
                      marginVertical: "sm",
                    }}
                    icons={item.iconName}
                    key={index}
                    text={item.name}
                  />
                ))}
              </Box>
            </Box> */}
            <Box
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
              marginHorizontal="xl"
              marginTop="md"
            >
              <Text variant="subHeading">Recent transactions</Text>
              <Pressable onPress={() => navigation.navigate("HistoryLanding")}>
                <Text color="primary" variant="subHeading">
                  See all
                </Text>
              </Pressable>
            </Box>
            <Box marginHorizontal="xl" marginTop="sm">
              <Box>
                {/* <Box>
                  <TransactionContent
                    date={items.created_at}
                    key={index}
                    name={items.remarks}
                    price={items.amount}
                    priceStatus={items.status}
                    status={items.status}
                  />
                </Box> */}
              </Box>
            </Box>
          </Box>
          <LogoutModal
            bottomSheetModalRef={bottomSheetRef}
            handleClose={handleCloseModal}
            onProceed={() => {
              dispatch(logout());
              handleCloseModal();
            }}
          />
        </ScrollView>
      </Box>
    </Box>
  );
};

export default HomeDashboard;
