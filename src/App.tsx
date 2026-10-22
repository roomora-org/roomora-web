import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { PublicLayout } from "@/components/layout";
import { Spotlight } from "@/components/ui/Spotlight";

// Public Pages
import Home from "@/pages/Home";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";

// Auth Pages
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from "@/pages/auth";

// Onboarding
import OnboardingPage from "@/pages/OnboardingPage";

// Error Pages
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
      <ScrollManager />
      <Spotlight />
      <Routes>
        {/* ============================================
            Public Routes
            ============================================ */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        {/* ============================================
            Legal Routes (self-wrapped with PublicLayout)
            ============================================ */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        {/* ============================================
            Auth Routes
            ============================================ */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* ============================================
            Onboarding
            ============================================ */}
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* ============================================
            Error Routes
            ============================================ */}
        <Route path="/401" element={<UnauthorizedPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;