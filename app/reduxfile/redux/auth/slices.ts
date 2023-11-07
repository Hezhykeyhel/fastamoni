/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";

import { fastamoniApi } from "./service";
import { AuthResponse } from "./services.types";

export interface LoginInitialState {
  status: "login" | "login-success" | "login-error" | "idle";
  userData: AuthResponse["user"] | null;
  token: AuthResponse["access_token"] | null;
  isAuthenticated: boolean;
}

const initState: LoginInitialState = {
  isAuthenticated: false,
  status: "idle",
  token: null,
  userData: null,
};

export const userSlice = createSlice({
  extraReducers: (builder) => {
    builder.addMatcher(fastamoniApi.endpoints.login.matchPending, (state) => {
      state.status = "login";
    });
    builder.addMatcher(
      fastamoniApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const { user, access_token } = payload;
        if (user === null) {
          state.status = "login-error";
          state.isAuthenticated = false;
          state.token = null;
          return;
        }
        state.status = "login-success";
        state.isAuthenticated = true;
        state.userData = user;
        state.token = access_token;
      },
    );
    builder.addMatcher(fastamoniApi.endpoints.login.matchRejected, (state) => {
      state.status = "login-error";
      state.isAuthenticated = false;
    });
  },
  initialState: initState,
  name: "userAuth",

  reducers: {
    login: (state) => {
      state.status = "login";
    },
    loginError: (state) => {
      state.status = "login-error";
      state.isAuthenticated = false;
    },
    loginSuccess: (state) => {
      state.status = "login-success";
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.status = "idle";
    },
  },
});

export const { logout, login, loginSuccess, loginError } = userSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export default userSlice.reducer;
