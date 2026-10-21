import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

export function SEO({
  title,
  description = "Roomora: Smart Hotel Operations & Management System. Streamline your operations and elevate guest experience.",
  keywords = "hotel management, PMS, hotel software, roomora, hotel operations",
  image = "/logo.png",
  url = "https://roomora.com",
  type = "website",
  author = "Roomora Team",
}: SEOProps) {
  const siteTitle = `${title} | Roomora`;
  const siteUrl = url;
  const siteImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Roomora" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={siteImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  );
}