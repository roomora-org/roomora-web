import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { SEO } from "@/components/layout/SEO";

export default function TermsPage() {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: (
        <>
          <p>
            By accessing or using the Roomora platform ("Service"), you agree to
            be bound by these Terms of Service ("Terms"). If you do not agree to
            these Terms, you may not access or use the Service.
          </p>
          <p>
            Roomora is a cloud-based Property Management System (PMS) designed
            for small and medium-sized hotels, boutique hotels, and serviced
            apartments. These Terms apply to all users, including hotel
            managers, receptionists, housekeeping staff, and maintenance staff.
          </p>
        </>
      ),
    },
    {
      id: "accounts",
      title: "Account Registration",
      content: (
        <>
          <p>To use Roomora, you must create an account. You agree to:</p>
          <ul>
            <li>Provide accurate, current, and complete information.</li>
            <li>Maintain the security of your password and account.</li>
            <li>Notify us immediately of any unauthorized use.</li>
            <li>
              Accept responsibility for all activities that occur under your
              account.
            </li>
          </ul>
          <p>
            Accounts are bound to a specific hotel (tenant). Data isolation
            between hotels is strictly enforced. You may not use another hotel's
            account without permission.
          </p>
        </>
      ),
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use",
      content: (
        <>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any illegal purpose.</li>
            <li>Attempt to gain unauthorized access to other tenants' data.</li>
            <li>Reverse engineer, decompile, or disassemble the Service.</li>
            <li>Interfere with or disrupt the Service's infrastructure.</li>
            <li>Upload malicious code, viruses, or harmful content.</li>
          </ul>
          <p>
            We reserve the right to suspend or terminate accounts that violate
            these rules without prior notice.
          </p>
        </>
      ),
    },
    {
      id: "subscription",
      title: "Subscription & Payment",
      content: (
        <>
          <p>
            Roomora offers a 14-day free trial. After the trial, a monthly
            subscription fee applies based on the selected plan. All fees are
            billed in advance and are non-refundable except as required by law.
          </p>
          <p>
            We may change our pricing at any time. We will notify you at least
            30 days before any price increase takes effect. You may cancel your
            subscription at any time from your dashboard.
          </p>
        </>
      ),
    },
    {
      id: "data-ownership",
      title: "Data Ownership",
      content: (
        <>
          <p>
            <strong>Your data is yours.</strong> All data you enter into Roomora
            (hotel information, guest records, reservations, tasks) remains your
            property. We only store and process it to provide the Service.
          </p>
          <p>
            You can export your data at any time. If you delete your account, we
            will delete your data within 30 days, except where we are required
            by law to retain it.
          </p>
        </>
      ),
    },
    {
      id: "availability",
      title: "Service Availability",
      content: (
        <>
          <p>
            We strive to keep Roomora available 24/7, but we do not guarantee
            uninterrupted access. Scheduled maintenance will be announced in
            advance. We are not liable for downtime caused by factors beyond our
            control (e.g., internet outages, third-party services).
          </p>
        </>
      ),
    },
    {
      id: "termination",
      title: "Termination",
      content: (
        <>
          <p>
            You may terminate your account at any time from your dashboard. We
            may also suspend or terminate your account if you violate these
            Terms.
          </p>
          <p>
            Upon termination, your right to use the Service ceases immediately.
            Sections regarding data ownership, limitation of liability, and
            governing law survive termination.
          </p>
        </>
      ),
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content: (
        <>
          <p>
            To the maximum extent permitted by law, Roomora shall not be liable
            for any indirect, incidental, special, or consequential damages,
            including loss of profits, data, or business opportunities, arising
            from your use of the Service.
          </p>
          <p>
            Our total liability shall not exceed the amount you paid us in the
            twelve (12) months preceding the claim.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "Changes to Terms",
      content: (
        <>
          <p>
            We may update these Terms from time to time. We will notify you by
            email or through the Service at least 30 days before significant
            changes take effect. Continued use of the Service after changes
            constitutes acceptance of the updated Terms.
          </p>
        </>
      ),
    },
    {
      id: "governing-law",
      title: "Governing Law",
      content: (
        <>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the State of Palestine. Any disputes shall be resolved
            in the courts of Ramallah, Palestine.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <SEO
        title="Terms of Service"
        description="Please read these terms carefully before using Roomora."
        path="/terms"
      />
      <LegalPageLayout
        title="Terms of Service"
        subtitle="Please read these terms carefully before using Roomora."
        lastUpdated="October 22, 2026"
        sections={sections}
      />
    </>
  );
}