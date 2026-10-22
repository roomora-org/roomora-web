import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/layout";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for does not exist."
        path="/404"
      />
      <div className="min-h-screen flex items-center justify-center bg-surface px-6">
        <div className="text-center max-w-md">
          <h1 className="text-8xl font-black text-brand mb-4 tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl font-bold text-fg-strong mb-3">
            Page not found
          </h2>
          <p className="text-fg-muted mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">
                <Home className="h-4 w-4" /> Go Home
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" /> Go Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}