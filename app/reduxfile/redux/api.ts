/* eslint-disable import/no-cycle */
/* eslint-disable no-unsafe-optional-chaining */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getBaseUrl } from "../../store/service/baseUrl";
import { RootState } from "../../store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl("baseurl"),
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).user.token;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
  reducerPath: "fastamoni",
  tagTypes: ["fastamoni"],
});
