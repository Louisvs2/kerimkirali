import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { CTA } from "@/components/sections/cta";
import { FeatureGrid } from "@/components/sections/features";
import { Gallery } from "@/components/sections/gallery";
import { HeroFullWidth } from "@/components/sections/hero";
import { NumberedList } from "@/components/sections/numbered-list";
import { Reviews } from "@/components/sections/reviews";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Friseur & Barber in Kassel",
  description:
    "Premium Friseur und Barbershop in Kassel: individuelle Typberatung, präzise Herren- und Damenschnitte, Bartpflege und der Master Haircut von Kerem Kirali.",
  path: "/",
});

// Homepage composition follows the client's own briefing (Website-Struktur):
// Hero → Über Kerem → Dienstleistungen → Warum Kerem Kirali → Galerie →
// Bewertungen → CTA. Team lives on /ueber-uns to avoid a thin repeat here.
export default function HomePage() {
  return (
    <>
      <HeroFullWidth
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        subtitle={home.hero.subtitle}
        actions={home.hero.actions}
        media={home.hero.media}
        logo={siteConfig.logo}
      />
      <Section>
        <div className="grid items-center gap-12 lg:mx-auto lg:max-w-6xl lg:grid-cols-2 lg:gap-20 lg:px-10">
          <FadeIn>
            <div className="relative aspect-[4/5] w-full overflow-hidden lg:rounded-2xl">
              <Image
                src="/images/team/kerem-kirali.jpg"
                alt="Portrait von Kerem Kirali"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover grayscale"
              />
            </div>
          </FadeIn>
          <FadeIn className="flex flex-col gap-6 px-6 sm:px-8 lg:px-0">
            <SectionHeading {...home.aboutTeaser.intro} align="start" />
            <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
              {home.aboutTeaser.paragraph}
            </p>
            <Button asChild variant="ghost" className="group -ml-4 w-fit">
              <Link href={home.aboutTeaser.action.href}>
                {home.aboutTeaser.action.label}
                <ArrowRight
                  aria-hidden
                  className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </Section>
      <FeatureGrid
        intro={home.services.intro}
        items={home.services.items}
        className="border-t border-white/5"
      />
      <NumberedList
        intro={home.why.intro}
        items={home.why.items}
        className="border-t border-white/5"
      />
      <Gallery
        intro={home.gallery.intro}
        images={home.gallery.images}
        className="border-t border-white/5"
      />
      <Reviews
        intro={home.reviews.intro}
        rating={home.reviews.rating}
        highlights={home.reviews.highlights}
        className="border-t border-white/5"
      />
      <CTA {...home.cta} variant="cinematic" />
    </>
  );
}
