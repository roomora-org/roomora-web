import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { PublicLayout, AuthLayout, MainLayout } from "@/components/layout";
import { OfflineBanner } from "@/components/layout/OfflineBanner";
import { Spotlight } from "@/components/ui/Spotlight";
import { GuestOnly } from "@/components/auth/GuestOnly";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Public
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";

// Auth
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from "@/pages/auth";
import AccountIncompletePage from "@/pages/auth/AccountIncompletePage";

// Hotel
import OnboardingPage from "@/pages/OnboardingPage";
import DashboardPage from "@/pages/DashboardPage";

// Admin
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminPlaceholderPage from "@/pages/admin/AdminPlaceholderPage";

// Errors
import {
  NotFoundPage,
  ServerErrorPage,
  UnauthorizedPage,
  ForbiddenPage,
} from "@/pages/errors";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = window.setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <>
      <OfflineBanner />
      <ScrollManager />
      <Spotlight />
      <Routes>
        {/* ---------- Public ---------- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>

        {/* ---------- Auth ---------- */}
        <Route element={<AuthLayout />}>
          <Route element={<GuestOnly />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/account-incomplete" element={<AccountIncompletePage />} />
        </Route>

        {/* ---------- Onboarding (Hotel Manager only, allow without hotel) ---------- */}
        <Route element={<ProtectedRoute allowWithoutOnboarding />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>

        {/* ---------- Hotel dashboard ---------- */}
        <Route element={<ProtectedRoute requireHotelEmployee />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>

        {/* ---------- Platform Admin ---------- */}
        <Route element={<ProtectedRoute requirePlatformAdmin />}>
          <Route element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route
              path="/admin/hotels"
              element={<AdminPlaceholderPage title="Hotels" />}
            />
            <Route
              path="/admin/users"
              element={<AdminPlaceholderPage title="Users" />}
            />
            <Route
              path="/admin/settings"
              element={<AdminPlaceholderPage title="Settings" />}
            />
          </Route>
        </Route>

        {/* ---------- Errors ---------- */}
        <Route path="/401" element={<UnauthorizedPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;