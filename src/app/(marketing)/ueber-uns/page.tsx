import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CTA } from "@/components/sections/cta";
import { FeatureGrid } from "@/components/sections/features";
import { HeroStatement } from "@/components/sections/hero";
import { TeamCarousel } from "@/components/sections/team";
import { FadeInStagger, FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { about } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Über Kerem Kirali",
  description:
    "Kerem Kirali – Hairstylist & Barber in Kassel: Kreativität, Disziplin und individuelle Beratung statt Trends von der Stange. Lernen Sie Kerem und sein Team kennen.",
  path: "/ueber-uns",
});

export default function UeberUnsPage() {
  return (
    <>
      <HeroStatement {...about.hero} />
      <Section className="pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            <SectionHeading {...about.bio.intro} align="start" />
            <FadeInStagger className="flex flex-col gap-6 lg:col-span-2">
              {about.bio.paragraphs.map((paragraph) => (
                <FadeIn key={paragraph}>
                  <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </FadeInStagger>
          </div>
        </Container>
      </Section>
      <FeatureGrid
        intro={about.philosophy.intro}
        items={about.philosophy.items}
        className="border-t border-white/5"
      />
      <TeamCarousel
        intro={about.team.intro}
        members={about.team.members}
        className="border-t border-white/5"
      />
      <CTA {...about.cta} />
    </>
  );
}
