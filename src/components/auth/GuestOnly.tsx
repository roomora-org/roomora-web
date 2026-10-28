import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function GuestOnly() {
  const { user, isAuthenticated, getHomeRoute } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={getHomeRoute()} replace />;
  }
  return <Outlet />;
}