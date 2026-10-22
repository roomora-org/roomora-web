import { SEO } from "@/components/layout/SEO";
import { Hero } from "@/components/landing-page/Hero";
import { Features } from "@/components/landing-page/Features";
import { HowItWorks } from "@/components/landing-page/HowItWorks";
import { Testimonials } from "@/components/landing-page/Testimonials";
import { Pricing } from "@/components/landing-page/Pricing";
import { CTA } from "@/components/landing-page/CTA";

export default function Home() {
  return (
    <>
      <SEO
        title="Smart Hotel Operations"
        description="Manage your hotel smartly from one place. Roomora helps you manage reservations, rooms, and tasks efficiently."
        path="/"
      />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
    </>
  );
}