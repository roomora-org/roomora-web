import { Helmet } from "react-helmet-async";

const SITE_URL = "https://roomora-new.vercel.app";
const SITE_NAME = "Roomora";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  /** Path relative to site root, e.g. "/register" or "/login" */
  path?: string;
  type?: string;
  author?: string;
}

export function SEO({
  title,
  description = "Roomora: Smart Hotel Operations & Management System. Streamline your operations and elevate guest experience.",
  keywords = "hotel management, PMS, hotel software, roomora, hotel operations",
  image = "/logo.png",
  path = "/",
  type = "website",
  author = "Roomora Team",
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const fullUrl = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}