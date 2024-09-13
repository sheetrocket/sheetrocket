import { LoginFormData } from "../login/LoginFormData";
import axiosInstance from "./apiConfig";
import { AUTH_ENDPOINTS } from "./apiConfig";

// Success response from the login or signup endpoint
export interface AuthSuccessResponse {
  user: {
    id: string | number;
    email: string;
    name: string;
    avatar?: string; // Optional fields
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
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
export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

export const authService = {
  signup: (data: UserData) =>
    axiosInstance.post<AuthResponse>(AUTH_ENDPOINTS.signup, data),
  login: (data: LoginFormData) =>
    axiosInstance.post<AuthResponse>(AUTH_ENDPOINTS.login, data),
};
