import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/layout";
import { RefreshCw, Home } from "lucide-react";

export default function ServerErrorPage() {
  return (
    <>
      <SEO
	  title="500 - Server Error"
	  description="Something went wrong on our end."
	  path="/500"
      />
      <div className="min-h-screen flex items-center justify-center bg-surface px-6">
        <div className="text-center max-w-md">
          <h1 className="text-8xl font-black text-brand mb-4 tracking-tighter">
            500
          </h1>
          <h2 className="text-2xl font-bold text-fg-strong mb-3">
            Something went wrong
          </h2>
          <p className="text-fg-muted mb-8">
            Our servers are having a moment. Please try again in a few minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="accent"
              size="lg"
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto"
            >
              <RefreshCw className="h-4 w-4" /> Try Again
            </Button>
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