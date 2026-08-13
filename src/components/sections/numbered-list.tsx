import { Container } from "@/components/layout/container";
import { Section, type SectionBackground } from "@/components/layout/section";
import { FadeIn, FadeInStagger } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import type { SectionIntro } from "@/types/content";

export interface NumberedItem {
  title: string;
  description: string;
}

interface NumberedListProps {
  intro?: SectionIntro;
  items: NumberedItem[];
  background?: SectionBackground;
  className?: string;
}

// An asymmetric, editorial counterpart to the icon-card grid (FeatureGrid):
// heading sits apart from a divided, numbered list carried by large display
// numerals. Deliberately different rhythm so two trust sections in a row
// never read as the same template block repeated (DESIGN.md §2, §8).
export function NumberedList({
  intro,
  items,
  background,
  className,
}: NumberedListProps) {
  return (
    <Section background={background} className={className}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {intro && (
            <div className="lg:col-span-4">
              <SectionHeading {...intro} align="start" />
            </div>
          )}
          <FadeInStagger className="lg:col-span-8">
            <ol className="divide-y divide-border/60 border-t border-border/60">
              {items.map((item, index) => (
                <li key={item.title}>
                  <FadeIn className="grid grid-cols-[3rem_1fr] items-baseline gap-4 py-8 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-10">
                    <span className="font-display text-2xl text-brand-strong tabular-nums sm:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </FadeInStagger>
        </div>
      </Container>
    </Section>
  );
}
