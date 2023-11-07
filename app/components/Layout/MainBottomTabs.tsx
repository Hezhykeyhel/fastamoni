/* eslint-disable react/no-array-index-key */
import {
  MaterialBottomTabNavigationEventMap,
  MaterialBottomTabNavigationOptions,
} from "@react-navigation/material-bottom-tabs";
import { MaterialBottomTabNavigationConfig } from "@react-navigation/material-bottom-tabs/lib/typescript/src/types";
import {
  DefaultNavigatorOptions,
  ParamListBase,
  TabNavigationState,
  TabRouterOptions,
  TypedNavigator,
} from "@react-navigation/native";
import React from "react";
import { Platform } from "react-native";

import { palette } from "@/constants/theme";

import Box from "../Box";
import Icon, { IconName } from "../Icon";
import Text from "../Text";

export type TabType<K> = {
  tabText: string;
  id: string;
  inactiveTabIcon: IconName;
  name: keyof K;
  svgIconName: IconName;
  component: React.FC;
};

type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  MaterialBottomTabNavigationOptions,
  MaterialBottomTabNavigationEventMap
> &
  TabRouterOptions &
  MaterialBottomTabNavigationConfig;

type BottomTabPropsType<T extends ParamListBase> = {
  Tab: TypedNavigator<
    T,
    TabNavigationState<ParamListBase>,
    MaterialBottomTabNavigationOptions,
    MaterialBottomTabNavigationEventMap,
    ({
      id,
      backBehavior,
      children,
      screenListeners,
      screenOptions,
      ...rest
    }: Props) => JSX.Element
  >;
  tabList: TabType<T>[];
};

function MainBottomTabs<T extends ParamListBase>({
  Tab,
  tabList,
}: BottomTabPropsType<T>) {
  //   const { spacing } = useTheme();

  return (
    <Tab.Navigator
      barStyle={{
        backgroundColor: palette.white,
      }}
      labeled={false}
      sceneAnimationEnabled={false}
      shifting={false}
    >
      {tabList.map((tab, index) => (
        <Tab.Screen
          component={tab.component}
          key={index}
          name={tab.name}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused }) => (
              <Box
                alignItems="center"
                backgroundColor="white"
                justifyContent="center"
                key={tab.id}
              >
                <Box
                  alignItems="center"
                  backgroundColor="white"
                  justifyContent="center"
                  width={Platform.OS === "ios" ? 100 : 200}
                >
                  <Icon
                    name={focused ? tab.svgIconName : tab.inactiveTabIcon}
                  />
                  <Text
                    color={focused ? "primary" : "textColor"}
                    marginTop="xs"
                    variant={focused ? "subHeading" : "body"}
                  >
                    {tab.tabText}
                  </Text>
                </Box>
              </Box>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default MainBottomTabs;
