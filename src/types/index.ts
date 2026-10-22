// ==========================================
// Auth Types
// ==========================================

export type AccountType = "PLATFORM_ADMIN" | "HOTEL_EMPLOYEE";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  accountType: AccountType;
  hotelId?: string;
  roleId?: string;
  emailVerified: boolean;
  onboardingCompleted: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterStepOne {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface HotelProfile {
  hotelName: string;
  city: string;
  country: string;
  address: string;
  starRating: number;
  hotelPhone: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export interface ForgotPasswordData {
  email: string;
}