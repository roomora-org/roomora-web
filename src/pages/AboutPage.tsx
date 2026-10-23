import { SEO } from "@/components/layout/SEO";
import {
  Story,
  MissionVision,
  Team,
  Values,
  CallToAction,
} from "@/components/about";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Roomora, our mission, vision, and values."
        path="/about"
      />
      <Story />
      <MissionVision />
      <Team />
      <Values />
      <CallToAction />
    </>
  );
}