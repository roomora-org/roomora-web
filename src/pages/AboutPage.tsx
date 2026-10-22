


import { SEO } from "@/components/layout/SEO";
import { Story } from "@/components/about/Story";
import { MissionVision } from "@/components/about/MissionVision";
import { Team } from "@/components/about/Team";
import { Values } from "@/components/about/Values";
import { CallToAction } from "@/components/about/CallToAction";

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Roomora, our mission, vision, and values."
        url="https://roomora.com/about"
      />

      <Story />
      <MissionVision />
      <Team />
      <Values />
      <CallToAction />
    </>
  );
}
