/* eslint-disable unicorn/prefer-module */
/* eslint-disable global-require */
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          //   Require local fonts
          "aquire-bd": require("../assets/fonts/AquireBold-8Ma60.ttf"),
          "harmonia-bd": require("../assets/fonts/HarmoniaSansProCyr-Bold.ttf"),
          "harmonia-rg": require("../assets/fonts/HarmoniaSansProCyr-Regular.ttf"),
          "harmonia-sbd": require("../assets/fonts/HarmoniaSansProCyr-SemiBd.ttf"),
        });
      } catch (error) {
        // We might want to provide this error information to an error reporting service
        // eslint-disable-next-line no-console
        console.warn(error);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
