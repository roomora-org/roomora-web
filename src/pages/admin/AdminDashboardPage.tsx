import { SEO } from "@/components/layout";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, Hotel, Users, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <SEO
        title="Platform Admin"
        description="Manage the Roomora platform."
        path="/admin/dashboard"
        noIndex
      />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-fg-strong mb-2">
            Platform Admin
          </h1>
          <p className="text-fg-muted">
            Welcome, {user?.firstName}. You have full access to the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Hotel />} label="Hotels" value="0" />
          <StatCard icon={<Users />} label="Users" value="0" />
          <StatCard icon={<ShieldCheck />} label="Active Subscriptions" value="0" />
          <StatCard icon={<Activity />} label="System Status" value="OK" tone="success" />
        </div>

        <div className="rounded-2xl border border-line bg-surface-card p-6">
          <h2 className="text-lg font-semibold text-fg-strong mb-2">
            Coming soon
          </h2>
          <p className="text-sm text-fg-muted">
            Hotels management, Users management, Subscriptions, and System
            Health dashboard will appear here.
          </p>
        </div>
      </div>
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "default" | "success" | "warning" | "danger";
}) {
  const toneClass =
    tone === "success"
      ? "text-success-700 dark:text-success-400"
      : tone === "warning"
        ? "text-warning-700 dark:text-warning-500"
        : tone === "danger"
          ? "text-danger-700 dark:text-danger-500"
          : "text-fg-strong";

  return (
    <div className="rounded-2xl border border-line bg-surface-card p-5">
      <div className="flex items-center gap-2 text-fg-muted text-xs font-medium uppercase tracking-wide mb-2">
        <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        {label}
      </div>
      <p className={`text-2xl font-bold ${toneClass}`}>{value}</p>
    </div>
  );
}