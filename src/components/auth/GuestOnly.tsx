import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/**
 * Wrap /login, /register, /forgot-password with this.
 * A signed-in user who opens them is sent onward instead of seeing the form again.
 * (Do NOT wrap /reset-password or /verify-email: those links must work even when signed in.)
 * Does not block rendering while auth is loading, so there is no blank flash.
 */
export function GuestOnly() {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user) {
    // TODO: send to "/dashboard" once that route exists
    return <Navigate to={user.onboardingCompleted ? "/" : "/onboarding"} replace />;
  }
  return <Outlet />;
}
