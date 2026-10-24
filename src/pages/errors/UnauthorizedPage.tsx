import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/layout/SEO";
import { ErrorPageLayout } from "@/components/layout/ErrorPageLayout";
import { Lock, Home } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <>
      <SEO
        title="401 - Unauthorized"
        description="You are not authorized to access this page."
        path="/401"
        noIndex
      />
      <ErrorPageLayout
        tone="accent"
        icon={<Lock className="h-10 w-10" />}
        title="Sign in required"
        description="You need to sign in to access this page."
      >
        <Link to="/login" className="w-full sm:w-auto">
          <Button variant="accent" size="lg" className="w-full">
            Sign In
          </Button>
        </Link>
        <Link to="/" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full">
            <Home className="h-4 w-4" /> Go Home
          </Button>
        </Link>
      </ErrorPageLayout>
    </>
  );
}
