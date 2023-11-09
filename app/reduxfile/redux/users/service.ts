/* eslint-disable import/no-cycle */

import { api } from "../api";
import paths from "./paths";
import { GetUserResponse, UpdateProfileResponse } from "./types";

export const fastamoniApi = api.injectEndpoints({
  endpoints: (build) => ({
    getusers: build.query<GetUserResponse, void>({
      query: (page) => ({
        url: paths.getusers(page),
      }),
    }),
    updateProfile: build.mutation<UpdateProfileResponse, void>({
      query: (credentials) => ({
        body: credentials,
        method: "PATCH",
        url: paths.updateProfile(credentials),
      }),
    }),
  }),
});

export const { useUpdateProfileMutation, useLazyGetusersQuery } = fastamoniApi;
