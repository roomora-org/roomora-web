import type {
  LoginCredentials,
  RegisterStepOne,
  HotelProfile,
  AuthResponse,
  ForgotPasswordData,
} from "@/types";

// TODO: Replace with real API calls when backend is ready
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_TOKEN = "mock-jwt-token";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(900);
    if (credentials.email === "fail@test.com") {
      throw new Error("Invalid email or password");
    }
    return {
      user: {
        id: "mock-id",
        firstName: "Hasan",
        lastName: "Sammour",
        email: credentials.email,
        accountType: "HOTEL_EMPLOYEE",
        emailVerified: true,
        onboardingCompleted: true,
      },
      accessToken: MOCK_TOKEN,
    };
  },

  async registerStepOne(data: RegisterStepOne): Promise<{ message: string }> {
    await delay(900);
    return { message: `Verification email sent to ${data.email}` };
  },

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    await delay(900);
    return { message: `Password reset link sent to ${data.email}` };
  },

  async resetPassword(data: {
    token: string;
    password: string;
    confirmPassword: string;
  }): Promise<{ message: string }> {
    await delay(900);
    if (!data.token) throw new Error("Invalid token");
    return { message: "Password reset successfully" };
  },

  async verifyEmail(token: string): Promise<AuthResponse> {
    await delay(900);
    if (!token) throw new Error("Invalid token");
    return {
      user: {
        id: "mock-id",
        firstName: "New",
        lastName: "User",
        email: "new@hotel.com",
        accountType: "HOTEL_EMPLOYEE",
        emailVerified: true,
        onboardingCompleted: false,
      },
      accessToken: MOCK_TOKEN,
    };
  },

  async completeOnboarding(profile: HotelProfile): Promise<AuthResponse> {
    await delay(900);
    // profile is used for API call in the future
    console.log("Onboarding profile:", profile);
    return {
      user: {
        id: "mock-id",
        firstName: "New",
        lastName: "User",
        email: "new@hotel.com",
        accountType: "HOTEL_EMPLOYEE",
        emailVerified: true,
        onboardingCompleted: true,
      },
      accessToken: MOCK_TOKEN,
    };
  },

  async getCurrentUser() {
    await delay(500);
    return null;
  },

  async logout() {
    await delay(300);
  },
};