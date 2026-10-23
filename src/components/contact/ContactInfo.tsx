import { Phone, Mail, Clock, MapPin } from "lucide-react";

const contactDetails = [
  { icon: Phone, title: "Phone Number", value: "+970 123 4567" },
  { icon: Mail, title: "Email Address", value: "info@roomora.com" },
  { icon: Clock, title: "Working Hours", value: "Sun – Thu, 9 AM – 5 PM" },
  { icon: MapPin, title: "Location", value: "Palestine" },
];

export function ContactInfo() {
  return (
    <section className="container-custom pb-16">
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
        {contactDetails.map(({ icon: Icon, title, value }) => (
          <article
            key={title}
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface-card p-5 shadow-sm hover:border-accent-400 hover:shadow-md transition-all"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-100 dark:bg-accent-500/15 text-accent-600 dark:text-accent-400">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-fg-strong text-sm">{title}</h2>
              <p className="mt-1 text-sm text-fg-muted">{value}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}