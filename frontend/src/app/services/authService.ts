import { LoginFormData } from "../auth/login/LoginFormData";
import axiosInstance from "./apiConfig";
import { AUTH_ENDPOINTS } from "./apiConfig";

export interface SignupSuccessResponse {
  user: {
    id: string | number;
    email: string;
    name: string;
    avatar?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

export interface LoginSuccessResponse {
  accessToken: string;
}

export interface CurrentUserSuccessResponse {
  user: {
    id: number;
    name: string;
    avatar?: string;
    email: string;
    password: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

// Error response when a user already exists or other conflict
export interface AuthErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
}

// A union type that can represent either a success or error response
export type SignupResponse = SignupSuccessResponse | AuthErrorResponse;
export type LoginResponse = LoginSuccessResponse | AuthErrorResponse;
export type CurrentUserResponse =
  | CurrentUserSuccessResponse
  | AuthErrorResponse;

export const authService = {
  signup: (data: UserData) =>
    axiosInstance.post<SignupResponse>(AUTH_ENDPOINTS.signup, data),
  login: (data: LoginFormData) =>
    axiosInstance.post<LoginResponse>(AUTH_ENDPOINTS.login, data),
  currentUser: () =>
    axiosInstance.get<CurrentUserResponse>(AUTH_ENDPOINTS.current_user),
};
