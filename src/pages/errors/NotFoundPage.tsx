import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/layout/SEO";
import { ErrorPageLayout } from "@/components/layout/ErrorPageLayout";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // history.back() does nothing when the page was opened directly
  const goBack = () => (window.history.length > 1 ? navigate(-1) : navigate("/"));

  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you are looking for does not exist."
        path="/404"
        noIndex
      />
      <ErrorPageLayout
        code="404"
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        detail={
          <code className="inline-block max-w-full break-all rounded-md bg-chip px-2.5 py-1 text-xs font-mono text-fg-muted">
            {pathname}
          </code>
        }
      >
        <Link to="/" className="w-full sm:w-auto">
          <Button variant="accent" size="lg" className="w-full">
            <Home className="h-4 w-4" /> Go Home
          </Button>
        </Link>
        <Button variant="outline" size="lg" onClick={goBack} className="w-full sm:w-auto">
          <ArrowLeft className="h-4 w-4" /> Go Back
        </Button>
      </ErrorPageLayout>
    </>
  );
}
