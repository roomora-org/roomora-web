import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/ui/Logo";
import {
  LayoutDashboard,
  BedDouble,
  ClipboardList,
  Users,
  Hotel,
  Settings,
  LogOut,
  CalendarCheck,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const SIDEBAR_WIDTH_EXPANDED = 256;
const SIDEBAR_WIDTH_COLLAPSED = 80;

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const role = user?.employee?.role?.name || user?.accountType;
  const isManager = role === "Hotel Manager";
  const isAdmin = role === "PLATFORM_ADMIN";
  const isReceptionist = role === "Receptionist";

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isMobileOpen]);

  // Close mobile drawer with ESC
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileOpen]);

  const getNavItems = (): NavItem[] => {
    if (isAdmin) {
      return [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Hotels", href: "/admin/hotels", icon: Hotel },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
      ];
    }

    if (isManager) {
      return [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Rooms", href: "/dashboard/rooms", icon: BedDouble },
        {
          name: "Reservations",
          href: "/dashboard/reservations",
          icon: CalendarCheck,
        },
        { name: "Tasks", href: "/dashboard/tasks", icon: ClipboardList },
        { name: "Staff", href: "/dashboard/staff", icon: Users },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
      ];
    }

    if (isReceptionist) {
      return [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        {
          name: "Reservations",
          href: "/dashboard/reservations",
          icon: CalendarCheck,
        },
        { name: "Guests", href: "/dashboard/guests", icon: Users },
        { name: "Tasks", href: "/dashboard/tasks", icon: ClipboardList },
      ];
    }

    return [
      { name: "My Tasks", href: "/dashboard", icon: ClipboardList },
      {
        name: "Notifications",
        href: "/dashboard/notifications",
        icon: Sparkles,
      },
    ];
  };

  const navItems = getNavItems();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const content = (collapsed: boolean) => (
    <>
      {/* Header / Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-line">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 min-w-0"
          aria-label="Roomora home"
        >
          <Logo className="h-8 shrink-0" />
          {!collapsed && (
            <span className="text-lg font-bold text-fg-strong truncate">
              Roomora
            </span>
          )}
        </Link>
        {/* Desktop collapse toggle (hidden on mobile) */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-fg-muted hover:text-fg-strong hover:bg-chip transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
        {/* Mobile close */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-fg-muted hover:text-fg-strong hover:bg-chip transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-accent-100 dark:bg-accent-500/15 text-brand"
                  : "text-fg-muted hover:bg-chip hover:text-fg-strong",
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.name}</span>}
              {isActive && !collapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="p-3 border-t border-line">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center",
          )}
        >
          <div className="h-9 w-9 rounded-full bg-accent-500 text-primary-950 flex items-center justify-center font-bold text-sm shrink-0">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-fg-strong truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-fg-muted truncate">{role}</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            "mt-3 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-fg-muted hover:bg-danger-50 dark:hover:bg-danger-500/10 hover:text-danger-700 dark:hover:text-danger-500 transition-colors w-full",
            collapsed && "justify-center",
          )}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
        }}
        transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
        className="hidden lg:flex flex-col bg-surface-card border-r border-line shrink-0 overflow-hidden"
      >
        {content(isCollapsed)}
      </motion.aside>

      {/* Mobile top bar button (opens drawer) */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-40 p-2 rounded-lg bg-surface-card border border-line shadow-sm text-fg-muted hover:text-fg-strong hover:bg-chip transition-colors"
        aria-label="Open sidebar"
      >
        <PanelLeftOpen className="h-5 w-5" />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              initial={{ x: -SIDEBAR_WIDTH_EXPANDED }}
              animate={{ x: 0 }}
              exit={{ x: -SIDEBAR_WIDTH_EXPANDED }}
              transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
              className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-surface-card border-r border-line flex flex-col lg:hidden"
              role="dialog"
              aria-label="Sidebar menu"
            >
              {content(false)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}