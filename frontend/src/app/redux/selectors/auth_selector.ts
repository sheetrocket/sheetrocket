import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectError = (state: RootState): string | null =>
  state.auth.error;

// Selector to get the authentication state
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
