
import { SEO } from "@/components/layout/SEO";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with the Roomora team."
        url="https://roomora.com/contact"
      />

      <ContactForm />
      <ContactInfo />
    </>
  );
}
