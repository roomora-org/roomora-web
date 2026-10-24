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
import { clearToken, setToken } from "@/lib/auth-storage";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  /** remember = true -> token kept after closing the browser */
  login: (user: User, token: string, remember?: boolean) => void;
  register: (data: RegisterStepOne) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
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

  const login = useCallback((nextUser: User, token: string, remember = true) => {
    setToken(token, remember);
    setUser(nextUser);
  }, []);

  const register = useCallback(async (data: RegisterStepOne) => {
    await authService.registerStepOne(data);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      // always clear locally, even if the API call fails
      clearToken();
      setUser(null);
    }
  }, []);

  // memoized: consumers only re-render when something really changed
  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      checkAuth,
    }),
    [user, isLoading, login, register, logout, checkAuth]
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
