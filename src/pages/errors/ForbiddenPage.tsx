import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/layout/SEO";
import { ErrorPageLayout } from "@/components/layout/ErrorPageLayout";
import { ShieldAlert, Home } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <>
      <SEO
        title="403 - Forbidden"
        description="You don't have permission to access this page."
        path="/403"
        noIndex
      />
      <ErrorPageLayout
        tone="danger"
        icon={<ShieldAlert className="h-10 w-10" />}
        title="Access denied"
        description="You don't have permission to access this page. Contact your admin if you think this is a mistake."
      >
        <Link to="/" className="w-full sm:w-auto">
          <Button variant="accent" size="lg" className="w-full">
            <Home className="h-4 w-4" /> Go Home
          </Button>
        </Link>
      </ErrorPageLayout>
    </>
  );
}
