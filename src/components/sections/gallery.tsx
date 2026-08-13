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
      <FadeIn className="group relative size-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </FadeIn>
    </li>
  );
}

// Full-bleed editorial spread for exactly four images: one large lead shot,
// one wide supporting frame, two detail tiles — edge-to-edge, no rounding,
// no gaps wide enough to read as a UI grid. Large photography, not small
// cards, is what makes this feel like a salon's own lookbook rather than a
// dashboard widget (DESIGN.md §12). Any other count falls back to a simple
// contained grid.
function GalleryBento({ images }: { images: SectionImage[] }) {
  return (
    <ul className="grid grid-cols-2 gap-px sm:grid-cols-4 sm:grid-rows-2">
      <GalleryTile
        image={images[0]}
        priority
        sizes="(min-width: 640px) 50vw, 100vw"
        className="col-span-2 aspect-[4/3] sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-[32rem]"
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
    <ul className="grid grid-cols-2 gap-px sm:grid-cols-3">
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
      {intro && (
        <Container>
          <SectionHeading {...intro} />
        </Container>
      )}
      <FadeInStagger fast className={cn(intro && "mt-14 sm:mt-20")}>
        {images.length === 4 ? (
          <GalleryBento images={images} />
        ) : (
          <GalleryGrid images={images} />
        )}
      </FadeInStagger>
    </Section>
  );
}
