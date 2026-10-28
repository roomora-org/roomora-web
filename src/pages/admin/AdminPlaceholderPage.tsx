import { SEO } from "@/components/layout";

interface AdminPlaceholderPageProps {
  title: string;
  description?: string;
}

export default function AdminPlaceholderPage({
  title,
  description = "This section is coming soon.",
}: AdminPlaceholderPageProps) {
  return (
    <>
      <SEO
        title={title}
        description={description}
        path="/admin"
        noIndex
      />
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-fg-strong">
          {title}
        </h1>
        <div className="rounded-2xl border border-line bg-surface-card p-8 text-center">
          <p className="text-fg-muted">{description}</p>
        </div>
      </div>
    </>
  );
}