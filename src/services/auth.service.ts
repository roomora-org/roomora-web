import api from "./api";
import type {
  LoginCredentials,
  RegisterStepOne,
  AuthResponse,
  ForgotPasswordData,
  User,
} from "@/types";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);
    return data;
  },

  async registerStepOne(data: RegisterStepOne): Promise<{ message: string }> {
    const { data: response } = await api.post<{ message: string }>(
      "/auth/register",
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }
    );
    return response;
  },

  async verifyEmail(token: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/verify-email", {
      token,
    });
    return data;
  },

  async resendVerification(email: string): Promise<{ message: string }> {
    const { data } = await api.post<{ message: string }>(
      "/auth/resend-verification",
      { email }
    );
    return data;
  },

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    const { data: response } = await api.post<{ message: string }>(
      "/auth/forgot-password",
      data
    );
    return response;
  },

  async resetPassword(data: {
    token: string;
    password: string;
    confirmPassword: string;
  }): Promise<{ message: string }> {
    const { data: response } = await api.post<{ message: string }>(
      "/auth/reset-password",
      data
    );
    return response;
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await api.get<User>("/auth/me");
      return data;
    } catch {
      return null;
    }
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });
    return data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },
};