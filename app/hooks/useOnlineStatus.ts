import { useNetInfo } from "@react-native-community/netinfo";

function useOnlineStatus() {
  const netInfo = useNetInfo();

  return !(netInfo.type !== "unknown" && netInfo.isInternetReachable === false);
}

export default useOnlineStatus;
