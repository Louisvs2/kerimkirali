import type { Metadata } from "next";
import { Check } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CTA } from "@/components/sections/cta";
import { HeroCentered } from "@/components/sections/hero";
import { FadeIn, FadeInStagger } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Section className="pt-0">
        <Container>
          <FadeInStagger fast>
            <ul className="grid gap-6 sm:grid-cols-2 lg:gap-8">
              {serviceCategories.map((category) => (
                <li key={category.slug}>
                  <FadeIn className="h-full">
                    <Card className="h-full">
                      <CardHeader>
                        <div className="mb-2 flex size-11 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-brand">
                          <category.icon className="size-5" aria-hidden />
                        </div>
                        <CardTitle className="text-lg">
                          {category.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {category.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <Check
                                className="mt-0.5 size-4 shrink-0 text-brand"
                                aria-hidden
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </FadeIn>
                </li>
              ))}
            </ul>
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
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                {masterHaircut.analysis.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Check className="size-4 shrink-0 text-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Container>
      </Section>
      <CTA {...servicesPage.cta} />
    </>
  );
}
