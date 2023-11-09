import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";

import MainBottomTabs, { TabType } from "@/components/Layout/MainBottomTabs";
import HomeDashboard from "@/screens/dashboard/home/HomeDashboard";
import ProfileScreen from "@/screens/dashboard/profile/ProfileScreen";
import SettingsScreen from "@/screens/dashboard/settings/SettingsScreen";

import { MyTabRoutes } from "./types";

const Tab = createMaterialBottomTabNavigator<MyTabRoutes>();

const tabList: TabType<MyTabRoutes>[] = [
  {
    component: HomeDashboard,
    id: "131414",
    inactiveTabIcon: "inactive_home",
    name: "HomeDashboard",
    svgIconName: "active_home",
    tabText: "Home",
  },
  // {
  //   component: HistoryScreen,
  //   id: "4564667",
  //   inactiveTabIcon: "inactive_history",
  //   name: "HistoryLanding",
  //   svgIconName: "active_history",
  //   tabText: "History",
  // },
  {
    component: SettingsScreen,
    id: "686867",
    inactiveTabIcon: "inactive_settings",
    name: "SettingsLanding",
    svgIconName: "active_settings",
    tabText: "Settings",
  },
  {
    component: ProfileScreen,
    id: "8080898",
    inactiveTabIcon: "inactive_profile",
    name: "ProfileScreen",
    svgIconName: "active_profile",
    tabText: "Profile",
  },
];

export default function DashboardTab() {
  return <MainBottomTabs<MyTabRoutes> Tab={Tab} tabList={tabList} />;
}
