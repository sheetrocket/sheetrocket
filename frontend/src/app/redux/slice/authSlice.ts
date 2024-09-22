import { LoginFormData } from "@/app/login/LoginFormData";
import {
  AuthErrorResponse,
  authService,
  CurrentUserSuccessResponse,
  LoginSuccessResponse,
  SignupSuccessResponse,
  UserData,
} from "@/app/services/authService";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

interface AuthState {
  user: CurrentUserSuccessResponse["user"] | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Type guard function to check if the response is a SignupSuccessResponse
function isSignupSuccessResponse(
  response: SignupSuccessResponse | AuthErrorResponse
): response is SignupSuccessResponse {
  return (response as SignupSuccessResponse).user !== undefined;
}

// Signup async thunk
export const signup = createAsyncThunk<
  SignupSuccessResponse,
  UserData,
  { rejectValue: AuthErrorResponse }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<SignupSuccessResponse | AuthErrorResponse> =
      await authService.signup(data);
    if (isSignupSuccessResponse(response.data)) {
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

// Type guard function to check if the response is a LoginSuccessResponse
function isLoginSuccessResponse(
  response: LoginSuccessResponse | AuthErrorResponse
): response is LoginSuccessResponse {
  return (response as LoginSuccessResponse).accessToken !== undefined;
}

// Login async thunk
export const login = createAsyncThunk<
  LoginSuccessResponse,
  LoginFormData,
  { rejectValue: AuthErrorResponse }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<LoginSuccessResponse | AuthErrorResponse> =
      await authService.login(data);
    if (isLoginSuccessResponse(response.data)) {
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

// Type guard function to check if the response is a LoginSuccessResponse
function isCurrentUserSuccessResponse(
  response: CurrentUserSuccessResponse | AuthErrorResponse
): response is CurrentUserSuccessResponse {
  return (response as CurrentUserSuccessResponse).user !== undefined;
}

// Fetch current user async thunk
export const fetchCurrentUser = createAsyncThunk<
  CurrentUserSuccessResponse,
  void,
  { rejectValue: AuthErrorResponse }
>("auth/current-user", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<
      CurrentUserSuccessResponse | AuthErrorResponse
    > = await authService.currentUser();

    if (isCurrentUserSuccessResponse(response.data)) {
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
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      signup.fulfilled,
      (state, action: PayloadAction<SignupSuccessResponse>) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
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
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginSuccessResponse>) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(
      login.rejected,
      (state, action: PayloadAction<AuthErrorResponse | undefined>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Login Failed";
      }
    );

    // Fetch current user
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<CurrentUserSuccessResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(
      fetchCurrentUser.rejected,
      (state, action: PayloadAction<AuthErrorResponse | undefined>) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch user";
      }
    );
  },
});

// Export actions and reducer
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
