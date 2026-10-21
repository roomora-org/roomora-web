"use client";

import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    { name: "Ahmed Al-Sayed", role: "Hotel Manager", hotel: "Grand Palace Hotel", quote: "Roomora transformed how we manage our daily operations. The auto-dispatch feature alone saved us hours of coordination.", rating: 5 },
    { name: "Sarah Johnson", role: "Operations Director", hotel: "Ocean View Resort", quote: "The smart task prioritization is a game-changer. Our rooms are always ready before guests arrive.", rating: 5 },
    { name: "Mohammed Khalil", role: "General Manager", hotel: "City Center Suites", quote: "Finally, a system that understands hotel operations. The AI classification of guest requests is incredibly accurate.", rating: 5 },
    { name: "Layla Hassan", role: "Front Desk Manager", hotel: "Boutique Hotel Nour", quote: "The dashboard gives me a complete overview of everything happening in the hotel. I can't imagine working without it.", rating: 5 },
    { name: "Omar Farouk", role: "Hotel Owner", hotel: "Seaside Inn", quote: "We tried several systems before, but Roomora is the first one that actually works. Highly recommended.", rating: 5 },
    { name: "Nadia Salem", role: "Housekeeping Supervisor", hotel: "Royal Gardens Hotel", quote: "My team loves how easy it is to update task status. No more paperwork, no more confusion.", rating: 5 },
  ];

  return (
    <section className="py-24 overflow-hidden bg-surface-card/30 backdrop-blur-sm">
      <div className="container-custom mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300 text-sm font-medium mb-4">
            <Star className="h-4 w-4 fill-current" />
            Trusted by Hotels
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-fg-strong mb-4">Loved by hotel teams</h2>
          <p className="text-fg-muted max-w-2xl mx-auto">See what hotel managers and staff say about Roomora.</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-6 w-max">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              aria-hidden={index >= testimonials.length}
              className="w-[380px] flex-shrink-0 bg-surface-card rounded-2xl border border-line p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4" style={{ fill: "var(--color-accent-500)", color: "var(--color-accent-500)" }} />
                ))}
              </div>
              <p className="text-fg-muted text-sm leading-relaxed mb-6 min-h-[80px]">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-900 dark:text-primary-200 font-semibold text-sm">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-fg-strong">{testimonial.name}</p>
                  <p className="text-xs text-fg-muted">{testimonial.role} · {testimonial.hotel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
