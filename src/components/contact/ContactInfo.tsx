import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactDetails = [
  {
    icon: Phone,
    title: "Phone Number",
    value: "+970 123 4567",
    href: "tel:+9701234567",
    copyable: true,
  },
  {
    icon: Mail,
    title: "Email Address",
    value: "info@roomora.com",
    href: "mailto:info@roomora.com",
    copyable: true,
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Sun – Thu, 9 AM – 5 PM",
    href: null,
    copyable: false,
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Ramallah, Palestine",
    href: "https://maps.google.com/?q=Ramallah,Palestine",
    copyable: false,
  },
];

export function ContactInfo() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      className="space-y-4"
    >
      {contactDetails.map((item, index) => (
        <div
          key={item.title}
          className="group flex items-start gap-4 rounded-2xl border border-line bg-surface-card p-5 hover:border-accent-400 hover:shadow-md transition-all duration-300"
        >
          {/* Icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-100 dark:bg-accent-500/15 text-accent-600 dark:text-accent-400 group-hover:scale-110 transition-transform">
            <item.icon className="h-5 w-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted mb-1">
              {item.title}
            </p>
            {item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-fg-strong hover:text-brand transition-colors break-words"
              >
                {item.value}
              </a>
            ) : (
              <p className="text-sm font-medium text-fg-strong break-words">
                {item.value}
              </p>
            )}
          </div>

          {/* Copy Button (only for copyable items) */}
          {item.copyable && (
            <button
              type="button"
              onClick={() => handleCopy(item.value, index)}
              className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg text-fg-muted hover:text-brand hover:bg-chip transition-colors"
              aria-label={`Copy ${item.title}`}
            >
              {copiedIndex === index ? (
                <Check className="h-4 w-4 text-success-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      ))}
    </motion.div>
  );
}