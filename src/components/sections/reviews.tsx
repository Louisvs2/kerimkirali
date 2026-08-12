import { Star } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section, type SectionBackground } from "@/components/layout/section";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { FadeIn, FadeInStagger } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SectionIntro } from "@/types/content";

interface ReviewsProps {
  intro?: SectionIntro;
  /** Aggregate rating, e.g. { value: 5, platform: "Planity" }. Only real,
   *  verifiable ratings belong here — no invented review counts. */
  rating: { value: number; platform: string };
  /** Recurring themes from real reviews, shown as quiet tags rather than
   *  fabricated named quotes (DESIGN.md §13). */
  highlights: string[];
  background?: SectionBackground;
  className?: string;
}

// Trust section for businesses with a strong aggregate rating but no
// permissioned, named quotes to show yet — an honest alternative to
// TestimonialsGrid until real, attributable reviews are supplied.
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
            "flex flex-col items-center gap-10 text-center",
            intro && "mt-14 sm:mt-20",
          )}
        >
          <FadeIn className="flex flex-col items-center gap-3">
            <div
              className="flex items-center gap-1 text-brand"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-current" />
              ))}
            </div>
            <p className="text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl">
              <AnimatedNumber
                value={rating.value}
                decimals={1}
                locale="de-DE"
                className="tabular-nums"
              />
            </p>
            <p className="text-sm text-muted-foreground">
              Bewertung auf {rating.platform}
            </p>
          </FadeIn>
          <FadeIn className="flex max-w-3xl flex-wrap justify-center gap-2.5">
            {highlights.map((highlight) => (
              <Badge key={highlight}>{highlight}</Badge>
            ))}
          </FadeIn>
        </FadeInStagger>
      </Container>
    </Section>
  );
}
