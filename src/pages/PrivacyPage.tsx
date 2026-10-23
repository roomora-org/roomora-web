import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { SEO } from "@/components/layout/SEO";

export default function PrivacyPage() {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content: (
        <>
          <p>
            At Roomora, we take your privacy seriously. This Privacy Policy
            explains what data we collect, how we use it, and your rights
            regarding your information.
          </p>
          <p>
            By using Roomora, you consent to the practices described in this
            policy.
          </p>
        </>
      ),
    },
    {
      id: "data-we-collect",
      title: "Data We Collect",
      content: (
        <>
          <p>We collect the following types of information:</p>
          <ul>
            <li>
              <strong>Account Data:</strong> Name, email, phone number,
              password (hashed), and role.
            </li>
            <li>
              <strong>Hotel Data:</strong> Hotel name, address, star rating,
              room configurations, and pricing.
            </li>
            <li>
              <strong>Guest Data:</strong> Guest names, contact info, passport
              numbers, and reservation details.
            </li>
            <li>
              <strong>Operational Data:</strong> Tasks, folios, invoices, and
              activity logs.
            </li>
            <li>
              <strong>Usage Data:</strong> IP address, browser type, and pages
              visited (for analytics).
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "how-we-use",
      title: "How We Use Your Data",
      content: (
        <>
          <p>We use your data to:</p>
          <ul>
            <li>Provide and maintain the Service.</li>
            <li>Process reservations, tasks, and invoices.</li>
            <li>Send transactional emails (e.g., verification, password reset).</li>
            <li>Improve our product through anonymized analytics.</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p>
            <strong>We never sell your data</strong> to third parties.
          </p>
        </>
      ),
    },
    {
      id: "tenant-isolation",
      title: "Tenant Data Isolation",
      content: (
        <>
          <p>
            Roomora is a multi-tenant platform. Each hotel's data is strictly
            isolated at the database level. Our queries always filter by the
            authenticated user's <code>tenant_id</code>, preventing any
            cross-hotel data leakage.
          </p>
          <p>
            This means your hotel's data is only accessible to you and your
            authorized staff.
          </p>
        </>
      ),
    },
    {
      id: "security",
      title: "Data Security",
      content: (
        <>
          <p>We implement industry-standard security measures:</p>
          <ul>
            <li>Passwords are hashed using <strong>Bcrypt</strong>.</li>
            <li>
              All API communications use <strong>HTTPS</strong> and{" "}
              <strong>JWT</strong> tokens.
            </li>
            <li>Database access is restricted to authorized services.</li>
            <li>Regular security audits and vulnerability scans.</li>
          </ul>
          <p>
            However, no system is 100% secure. We cannot guarantee absolute
            security, but we are committed to protecting your data.
          </p>
        </>
      ),
    },
    {
      id: "data-retention",
      title: "Data Retention",
      content: (
        <>
          <p>
            We retain your data for as long as your account is active. If you
            delete your account, we will delete your data within 30 days, except
            where we are required by law to retain it (e.g., financial records
            for tax purposes).
          </p>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "Your Rights",
      content: (
        <>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong> your data at any time.</li>
            <li><strong>Correct</strong> inaccurate data.</li>
            <li><strong>Export</strong> your data (CSV / Excel).</li>
            <li><strong>Delete</strong> your account and data.</li>
            <li><strong>Object</strong> to certain data processing.</li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <a href="mailto:privacy@roomora.com">privacy@roomora.com</a>.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies",
      content: (
        <>
          <p>
            We use essential cookies for authentication (JWT tokens) and
            preference cookies (theme: light/dark). We do not use tracking or
            advertising cookies.
          </p>
        </>
      ),
    },
    {
      id: "third-parties",
      title: "Third-Party Services",
      content: (
        <>
          <p>We use the following trusted third-party services:</p>
          <ul>
            <li>
              <strong>Stripe</strong> — for payment processing (does not store
              card data).
            </li>
            <li><strong>SendGrid</strong> — for transactional emails.</li>
            <li>
              <strong>Vercel</strong> and <strong>Render</strong> — for hosting.
            </li>
          </ul>
          <p>
            Each of these services has its own privacy policy. We only share
            the minimum data necessary.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: "Contact Us",
      content: (
        <>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <ul>
            <li>
              Email: <a href="mailto:privacy@roomora.com">privacy@roomora.com</a>
            </li>
            <li>Address: Ramallah, Palestine</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how Roomora collects, uses, and protects your data."
        path="/privacy"
      />
      <LegalPageLayout
        title="Privacy Policy"
        subtitle="Learn how Roomora collects, uses, and protects your data."
        lastUpdated="October 22, 2026"
        sections={sections}
      />
    </>
  );
}