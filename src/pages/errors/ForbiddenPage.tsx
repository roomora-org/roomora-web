import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/layout";
import { ShieldAlert, Home } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <>
      <SEO
	  title="403 - Forbidden"
	  description="You don't have permission to access this page."
	  path="/403"
      />
      <div className="min-h-screen flex items-center justify-center bg-surface px-6">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-danger-50 dark:bg-danger-500/15 mb-6">
            <ShieldAlert className="h-10 w-10 text-danger-700 dark:text-danger-500" />
          </div>
          <h1 className="text-3xl font-bold text-fg-strong mb-3">
            Access denied
          </h1>
          <p className="text-fg-muted mb-8">
            You don't have permission to access this page. Contact your admin if
            you think this is a mistake.
          </p>
          <Link to="/">
            <Button variant="accent" size="lg">
              <Home className="h-4 w-4" /> Go Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}