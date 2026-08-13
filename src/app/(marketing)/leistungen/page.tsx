import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CTA } from "@/components/sections/cta";
import { HeroCentered } from "@/components/sections/hero";
import { FadeIn, FadeInStagger } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  masterHaircut,
  serviceCategories,
  servicesPage,
} from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Leistungen",
  description:
    "Herrenfriseur, Damenfriseur und Barber in Kassel: Skin Fade, Bartpflege, Balayage, Typberatung und der Master Haircut — die Leistungen von Kerem Kirali im Überblick.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <HeroCentered
        {...servicesPage.hero}
        className="py-20 sm:py-24 lg:py-28"
      />
      {/* Editorial menu, not a feature-comparison grid: each category reads
          top-to-bottom like a salon's own service card (DESIGN.md §14). */}
      <Section className="pt-0">
        <Container>
          <FadeInStagger className="divide-y divide-border/60 border-t border-border/60">
            {serviceCategories.map((category) => (
              <div
                key={category.slug}
                className="grid gap-4 py-10 sm:grid-cols-[1fr_2fr] sm:gap-8 sm:py-14 lg:grid-cols-[1fr_3fr]"
              >
                <FadeIn className="flex items-start gap-4 sm:block">
                  <category.icon
                    className="size-6 shrink-0 text-brand-strong sm:mb-4"
                    aria-hidden
                  />
                  <h2 className="font-display text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
                    {category.title}
                  </h2>
                </FadeIn>
                <FadeIn>
                  <p className="text-base leading-loose text-pretty text-muted-foreground sm:text-lg">
                    {category.items.map((item, i) => (
                      <span key={item}>
                        {item}
                        {i < category.items.length - 1 && (
                          <span
                            className="mx-3 text-brand-strong/60"
                            aria-hidden
                          >
                            /
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </FadeIn>
              </div>
            ))}
          </FadeInStagger>
        </Container>
      </Section>
      <Section background="muted">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              eyebrow={masterHaircut.eyebrow}
              title={masterHaircut.title}
              align="start"
            />
            <FadeIn className="flex flex-col gap-6">
              <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
                {masterHaircut.description}
              </p>
              <p className="text-sm leading-relaxed tracking-[0.02em] text-brand-strong uppercase">
                {masterHaircut.analysis.map((item, i) => (
                  <span key={item}>
                    {item}
                    {i < masterHaircut.analysis.length - 1 && (
                      <span
                        className="mx-3 text-muted-foreground/50"
                        aria-hidden
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </FadeIn>
          </div>
        </Container>
      </Section>
      <CTA {...servicesPage.cta} />
    </>
  );
}
