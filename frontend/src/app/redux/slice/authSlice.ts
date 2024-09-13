import { LoginFormData } from "@/app/login/LoginFormData";
import {
  AuthErrorResponse,
  authService,
  AuthSuccessResponse,
  UserData,
} from "@/app/services/authService";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

interface AuthState {
  user: AuthSuccessResponse["user"] | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
};

// Type guard function to check if the response is an AuthSuccessResponse
function isAuthSuccessResponse(
  response: AuthSuccessResponse | AuthErrorResponse
): response is AuthSuccessResponse {
  return (response as AuthSuccessResponse).user !== undefined;
}

// Signup async thunk
export const signup = createAsyncThunk<
  AuthSuccessResponse,
  UserData,
  { rejectValue: AuthErrorResponse }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<AuthSuccessResponse | AuthErrorResponse> =
      await authService.signup(data);
    if (isAuthSuccessResponse(response.data)) {
      return response.data;
    } else {
      return rejectWithValue(response.data as AuthErrorResponse);
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data as AuthErrorResponse);
    } else {
      return rejectWithValue({
        message: "Something went wrong",
        error: "UnexpectedError",
        statusCode: 500,
      });
    }
  }
});

// Login async thunk
export const login = createAsyncThunk<
  AuthSuccessResponse,
  LoginFormData,
  { rejectValue: AuthErrorResponse }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<AuthSuccessResponse | AuthErrorResponse> =
      await authService.login(data);
    if (isAuthSuccessResponse(response.data)) {
      return response.data;
    } else {
      return rejectWithValue(response.data as AuthErrorResponse);
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data as AuthErrorResponse);
    } else {
      return rejectWithValue({
        message: "Something went wrong",
        error: "UnexpectedError",
        statusCode: 500,
      });
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      signup.fulfilled,
      (state, action: PayloadAction<AuthSuccessResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      }
    );
    builder.addCase(
      signup.rejected,
      (state, action: PayloadAction<AuthErrorResponse | undefined>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Signup failed";
      }
    );

    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<AuthSuccessResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      }
    );
    builder.addCase(
      login.rejected,
      (state, action: PayloadAction<AuthErrorResponse | undefined>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Login failed";
      }
    );
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
