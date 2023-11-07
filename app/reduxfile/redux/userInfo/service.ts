/* eslint-disable import/no-cycle */

import { api } from "../api";
import paths from "./path";
import { UserInfoResponse } from "./types";

export const fastamoniApi = api.injectEndpoints({
  endpoints: (build) => ({
    userInfo: build.query<UserInfoResponse, void>({
      keepUnusedDataFor: 5,
      query: (credentials) => ({
        body: credentials,
        method: "GET",
        url: paths.accountDetails,
      }),
    }),
  }),
});

export const { useLazyUserInfoQuery } = fastamoniApi;
