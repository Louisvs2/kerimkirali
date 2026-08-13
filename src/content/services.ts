// Real content for Kerem Kirali — Hairstylist & Barber, sourced from the
// client briefing (Dienstleistungen, Besonderheiten). Categories drive both
// the homepage teaser and the full /leistungen page — one source of truth.

import {
  Droplets,
  Scissors,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";

export interface ServiceCategory {
  slug: string;
  icon: LucideIcon;
  title: string;
  /** One-sentence teaser, used on the homepage. */
  teaser: string;
  items: string[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "herren",
    icon: Scissors,
    title: "Herren",
    teaser:
      "Präzise Schnitte und Barbierarbeiten — von klassisch bis modern, inklusive Skin Fade und Bartpflege.",
    items: [
      "Waschen",
      "Schneiden",
      "Föhnen",
      "Klassische Haarschnitte",
      "Moderne Haarschnitte",
      "Skin Fade",
      "Bartpflege",
      "Bartrasur",
      "Konturen",
      "Maschinenhaarschnitt",
      "Typberatung",
      "Augenbrauenpflege",
    ],
  },
  {
    slug: "damen",
    icon: User,
    title: "Damen",
    teaser:
      "Haarschnitt, Styling und individuelle Farbkonzepte — von Balayage bis zur passenden Tönung.",
    items: [
      "Haarschnitt",
      "Styling",
      "Coloration",
      "Balayage",
      "Strähnen",
      "Tönungen",
      "Haarpflege",
      "Individuelle Farbkonzepte",
    ],
  },
  {
    slug: "barber",
    icon: Droplets,
    title: "Barber",
    teaser:
      "Bartpflege und Nassrasur mit traditionellem Handwerk und modernen Konturen.",
    items: ["Bart trimmen", "Bart rasieren", "Nassrasur", "Konturen", "Pflege"],
  },
  {
    slug: "pflege",
    icon: Sparkles,
    title: "Pflege",
    teaser:
      "Hochwertige Produkte und Wellness-Behandlungen für Haar, Augenbrauen und Wimpern.",
    items: [
      "Hochwertige Haarpflege",
      "Professionelle Produkte",
      "Wellness",
      "Gesichtsbehandlungen",
      "Augenbrauen",
      "Wimpern",
      "Fadentechnik",
    ],
  },
];

export const masterHaircut = {
  eyebrow: "Signature-Service",
  title: "Der Master Haircut",
  description:
    "Ein besonderes Angebot mit ausführlicher Typberatung: Gesichtsform, Kopfform, Haarstruktur, Haardichte und Haarstärke werden analysiert. Der Schnitt erfolgt nach einem geometrischen Haarschneidesystem und wird individuell auf den Kunden abgestimmt.",
  analysis: [
    "Gesichtsform",
    "Kopfform",
    "Haarstruktur",
    "Haardichte",
    "Haarstärke",
  ],
};

export interface BookableService {
  slug: string;
  name: string;
  categorySlug: string;
  durationMinutes: number;
}

// Curated, bookable subset of the full service menu above — not every line
// item is a standalone appointment (nobody books "Waschen" alone). Duration
// is the single source of truth the booking system uses to compute slots;
// it is intentionally not split any finer than this without real input from
// Kerem on how long each treatment actually takes.
export const bookableServices: BookableService[] = [
  {
    slug: "herrenschnitt",
    name: "Herrenschnitt",
    categorySlug: "herren",
    durationMinutes: 30,
  },
  {
    slug: "herrenschnitt-bart",
    name: "Herrenschnitt & Bartpflege",
    categorySlug: "herren",
    durationMinutes: 45,
  },
  {
    slug: "skin-fade",
    name: "Skin Fade",
    categorySlug: "herren",
    durationMinutes: 45,
  },
  {
    slug: "master-haircut",
    name: "Master Haircut",
    categorySlug: "herren",
    durationMinutes: 60,
  },
  {
    slug: "damenschnitt",
    name: "Damenschnitt & Styling",
    categorySlug: "damen",
    durationMinutes: 45,
  },
  {
    slug: "coloration",
    name: "Coloration / Balayage",
    categorySlug: "damen",
    durationMinutes: 90,
  },
  {
    slug: "bartrasur",
    name: "Bartrasur & Konturen",
    categorySlug: "barber",
    durationMinutes: 30,
  },
  {
    slug: "pflegebehandlung",
    name: "Pflegebehandlung",
    categorySlug: "pflege",
    durationMinutes: 30,
  },
];

export const servicesPage = {
  hero: {
    eyebrow: "Leistungen",
    title: "Handwerk auf höchstem Niveau",
    subtitle:
      "Von präzisen Herrenschnitten über individuelle Farbkonzepte bis zum Master Haircut — jede Leistung beginnt mit einer ehrlichen Beratung.",
  },
  cta: {
    title: "Nicht sicher, welcher Schnitt zu Ihnen passt?",
    subtitle:
      "Im persönlichen Gespräch finden wir gemeinsam den Look, der zu Ihnen passt.",
    action: { label: "Termin vereinbaren", href: "/kontakt#termin" },
  },
};
