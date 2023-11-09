/* eslint-disable import/no-extraneous-dependencies */
import "./i18n";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@shopify/restyle";
import { focusManager } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { AppStateStatus } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ErrorBoundary } from "@/components/";
import { isWeb } from "@/constants/";
import theme from "@/constants/theme";
import { useAppState, useCachedResources, useOnlineManager } from "@/hooks/";
import Navigation from "@/navigation/";

import { persistor, store } from "./store/store";

function onAppStateChange(status: AppStateStatus) {
  if (!isWeb) {
    focusManager.setFocused(status === "active");
  }
}

export default function App() {
  enableScreens(true);
  useOnlineManager();
  useAppState(onAppStateChange);

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider theme={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <BottomSheetModalProvider>
                  <Navigation />
                  <FlashMessage
                    duration={3000}
                    position="top"
                    statusBarHeight={70}
                  />
                </BottomSheetModalProvider>
              </SafeAreaProvider>
              <StatusBar style="dark" />
            </GestureHandlerRootView>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
