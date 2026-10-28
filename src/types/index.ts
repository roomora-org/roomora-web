// ==========================================
// Auth Types
// ==========================================

export type AccountType = "PLATFORM_ADMIN" | "HOTEL_EMPLOYEE";

export type RoleName =
  | "Hotel Manager"
  | "Receptionist"
  | "Housekeeping Staff"
  | "Maintenance Staff"
  | "Service Staff";

export interface Employee {
  id: string;
  role: {
    id: string;
    name: RoleName;
  };
  hotel: {
    id: string;
    name: string;
    status: string;
  } | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  accountType: AccountType;
  emailVerifiedAt: string | null;
  employee: Employee | null;
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
  description?: string;
  alternativePhone?: string;
  postalCode?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: "Bearer";
  expiresIn: number;
  user: User;
  onboardingCompleted: boolean;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export interface ForgotPasswordData {
  email: string;
}

// ==========================================
// Task Types
// ==========================================

export type TaskStatus =
  | "PENDING"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface Task {
  id: string;
  hotelId: string;
  roomId: string;
  assignedToEmployeeId: string;
  taskType: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  source: string;
  dueAt: string;
  startedAt: string | null;
  completedAt: string | null;
  completionNotes: string | null;
}

// ==========================================
// Health Types
// ==========================================

export type HealthStatus = "ok" | "degraded" | "down";
export type HealthCheckStatus = "up" | "down";

export interface HealthCheck {
  name: string;
  status: HealthCheckStatus;
  latencyMs?: number;
  message?: string;
}

export interface HealthLive {
  status: "ok";
  timestamp: string;
  uptime: number;
}

export interface HealthReady {
  status: HealthStatus;
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  checks: HealthCheck[];
}

export interface HealthMetricsMemory {
  rssMb: number;
  heapTotalMb: number;
  heapUsedMb: number;
  externalMb: number;
}

export interface HealthMetricsCpu {
  user: number;
  system: number;
}

export interface HealthMetrics {
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  node: string;
  platform: string;
  arch: string;
  pid: number;
  memory: HealthMetricsMemory;
  cpu: HealthMetricsCpu;
}