"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import type { TeamMember } from "@/components/sections/team";

// Same CSS scroll-snap track as TestimonialsCarouselTrack — native touch
// behaviour, arrows as the only JS enhancement.
export function TeamCarouselTrack({ members }: { members: TeamMember[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateScrollState = () => {
      setCanScrollPrev(track.scrollLeft > 4);
      setCanScrollNext(
        track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
      );
    };

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [members]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const amount = card ? card.offsetWidth : track.clientWidth;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollBy({
      left: direction * amount,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div>
      <ul
        ref={trackRef}
        className="-mx-6 flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto px-6 pb-2 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {members.map((member) => (
          <li
            key={member.name}
            className="w-[70%] shrink-0 snap-start sm:w-[45%] lg:w-[30%]"
          >
            <FadeIn>
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={member.image.src}
                  alt={member.image.alt}
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 70vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-base font-medium">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </FadeIn>
          </li>
        ))}
      </ul>
      {(canScrollPrev || canScrollNext) && (
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Zurück"
            disabled={!canScrollPrev}
            onClick={() => scrollByCard(-1)}
          >
            <ArrowLeft aria-hidden />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Weiter"
            disabled={!canScrollNext}
            onClick={() => scrollByCard(1)}
          >
            <ArrowRight aria-hidden />
          </Button>
        </div>
      )}
    </div>
  );
}
