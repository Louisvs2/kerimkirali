// Homepage content for Kerem Kirali — Hairstylist & Barber. Section order
// follows the client's own briefing (Website-Struktur): Hero → Über Kerem →
// Dienstleistungen → Warum Kerem Kirali → Galerie → Bewertungen → CTA.

import { CalendarCheck, Handshake, Scissors, Target } from "lucide-react";

import type { Feature } from "@/components/sections/features";
import { serviceCategories } from "@/content/services";
import type {
  Action,
  HeroVideoMedia,
  SectionImage,
  SectionIntro,
} from "@/types/content";

interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    actions: { primary: Action; secondary: Action };
    media: HeroVideoMedia;
  };
  aboutTeaser: {
    intro: SectionIntro;
    paragraph: string;
    action: Action;
  };
  services: { intro: SectionIntro; items: Feature[] };
  why: { intro: SectionIntro; items: Feature[] };
  gallery: { intro: SectionIntro; images: SectionImage[] };
  reviews: {
    intro: SectionIntro;
    rating: { value: number; platform: string };
    highlights: string[];
  };
  cta: { title: string; subtitle: string; action: Action; note: string };
}

export const home: HomeContent = {
  hero: {
    eyebrow: "Hairstylist & Barber in Kassel",
    title: "Kerem Kirali",
    subtitle:
      "Individuelle Beratung, präzises Handwerk und ein Look, der zu Ihnen passt — nicht zum Trend. Wer Qualität sucht, ist hier richtig.",
    actions: {
      primary: { label: "Termin vereinbaren", href: "/kontakt#termin" },
      secondary: { label: "Leistungen ansehen", href: "/leistungen" },
    },
    media: {
      type: "video",
      src: "/videos/hero.mp4",
      webmSrc: "/videos/hero.webm",
      poster: "/videos/hero-poster.jpg",
      alt: "Kerem Kirali schneidet einem Kunden im Salon die Haare",
    },
  },
  aboutTeaser: {
    intro: {
      eyebrow: "Der Inhaber",
      title: "Kreativität, Disziplin, Persönlichkeit",
    },
    paragraph:
      "Kerem Kirali ist eine Mischung aus Kreativität, Disziplin und Persönlichkeit, die ihm mit der Zeit zu einer Institution in Kassel gemacht hat. Ein kreativer Perfektionist, inspiriert von ehrlichem Handwerk und wahrer Schönheit — und vor allem ein aufrichtiger Zuhörer, der nicht nur in Stilfragen stets den richtigen Ton findet.",
    action: { label: "Mehr über Kerem erfahren", href: "/ueber-uns" },
  },
  services: {
    intro: {
      eyebrow: "Dienstleistungen",
      title: "Für jeden Anspruch der passende Schnitt",
      subtitle:
        "Vier Kategorien, ein Qualitätsanspruch — von präzisen Herrenschnitten bis zu individuellen Farbkonzepten.",
    },
    items: serviceCategories.map((category) => ({
      icon: category.icon,
      title: category.title,
      description: category.teaser,
    })),
  },
  why: {
    intro: {
      eyebrow: "Warum Kerem Kirali",
      title: "Qualität statt Masse",
    },
    items: [
      {
        icon: Target,
        title: "Individuelle Typberatung",
        description:
          "Kein Trend von der Stange: jeder Schnitt wird auf Gesichtsform, Kopfform und Haarstruktur abgestimmt.",
      },
      {
        icon: CalendarCheck,
        title: "Ausschließlich auf Termin",
        description:
          "Keine Hektik, keine langen Wartezeiten — volle Aufmerksamkeit für jeden Gast.",
      },
      {
        icon: Scissors,
        title: "Handwerk auf höchstem Niveau",
        description:
          "Präzise Techniken, hochwertige Produkte und ein Auge fürs Detail, das man sieht.",
      },
      {
        icon: Handshake,
        title: "Vertrauen & Persönlichkeit",
        description:
          "Ein Ort zum Ankommen — nicht nur ein Haarschnitt, sondern eine Auszeit vom Alltag.",
      },
    ] satisfies Feature[],
  },
  gallery: {
    intro: {
      eyebrow: "Galerie",
      title: "Ein Blick in den Salon",
    },
    images: [
      {
        src: "/images/salon/kerem-cutting.jpg",
        alt: "Kerem Kirali bei der Arbeit an einem Herrenschnitt",
      },
      {
        src: "/images/salon/interior-1.jpg",
        alt: "Innenraum des Salons mit Barbierstühlen und Spiegeln",
      },
      {
        src: "/images/salon/chair-detail.jpg",
        alt: "Detailaufnahme eines Barbierstuhls",
      },
      {
        src: "/images/salon/interior-2.jpg",
        alt: "Blick durch den Salon Richtung Empfang",
      },
    ],
  },
  reviews: {
    intro: {
      eyebrow: "Bewertungen",
      title: "Was Gäste immer wieder sagen",
    },
    rating: { value: 5.0, platform: "Planity" },
    highlights: [
      "Bester Friseur in Kassel",
      "Sehr präzise Schnitte",
      "Hohe Fachkompetenz",
      "Freundlicher Service",
      "Modernes Ambiente",
      "Saubere Arbeit",
      "Professionelle Beratung",
      "Angemessene Preise",
      "Entspannte Atmosphäre",
      "Exzellente Fade-Technik",
    ],
  },
  cta: {
    title: "Bereit für Ihren perfekten Look?",
    subtitle:
      "Der Salon arbeitet ausschließlich auf Terminbasis — damit Sie die volle Aufmerksamkeit bekommen, die Sie verdienen.",
    action: { label: "Termin vereinbaren", href: "/kontakt#termin" },
    note: "Friedrich-Ebert-Straße 53, 34117 Kassel",
  },
};
