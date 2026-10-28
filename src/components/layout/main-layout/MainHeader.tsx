import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { Bell, LogOut } from "lucide-react";
import { useEffect } from "react";

export function MainHeader() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const role = user?.employee?.role?.name || user?.accountType;

  // (kept for parity — no mobile menu state here anymore, sidebar handles it)
  useEffect(() => {
    // no-op; mobile menu is now handled by Sidebar
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-surface-card border-b border-line sticky top-0 z-30">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: brand (hidden on mobile because Sidebar drawer has it) */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link to="/dashboard" className="flex items-center gap-2 pl-10">
            <Logo className="h-8" />
            <span className="text-lg font-bold text-fg-strong">Roomora</span>
          </Link>
        </div>

        {/* Desktop welcome */}
        <div className="hidden lg:block">
          <h2 className="text-sm font-medium text-fg-strong">
            Welcome back, {user?.firstName}!
          </h2>
          <p className="text-xs text-fg-muted">{role}</p>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full text-fg-muted hover:text-fg-strong hover:bg-chip transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <ThemeToggle />

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-line">
            <div className="h-8 w-8 rounded-full bg-accent-500 text-primary-950 flex items-center justify-center font-bold text-xs">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-fg-strong leading-tight">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-fg-muted leading-tight">{role}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="ml-2 p-2 rounded-full text-fg-muted hover:text-danger-700 hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-colors"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}