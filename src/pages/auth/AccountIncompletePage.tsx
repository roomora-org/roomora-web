import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SEO } from "@/components/layout";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/Button";
import { AlertCircle, LogOut, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function AccountIncompletePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <SEO
        title="Account Setup Incomplete"
        description="Your account is missing required information."
        path="/account-incomplete"
        noIndex
      />
      <AuthCard title="Account Setup Incomplete" hideHeader>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-6 sm:py-8"
        >
          <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-warning-50 dark:bg-warning-500/15 mb-4">
            <AlertCircle className="h-7 w-7 sm:h-8 sm:w-8 text-warning-700 dark:text-warning-500" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-2">
            Your account isn't ready yet
          </h2>
          <p className="text-sm text-fg-muted mb-6 max-w-sm mx-auto">
            {user?.employee?.role?.name ? (
              <>
                Your <strong>{user.employee.role.name}</strong> account isn't
                linked to a hotel yet. Please contact your hotel manager or
                our support team to finish setting up your account.
              </>
            ) : (
              <>
                Your account isn't linked to a hotel yet. Please contact your
                hotel manager or our support team.
              </>
            )}
          </p>

          <div className="space-y-3">
            <a
              href="mailto:support@roomora.com"
              className="block"
            >
              <Button variant="accent" size="lg" className="w-full">
                <Mail className="h-4 w-4" />
                Contact Support
              </Button>
            </a>

            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <p className="text-xs text-fg-muted mt-6">
            Signed in as{" "}
            <strong className="text-fg-strong">{user?.email}</strong>
          </p>
        </motion.div>
      </AuthCard>
    </>
  );
}