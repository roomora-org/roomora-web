import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  /** Optional single role, e.g. "Hotel Manager" or "PLATFORM_ADMIN" */
  requiredRole?: string;
  /** Require PLATFORM_ADMIN */
  requirePlatformAdmin?: boolean;
  /** Require HOTEL_EMPLOYEE */
  requireHotelEmployee?: boolean;
  /**
   * If true, the user is allowed even if they haven't completed onboarding.
   * Used ONLY for /onboarding itself.
   */
  allowWithoutOnboarding?: boolean;
  /**
   * If true, the user is allowed even if their account is "incomplete"
   * (employee without hotel). Used ONLY for /account-incomplete.
   */
  allowIncompleteAccount?: boolean;
}

export function ProtectedRoute({
  requiredRole,
  requirePlatformAdmin,
  requireHotelEmployee,
  allowWithoutOnboarding = false,
  allowIncompleteAccount = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-fg-muted">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!user.emailVerifiedAt) {
    return <Navigate to="/verify-email?pending=true" replace />;
  }

  if (requirePlatformAdmin && user.accountType !== "PLATFORM_ADMIN") {
    return <Navigate to="/403" replace />;
  }

  if (requireHotelEmployee && user.accountType !== "HOTEL_EMPLOYEE") {
    return <Navigate to="/403" replace />;
  }

  // Incomplete account: hotel employee without hotel
  if (
    !allowIncompleteAccount &&
    user.accountType === "HOTEL_EMPLOYEE" &&
    !user.employee?.hotel
  ) {
    // Only Hotel Managers can self-onboard a hotel.
    // Any other role with no hotel is broken → show /account-incomplete.
    const roleName = user.employee?.role?.name;
    if (roleName === "Hotel Manager" && allowWithoutOnboarding) {
      // Fall through — they're on /onboarding, allow it
    } else if (roleName === "Hotel Manager") {
      return <Navigate to="/onboarding" replace />;
    } else {
      return <Navigate to="/account-incomplete" replace />;
    }
  }

  // Onboarded hotel employee revisiting /onboarding → send home
  if (
    allowWithoutOnboarding &&
    user.accountType === "HOTEL_EMPLOYEE" &&
    user.employee?.hotel
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requiredRole) {
    const userRole = user.employee?.role?.name || user.accountType;
    if (userRole !== requiredRole) {
      return <Navigate to="/403" replace />;
    }
  }

  // Fallback: use getHomeRoute to prevent loops for platform admins
  if (user.accountType === "PLATFORM_ADMIN") {
    // Platform admins can only access /admin/* routes
    if (!location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <Outlet />;
}