import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section, type SectionBackground } from "@/components/layout/section";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Action, SectionImage } from "@/types/content";

interface CTAProps {
  title: string;
  subtitle?: string;
  action: Action;
  /** Reassurance microcopy under the button, e.g. a response-time promise. */
  note?: string;
  /**
   * `centered` — calm, spacious closing CTA, the standard end of a page.
   * `panel` — contained inverted panel, a stronger beat mid-page.
   * `cinematic` — full-bleed photo with a dark scrim, echoing the hero
   *   treatment; the premium closing statement for a photography-led brand.
   */
  variant?: "centered" | "panel" | "cinematic";
  /** Section background — applies to the `centered` variant only. */
  background?: SectionBackground;
  /** Required when `variant="cinematic"`. */
  image?: SectionImage;
  className?: string;
}

// The single conversion action, with a quiet trailing-arrow micro-interaction
// on hover — a premium affordance that draws the eye without shouting
// (DESIGN.md §6, §15).
function CTAButton({
  action,
  variant = "default",
}: {
  action: Action;
  variant?: "default" | "secondary";
}) {
  return (
    <Button asChild size="lg" variant={variant} className="group">
      <Link href={action.href}>
        {action.label}
        <ArrowRight
          aria-hidden
          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </Link>
    </Button>
  );
}

function CTACentered({
  title,
  subtitle,
  action,
  note,
  background,
  className,
}: Omit<CTAProps, "variant">) {
  return (
    <Section
      background={background}
      className={cn("py-24 sm:py-32", className)}
    >
      <Container>
        <FadeIn className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
              {subtitle}
            </p>
          )}
          <div className="mt-4 flex flex-col items-center gap-4">
            <CTAButton action={action} />
            {note && <p className="text-sm text-muted-foreground">{note}</p>}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}

function CTAPanel({
  title,
  subtitle,
  action,
  note,
  className,
}: Omit<CTAProps, "variant" | "background">) {
  return (
    <Section className={className}>
      <Container>
        <FadeIn>
          <div className="flex flex-col items-start gap-8 rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:p-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-16">
            <div className="max-w-xl">
              <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-4xl">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-4 text-lg leading-relaxed text-pretty text-primary-foreground/80">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
              <CTAButton action={action} variant="secondary" />
              {note && (
                <p className="text-sm text-primary-foreground/70">{note}</p>
              )}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}

function CTACinematic({
  title,
  subtitle,
  action,
  note,
  image,
  className,
}: Omit<CTAProps, "variant" | "background"> & { image: SectionImage }) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden py-28 sm:py-36",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Darker, more even scrim than the hero — this is a closing
          statement, not a stage for a headline (DESIGN.md §12). */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/75 to-black/85"
      />
      <Container>
        <FadeIn className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg leading-relaxed text-pretty text-white/75 sm:text-xl">
              {subtitle}
            </p>
          )}
          <div className="mt-4 flex flex-col items-center gap-4">
            <Button asChild size="lg" className="group">
              <Link href={action.href}>
                {action.label}
                <ArrowRight
                  aria-hidden
                  className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            </Button>
            {note && <p className="text-sm text-white/65">{note}</p>}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

// A single call-to-action section with three premium layouts. Consumers pick
// a layout via `variant`; all share the same typed content props.
export function CTA({ variant = "centered", image, ...props }: CTAProps) {
  if (variant === "panel") {
    return <CTAPanel {...props} />;
  }
  if (variant === "cinematic") {
    if (!image) {
      throw new Error('CTA variant="cinematic" requires an `image` prop.');
    }
    return <CTACinematic {...props} image={image} />;
  }
  return <CTACentered {...props} />;
}
