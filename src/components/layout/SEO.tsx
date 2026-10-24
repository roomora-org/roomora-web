import { Helmet } from "react-helmet-async";

const SITE_URL = "https://roomora-new.vercel.app";
const SITE_NAME = "Roomora";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  /** Social-share image. Default is a 1200x630 card in /public/og-image.png */
  image?: string;
  /** Path relative to site root, e.g. "/register" or "/login" */
  path?: string;
  type?: string;
  author?: string;
  /** Keep this page out of search results (errors, reset/verify links, onboarding...) */
  noIndex?: boolean;
}

export function SEO({
  title,
  description = "Roomora: Smart Hotel Operations & Management System. Streamline your operations and elevate guest experience.",
  keywords = "hotel management, PMS, hotel software, roomora, hotel operations",
  image = "/og-image.png",
  path = "/",
  type = "website",
  author = "Roomora Team",
  noIndex = false,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const fullUrl = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  // NOTE: charset and viewport are intentionally NOT set here.
  // They belong in index.html (Vite's template already has both); setting them again
  // from Helmet produced duplicate tags.
  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Browser UI color on mobile (matches light / dark surface) */}
      <meta name="theme-color" content="#fcfbf9" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#1a1614" media="(prefers-color-scheme: dark)" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Canonical: only for pages that should be indexed */}
      {!noIndex && <link rel="canonical" href={fullUrl} />}
    </Helmet>
  );
}
