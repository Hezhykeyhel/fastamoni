/* eslint-disable import/no-cycle */

import { api } from "../api";
import paths from "./paths";
import { UpdateProfileRequest, UpdateProfileResponse } from "./types";

export const fastamoniApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateProfile: build.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (credentials) => ({
        body: credentials,
        method: "POST",
        url: paths.updateProfile(credentials),
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = fastamoniApi;
