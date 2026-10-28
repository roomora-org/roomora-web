import axios from "axios";
import { getToken, clearToken } from "@/lib/auth-storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 20_000,
});

api.interceptors.request.use(
  (config) => {
    // If offline, fail fast with a clear error
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      return Promise.reject(
        new axios.AxiosError(
          "You are offline. Please check your internet connection.",
          "ERR_NETWORK",
          config as any
        )
      );
    }

    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url: string = error.config?.url ?? "";
      const isAuthEndpoint =
        url.includes("/auth/login") ||
        url.includes("/auth/register") ||
        url.includes("/auth/forgot-password") ||
        url.includes("/auth/reset-password") ||
        url.includes("/auth/verify-email") ||
        url.includes("/auth/resend-verification");

      if (!isAuthEndpoint) {
        clearToken();
        const authPages = [
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/verify-email",
        ];
        if (
          !authPages.some((page) =>
            window.location.pathname.startsWith(page)
          )
        ) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;