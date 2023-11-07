import { useRoute } from "@react-navigation/native";

import { AppNavScreenProps } from "@/navigation/";
import { AppNavRoutes } from "@/navigation/types";

function useAppRoute<Screen extends keyof AppNavRoutes>() {
  return useRoute<AppNavScreenProps<Screen>["route"]>();
}

export default useAppRoute;
