import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User, RegisterStepOne } from "@/types";
import { authService } from "@/services/auth.service";
import { clearToken, getToken, setToken } from "@/lib/auth-storage";

export type HomeRoute =
  | "/admin/dashboard"
  | "/onboarding"
  | "/dashboard"
  | "/login"
  | "/account-incomplete";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isPlatformAdmin: boolean;
  onboardingCompleted: boolean;
  /** True when the user is a hotel employee without a hotel attached */
  isAccountIncomplete: boolean;
  login: (
    user: User,
    token: string,
    remember?: boolean,
    onboardingCompleted?: boolean
  ) => void;
  register: (data: RegisterStepOne) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  /** Central source of truth for "where should this user go?" */
  getHomeRoute: () => HomeRoute;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function deriveOnboardingCompleted(user: User | null): boolean {
  if (!user) return false;
  if (user.accountType === "PLATFORM_ADMIN") return true; // admins don't onboard hotels
  return !!user.employee?.hotel;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const token = getToken();
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(
    (
      nextUser: User,
      token: string,
      remember = true,
      _onboardingCompleted?: boolean
    ) => {
      setToken(token, remember);
      setUser(nextUser);
    },
    []
  );

  const register = useCallback(async (data: RegisterStepOne) => {
    await authService.registerStepOne(data);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      clearToken();
      setUser(null);
    }
  }, []);

  const isPlatformAdmin = user?.accountType === "PLATFORM_ADMIN";

  const onboardingCompleted = useMemo(
    () => deriveOnboardingCompleted(user),
    [user]
  );

  // A hotel employee without a hotel is "incomplete" — this should
  // never happen via normal flows, but happens if an admin (or a backend
  // bug) creates a user without an Employee record. Handle it gracefully.
  const isAccountIncomplete = useMemo(() => {
    if (!user) return false;
    if (user.accountType === "PLATFORM_ADMIN") return false;
    return !user.employee?.hotel;
  }, [user]);

  const getHomeRoute = useCallback((): HomeRoute => {
    if (!user) return "/login";

    // Platform Admin → admin dashboard
    if (user.accountType === "PLATFORM_ADMIN") return "/admin/dashboard";

    // Hotel employee without hotel
    if (!user.employee?.hotel) {
      // Only a Hotel Manager can self-onboard a hotel.
      // Any other role with no hotel = broken account → dedicated screen.
      const roleName = user.employee?.role?.name;
      if (roleName === "Hotel Manager") return "/onboarding";
      return "/account-incomplete";
    }

    return "/dashboard";
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      isPlatformAdmin,
      onboardingCompleted,
      isAccountIncomplete,
      login,
      register,
      logout,
      checkAuth,
      getHomeRoute,
    }),
    [
      user,
      isLoading,
      isPlatformAdmin,
      onboardingCompleted,
      isAccountIncomplete,
      login,
      register,
      logout,
      checkAuth,
      getHomeRoute,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}