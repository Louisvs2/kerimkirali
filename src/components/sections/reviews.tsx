import { Star } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section, type SectionBackground } from "@/components/layout/section";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { FadeIn, FadeInStagger } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import type { SectionIntro } from "@/types/content";

interface ReviewsProps {
  intro?: SectionIntro;
  /** Aggregate rating, e.g. { value: 5, platform: "Planity" }. Only real,
   *  verifiable ratings belong here — no invented review counts. */
  rating: { value: number; platform: string };
  /** Recurring themes from real reviews, shown as quiet running text rather
   *  than fabricated named quotes (DESIGN.md §13). */
  highlights: string[];
  background?: SectionBackground;
  className?: string;
}

// Trust section for businesses with a strong aggregate rating but no
// permissioned, named quotes to show yet — an honest alternative to
// TestimonialsGrid until real, attributable reviews are supplied. The
// rating is the whole point of the section, so it carries the type: one
// dominant display numeral rather than a modest stat among others.
export function Reviews({
  intro,
  rating,
  highlights,
  background,
  className,
}: ReviewsProps) {
  return (
    <Section background={background} className={className}>
      <Container>
        {intro && <SectionHeading {...intro} />}
        <FadeInStagger
          fast
          className={cn(
            "flex flex-col items-center gap-12 text-center",
            intro && "mt-14 sm:mt-20",
          )}
        >
          <FadeIn className="flex flex-col items-center">
            <p className="font-display text-[6.5rem] leading-none font-semibold tracking-tight tabular-nums sm:text-[9rem] lg:text-[11rem]">
              <AnimatedNumber
                value={rating.value}
                decimals={1}
                locale="de-DE"
              />
            </p>
            <div
              className="mt-4 flex items-center gap-1.5 text-brand"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Bewertung auf {rating.platform}
            </p>
          </FadeIn>
          <FadeIn className="max-w-2xl">
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm leading-loose tracking-[0.02em] text-muted-foreground uppercase">
              {highlights.map((highlight, i) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-x-3 whitespace-nowrap"
                >
                  {highlight}
                  {i < highlights.length - 1 && (
                    <span className="text-xs text-brand-strong" aria-hidden>
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </FadeIn>
        </FadeInStagger>
      </Container>
    </Section>
  );
}
