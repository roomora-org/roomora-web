import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/layout";
import { Lock, Home } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <>
      <SEO
	title="401 - Unauthorized"	
	description="You are not authorized to access this page."
  	path="/401"
      />
      <div className="min-h-screen flex items-center justify-center bg-surface px-6">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-accent-100 dark:bg-accent-500/15 mb-6">
            <Lock className="h-10 w-10 text-accent-600 dark:text-accent-400" />
          </div>
          <h1 className="text-3xl font-bold text-fg-strong mb-3">
            Sign in required
          </h1>
          <p className="text-fg-muted mb-8">
            You need to sign in to access this page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Home className="h-4 w-4" /> Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}