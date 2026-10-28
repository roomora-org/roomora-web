import { SEO } from "@/components/layout";
import { useAuth } from "@/context/AuthContext";
import { Hotel, ShieldCheck } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <SEO
        title="Dashboard"
        description="Manage your hotel operations."
        path="/dashboard"
        noIndex
      />
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-fg-strong mb-2">
          Dashboard
        </h1>
        <p className="text-fg-muted mb-6">
          Welcome, {user?.firstName}! You are signed in as{" "}
          <strong className="text-fg-strong">
            {user?.employee?.role?.name || user?.accountType}
          </strong>
          {user?.employee?.hotel && (
            <> at <strong className="text-fg-strong">{user.employee.hotel.name}</strong></>
          )}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl bg-surface-card border border-line">
            <Hotel className="h-8 w-8 text-accent-500 mb-3" />
            <h2 className="font-semibold text-fg-strong mb-1">Hotel</h2>
            <p className="text-sm text-fg-muted">
              {user?.employee?.hotel?.name || "No hotel assigned"}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-surface-card border border-line">
            <ShieldCheck className="h-8 w-8 text-accent-500 mb-3" />
            <h2 className="font-semibold text-fg-strong mb-1">Role</h2>
            <p className="text-sm text-fg-muted">
              {user?.employee?.role?.name || user?.accountType}
            </p>
          </div>
        </div>

        <p className="text-sm text-fg-muted mt-8 text-center">
          This is a placeholder. The full dashboard features will be built next.
        </p>
      </div>
    </>
  );
}