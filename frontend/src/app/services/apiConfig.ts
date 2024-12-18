import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("401 Error");
    }
    return Promise.reject(error);
  }
);

export const AUTH_ENDPOINTS = {
  signup: "/auth/register",
  login: "/auth/login",
  current_user: "/auth/current-user",
};

export default axiosInstance;
