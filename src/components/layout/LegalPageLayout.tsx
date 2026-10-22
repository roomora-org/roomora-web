import { Link } from "react-router-dom";
import { PublicLayout } from "./public-layout/PublicLayout";
import { SEO } from "./SEO";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  path: string;
  sections: Section[];
}

export function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  path,
  sections,
}: LegalPageLayoutProps) {
  return (
    <>
      <SEO title={title} description={subtitle} path={path} />
      <PublicLayout>
        <div className="container-custom py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-brand transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 pb-8 border-b border-line"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-fg-strong mb-3 tracking-tight">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-fg-muted mb-4">
                {subtitle}
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-fg-muted">
                <Calendar className="h-4 w-4" />
                Last updated: {lastUpdated}
              </div>
            </motion.div>

            {/* Table of Contents */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12 p-6 rounded-2xl bg-surface-card border border-line"
            >
              <h2 className="text-sm font-semibold text-fg-strong uppercase tracking-wider mb-4">
                Table of Contents
              </h2>
              <ol className="space-y-2">
                {sections.map((section, idx) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm text-fg-muted hover:text-brand transition-colors flex items-center gap-2"
                    >
                      <span className="text-xs font-mono text-fg-muted/60">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </motion.nav>

            {/* Content */}
            <div className="space-y-10">
              {sections.map((section, idx) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="scroll-mt-24"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-fg-strong mb-4">
                    {idx + 1}. {section.title}
                  </h2>
                  <div className="prose-legal space-y-4 text-fg-muted leading-relaxed">
                    {section.content}
                  </div>
                </motion.section>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-16 pt-8 border-t border-line text-center">
              <p className="text-sm text-fg-muted">
                If you have any questions about this document, please contact us at{" "}
                <a
                  href="mailto:legal@roomora.com"
                  className="text-brand font-medium hover:underline"
                >
                  legal@roomora.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
}