import { SEO } from "@/components/layout/SEO";
import { ContactForm, ContactInfo } from "@/components/contact";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with the Roomora team."
        path="/contact"
      />
      <ContactForm />
      <ContactInfo />
    </>
  );
}