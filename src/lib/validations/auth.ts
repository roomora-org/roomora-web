import { z } from "zod";

// ==========================================
// Sign In Schema
// ==========================================
export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;

// ==========================================
// Sign Up Schema
// ==========================================
export const signUpSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
    lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    phone: z.string().min(8, "Phone number is too short").regex(/^[+]?[\d\s-]+$/, "Invalid phone number format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.acceptTerms === true, {
    message: "You must accept the terms and conditions",
    path: ["acceptTerms"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

// ==========================================
// Forgot Password Schema
// ==========================================
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// ==========================================
// Reset Password Schema
// ==========================================
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// ==========================================
// Hotel Profile Schema
// ==========================================
export const hotelProfileSchema = z.object({
  hotelName: z.string().min(2, "Hotel name must be at least 2 characters").max(100),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  address: z.string().min(5, "Address is required"),
  starRating: z.number().min(1, "Minimum 1 star").max(5, "Maximum 5 stars"),
  hotelPhone: z.string().min(8, "Hotel phone is too short"),
});

export type HotelProfileFormData = z.infer<typeof hotelProfileSchema>;