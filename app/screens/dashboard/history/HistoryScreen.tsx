/* eslint-disable no-promise-executor-return */
/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { ScrollView } from "react-native";
import Animated, { FadeInRight, Layout } from "react-native-reanimated";

import { Box, Text } from "@/components/";
import TitleComponent from "@/components/TitleComponent/TitleComponent";

const wait = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const HistoryScreen = ({ navigation }) => {
  // const [triggerTransaction, result] = useLazyTransactionsQuery();
  // const { isLoading, data: transactions, isFetching } = result;
  const [showPullDownToRefresh, setShowPullDownToRefresh] = useState(false);

  // const onRefresh = React.useCallback(() => {
  //   triggerTransaction();
  //   wait(4000).then(() => setShowPullDownToRefresh(false));
  // }, [triggerTransaction]);
  // useEffect(() => {
  //   triggerTransaction();
  // }, [triggerTransaction]);

  return (
    <Box flex={1}>
      <Box marginTop="Ml" paddingHorizontal="lg">
        <TitleComponent
          handleBackPress={() => navigation.goBack()}
          title="Transactions"
        />
        <Box backgroundColor="white" borderRadius={20} height="90%">
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
            <Box marginHorizontal="md" marginTop="sm">
              {/* {isLoading || isFetching ? (
                <ActivityIndicator
                  color="black"
                  size={25}
                  style={{ marginTop: 20 }}
                />
              ) : ( */}
              {/* <Box>
                  {transactions?.data?.map((items, index) => (
                    <TransactionContent
                      date={items.created_at}
                      key={index}
                      name={items.remarks}
                      price={items.amount}
                      priceStatus={items.status}
                      status={items.status}
                    />
                  ))}
                </Box>
              )}  */}
            </Box>
          </ScrollView>
        </Box>
      </Box>
      <Box height={100} />
    </Box>
  );
};

export default HistoryScreen;
