// Real content for the /ueber-uns page — Inhaber-Bio, Philosophie und Team,
// sourced from the client briefing (Über Kerem, Philosophie, Team).

import { Clock, Heart, Layers, Sparkles, Target, Wand2 } from "lucide-react";

import type { Feature } from "@/components/sections/features";
import type { TeamMember } from "@/components/sections/team";
import type { Action, SectionIntro } from "@/types/content";

interface AboutContent {
  hero: { eyebrow: string; title: string; subtitle: string };
  bio: { intro: SectionIntro; paragraphs: string[] };
  philosophy: { intro: SectionIntro; items: Feature[] };
  team: { intro: SectionIntro; members: TeamMember[] };
  cta: { title: string; subtitle: string; action: Action; note: string };
}

export const about: AboutContent = {
  hero: {
    eyebrow: "Über uns",
    title: "Der kreative Perfektionist hinter dem Salon",
    subtitle:
      "Kerem Kirali verbindet Kreativität, Disziplin und Persönlichkeit — nicht Trends kopieren, sondern für jeden Kunden den perfekten Look entwickeln.",
  },
  bio: {
    intro: {
      eyebrow: "Der Inhaber",
      title: "Kerem Kirali",
    },
    paragraphs: [
      "Kerem Kirali ist eine Mischung aus Kreativität, Disziplin und Persönlichkeit, die ihm mit der Zeit zu einer Institution gemacht hat. Er wird von den außergewöhnlichsten Köpfen Kassels besucht und steht trotzdem mit beiden Beinen fest auf dem Boden.",
      "Ein kreativer Perfektionist, inspiriert von ehrlichem Handwerk und wahrer Schönheit. Und vor allem ein aufrichtiger Zuhörer, der nicht nur in Stilfragen stets den richtigen Ton findet — überzeugen Sie sich selbst von Kerem Kiralis Handwerkskunst.",
    ],
  },
  philosophy: {
    intro: {
      eyebrow: "Philosophie",
      title: "Im Mittelpunkt steht der Mensch",
      subtitle: "Nicht die Frisur steht im Vordergrund — sondern Sie.",
    },
    items: [
      {
        icon: Sparkles,
        title: "Individuelle Beratung",
        description:
          "Jedes Gespräch beginnt bei Ihnen: Ihren Wünschen, Ihrem Alltag, Ihrem Typ.",
      },
      {
        icon: Target,
        title: "Abgestimmte Schnitte",
        description:
          "Jeder Schnitt wird auf Gesichtsform und Kopfform abgestimmt, nicht nach Schema.",
      },
      {
        icon: Wand2,
        title: "Moderne Techniken",
        description:
          "Aktuelle Schnitt- und Farbtechniken, immer auf dem neuesten Stand.",
      },
      {
        icon: Layers,
        title: "Hochwertige Produkte",
        description: "Nur Produkte, die wir selbst empfehlen würden.",
      },
      {
        icon: Clock,
        title: "Ausreichend Zeit",
        description:
          "Ausschließlich auf Terminbasis — keine Hektik, keine langen Wartezeiten.",
      },
      {
        icon: Heart,
        title: "Persönliche Betreuung",
        description:
          "Maximale Aufmerksamkeit für jeden Kunden, von Anfang bis Ende.",
      },
    ],
  },
  team: {
    intro: {
      eyebrow: "Team",
      title: "Die Menschen hinter dem Salon",
    },
    members: [
      {
        name: "Kerem Kirali",
        role: "Inhaber · Hairstylist · Barber",
        image: {
          src: "/images/team/kerem-kirali.jpg",
          alt: "Portrait von Kerem Kirali",
        },
      },
      {
        name: "Hossein Khalili",
        role: "Master Barbier",
        image: {
          src: "/images/team/hossein-khalili.jpg",
          alt: "Portrait von Hossein Khalili",
        },
      },
      {
        name: "Steven Blank",
        role: "Junior Stylist",
        image: {
          src: "/images/team/steven-blank.jpg",
          alt: "Portrait von Steven Blank",
        },
      },
    ],
  },
  cta: {
    title: "Lernen Sie uns persönlich kennen",
    subtitle:
      "Der beste Weg, den passenden Look zu finden, ist ein persönliches Gespräch.",
    action: { label: "Termin vereinbaren", href: "/kontakt#termin" },
    note: "Ausschließlich auf Terminbasis.",
  },
};
