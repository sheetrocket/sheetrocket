import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectSignupError = (state: RootState): string | null =>
  state.auth.signupError;

export const selectLoginError = (state: RootState): string | null =>
  state.auth.loginError;
