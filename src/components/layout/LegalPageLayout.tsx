import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  sections: Section[];
}

export function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  sections,
}: LegalPageLayoutProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  // pages build `sections` inline (new array every render), so depend on the ids only
  const ids = sections.map((s) => s.id).join("|");

  // highlight the section currently being read
  useEffect(() => {
    const els = ids
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <div className="container-custom py-12 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-brand transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 pb-8 border-b border-line max-w-3xl"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-fg-strong mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-fg-muted mb-4">{subtitle}</p>
          <div className="inline-flex items-center gap-2 text-sm text-fg-muted">
            <Calendar className="h-4 w-4" />
            Last updated: {lastUpdated}
          </div>
        </motion.div>

        <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
          {/* Desktop: sticky table of contents with active section */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28" aria-label="Table of contents">
              <h2 className="text-xs font-semibold text-fg-strong uppercase tracking-wider mb-4">
                On this page
              </h2>
              <ol className="border-l border-line">
                {sections.map((section, idx) => {
                  const isActive = active === section.id;
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        aria-current={isActive ? "location" : undefined}
                        className={`-ml-px flex items-start gap-2 border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                          isActive
                            ? "border-accent-500 text-brand font-semibold"
                            : "border-transparent text-fg-muted hover:text-brand"
                        }`}
                      >
                        <span className="text-xs font-mono opacity-60 pt-0.5">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0">
            {/* Mobile / tablet: collapsible card */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:hidden mb-10 rounded-2xl bg-surface-card border border-line"
              aria-label="Table of contents"
            >
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-sm font-semibold text-fg-strong uppercase tracking-wider">
                  Table of Contents
                  <span className="text-fg-muted transition-transform group-open:rotate-180" aria-hidden="true">
                    ▾
                  </span>
                </summary>
                <ol className="space-y-2 px-5 pb-5">
                  {sections.map((section, idx) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-sm text-fg-muted hover:text-brand transition-colors flex items-center gap-2"
                      >
                        <span className="text-xs font-mono opacity-60">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </motion.nav>

            <div className="space-y-10 max-w-3xl">
              {sections.map((section, idx) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4 }}
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

            <div className="mt-16 pt-8 border-t border-line max-w-3xl">
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
      </div>
    </div>
  );
}
