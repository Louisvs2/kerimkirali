import { Container } from "@/components/layout/container";
import { Section, type SectionBackground } from "@/components/layout/section";
import { TeamCarouselTrack } from "@/components/sections/team-carousel-track";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import type { SectionImage, SectionIntro } from "@/types/content";

export interface TeamMember {
  name: string;
  role: string;
  image: SectionImage;
}

interface TeamCarouselProps {
  intro?: SectionIntro;
  members: TeamMember[];
  background?: SectionBackground;
  className?: string;
}

// Real people are the strongest trust anchor (DESIGN.md §13) — photos are
// required per member and must share one photographic style. Shown as a
// slidable row (TeamCarouselTrack) rather than a grid so it scales cleanly
// regardless of team size, instead of leaving empty grid cells.
export function TeamCarousel({
  intro,
  members,
  background,
  className,
}: TeamCarouselProps) {
  return (
    <Section background={background} className={className}>
      <Container>
        {intro && <SectionHeading {...intro} />}
        <div className={cn(intro && "mt-14 sm:mt-20")}>
          <TeamCarouselTrack members={members} />
        </div>
      </Container>
    </Section>
  );
}
