/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-promise-executor-return */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import Animated, {
  FadeInUp,
  Layout,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { exploreimg, exploreimg2, exploreimg3 } from "@/assets/images";
import { Box, Icon, Image, Pressable, Text } from "@/components/";
import BlurryContainer from "@/components/BlurryContainer";
import TransactionContent from "@/components/Content/TransactionContent";
import { wptdp } from "@/constants/";
import { useLazyGetusersQuery } from "@/reduxfile/redux/users/service";
import Dot from "@/screens/Onboarding/Dot";

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const HomeDashboard = ({ navigation, route }) => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  const images = [exploreimg, exploreimg2, exploreimg3];
  const [pages, setPages] = useState<any>(1);
  const [
    getUserInfo,
    { data, isLoading: userInfoLoading, isFetching: userInforIsFetching },
  ] = useLazyGetusersQuery();

  const [showPullDownToRefresh, setShowPullDownToRefresh] = useState(false);
  const isFocused = useIsFocused();
  const [getValues, setGetValues] = useState<any>();

  const getItems = async () => {
    const storedCredentials = await AsyncStorage.getItem("credentials");
    setGetValues(JSON.parse(storedCredentials as any));
  };

  useEffect(() => {
    getItems();
    getUserInfo(pages);
  }, [getUserInfo, pages]);

  useEffect(() => {
    if (route.params && route.params.onRefresh) {
      route.params.onRefresh();
    }
    getUserInfo();
  }, [route.params]);

  const onRefresh = React.useCallback(() => {
    getUserInfo(pages);
    wait(2000).then(() => setShowPullDownToRefresh(false));
  }, [getUserInfo, pages]);

  return (
    <BlurryContainer shades="blur">
      <Box
        alignItems="center"
        alignSelf="center"
        justifyContent="center"
        paddingTop="xxl"
        position="absolute"
        top={40}
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
            >
              <Text color="white" variant="body">
                Pull down to refresh
              </Text>
            </Box>
          </Animated.View>
        )}
      </Box>
      <Box flex={1}>
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
                {getValues?.username}
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
            if (y > 80) {
              setShowPullDownToRefresh(true);
            }
            if (y > 30 && showPullDownToRefresh) {
              setShowPullDownToRefresh(false);
            }
          }}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={userInfoLoading || userInforIsFetching}
            />
          }
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
            <Box
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
              marginHorizontal="xl"
              marginTop="md"
            >
              <Text variant="subHeading">Users List</Text>
            </Box>
            <Box marginHorizontal="xl" marginTop="sm">
              {userInforIsFetching && (
                <ActivityIndicator color="black" size={20} />
              )}
              {data?.data?.map((items) => (
                <TransactionContent
                  email={items.email}
                  handleClick={() => {
                    navigation.navigate("HistoryScreen", {
                      screen: "HistoryLanding",
                      values: items,
                    });
                  }}
                  image={items.avatar}
                  key={items.id}
                  name={`${items.first_name} ${items.last_name}`}
                />
              ))}
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </BlurryContainer>
  );
};

export default HomeDashboard;
