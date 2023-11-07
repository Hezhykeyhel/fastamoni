import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    AppState.addEventListener("change", onChange);
    return () => {
      AppState.addEventListener("change", onChange);
    };
  }, [onChange]);
}

export default useAppState;
