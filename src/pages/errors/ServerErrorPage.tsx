import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/layout/SEO";
import { ErrorPageLayout } from "@/components/layout/ErrorPageLayout";
import { RefreshCw, Home } from "lucide-react";

export default function ServerErrorPage() {
  return (
    <>
      <SEO
        title="500 - Server Error"
        description="Something went wrong on our end."
        path="/500"
        noIndex
      />
      <ErrorPageLayout
        code="500"
        title="Something went wrong"
        description="Our servers are having a moment. Please try again in a few minutes."
      >
        <Button
          variant="accent"
          size="lg"
          onClick={() => window.location.reload()}
          className="w-full sm:w-auto"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </Button>
        <Link to="/" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full">
            <Home className="h-4 w-4" /> Go Home
          </Button>
        </Link>
      </ErrorPageLayout>
    </>
  );
}
