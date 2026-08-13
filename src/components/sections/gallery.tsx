import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section, type SectionBackground } from "@/components/layout/section";
import { FadeIn, FadeInStagger } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import type { SectionImage, SectionIntro } from "@/types/content";

interface GalleryProps {
  intro?: SectionIntro;
  images: SectionImage[];
  background?: SectionBackground;
  className?: string;
}

function GalleryTile({
  image,
  className,
  priority,
  sizes,
}: {
  image: SectionImage;
  className: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <li className={className}>
      <FadeIn className="group relative size-full overflow-hidden rounded-2xl">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </FadeIn>
    </li>
  );
}

// Curated bento composition for exactly four images: one large lead image,
// one wide supporting shot, two small detail tiles — an editorial hierarchy
// instead of a repeating grid (DESIGN.md §12: images should read as chosen,
// not filled-in). Any other count falls back to a uniform grid.
function GalleryBento({ images }: { images: SectionImage[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:grid-rows-2 sm:gap-5 lg:gap-6">
      <GalleryTile
        image={images[0]}
        priority
        sizes="(min-width: 640px) 50vw, 100vw"
        className="col-span-2 aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto"
      />
      <GalleryTile
        image={images[1]}
        sizes="(min-width: 640px) 50vw, 100vw"
        className="col-span-2 aspect-[16/9] sm:col-span-2 sm:row-span-1"
      />
      <GalleryTile
        image={images[2]}
        sizes="(min-width: 640px) 25vw, 50vw"
        className="col-span-1 aspect-square sm:row-span-1"
      />
      <GalleryTile
        image={images[3]}
        sizes="(min-width: 640px) 25vw, 50vw"
        className="col-span-1 aspect-square sm:row-span-1"
      />
    </ul>
  );
}

function GalleryGrid({ images }: { images: SectionImage[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
      {images.map((image, i) => (
        <GalleryTile
          key={image.alt}
          image={image}
          priority={i === 0}
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="aspect-[4/3]"
        />
      ))}
    </ul>
  );
}

export function Gallery({
  intro,
  images,
  background,
  className,
}: GalleryProps) {
  return (
    <Section background={background} className={className}>
      <Container>
        {intro && <SectionHeading {...intro} />}
        <FadeInStagger fast className={cn(intro && "mt-14 sm:mt-20")}>
          {images.length === 4 ? (
            <GalleryBento images={images} />
          ) : (
            <GalleryGrid images={images} />
          )}
        </FadeInStagger>
      </Container>
    </Section>
  );
}
