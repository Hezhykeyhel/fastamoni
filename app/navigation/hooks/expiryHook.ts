/* eslint-disable no-unsafe-optional-chaining */
import React from "react";
import { useSelector } from "react-redux";

import { useRefreshTokenMutation } from "@/reduxfile/redux/auth/service";
import { RootState } from "@/store/store";

export default function useExpiryHook() {
  const { smartUserAuthenticated, tokenDetails } = useSelector(
    (state: RootState) => state.user,
  );

  const [triggerRefresh] = useRefreshTokenMutation();
  let timeOut: NodeJS.Timeout;
  React.useEffect(() => {
    if (!smartUserAuthenticated) {
      clearTimeout(timeOut);
    }
    if (tokenDetails.exp === 0) {
      return;
    }
    const absoluteDifference = Math.abs(tokenDetails?.exp * 1000 - Date.now());

    timeOut = setTimeout(() => {
      triggerRefresh();
      console.log("Refreshing Token");
    }, absoluteDifference - 5000);
  }, [tokenDetails?.exp]);
  console.log(
    Math.abs(tokenDetails?.exp * 1000 - Date.now()),
    Date.now(),
    tokenDetails.exp,
  );
  return {
    isAuthenticated: false,
  };
}
