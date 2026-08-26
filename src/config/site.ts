// Central client configuration (PLAN.md §3) — the ONLY place where brand
// identity lives. Components must never hardcode a name, claim, or link;
// they read from this config so a new client project is a config change.

export interface SocialLink {
  label: string;
  href: string;
}

export interface OpeningHoursEntry {
  day: string;
  /** Human-readable hours, or "Geschlossen". */
  hours: string;
}

export interface SiteLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SiteConfig {
  /** Brand/display name — used in the header, footer, and metadata. */
  name: string;
  /** One-sentence description — used in metadata and the footer brand block. */
  description: string;
  /** Wordmark shown in the header/footer instead of the plain text name. */
  logo: SiteLogo;
  /** White-ink variant for placement over dark media (the hero video) —
   *  the default `logo` is dark ink, meant for the light page background. */
  logoInverse?: SiteLogo;
  /** Public contact channels — shown on the contact page. */
  contact: {
    email: string;
    phone?: string;
    /** Address lines, rendered as-is. */
    address?: string[];
  };
  openingHours: OpeningHoursEntry[];
  /**
   * Booking provider URL (Fresha, Planity, SimplyBook.me, …). Every "Termin
   * vereinbaren" CTA reads this single value — once the client has chosen a
   * provider, wiring it up is a one-line change here. Until then, CTAs fall
   * back to a phone call.
   */
  bookingUrl?: string;
  /** Active social profiles only (dead profiles hurt trust, DESIGN.md §13). */
  socials: SocialLink[];
}

export const siteConfig: SiteConfig = {
  name: "Kerem Kirali",
  description:
    "Premium Hairstylist & Barber in Kassel — individuelle Beratung, präzises Handwerk und ein Master Haircut, der auf Gesichtsform und Haarstruktur abgestimmt wird.",
  logo: {
    src: "/images/logo/kerem-kirali-logo.png",
    alt: "Kerem Kirali — Hairstylist & Barber",
    width: 1650,
    height: 290,
  },
  logoInverse: {
    src: "/images/logo/kerem-kirali-logo-inverse.png",
    alt: "Kerem Kirali — Hairstylist & Barber",
    width: 1649,
    height: 289,
  },
  contact: {
    email: "info@keremkirali.de",
    phone: "+49 561 7015040",
    address: ["Friedrich-Ebert-Straße 53", "34117 Kassel"],
  },
  openingHours: [
    { day: "Montag", hours: "Geschlossen" },
    { day: "Dienstag", hours: "09:00–18:00" },
    { day: "Mittwoch", hours: "09:00–18:00" },
    { day: "Donnerstag", hours: "09:00–18:00" },
    { day: "Freitag", hours: "10:00–19:00" },
    { day: "Samstag", hours: "10:00–17:00" },
    { day: "Sonntag", hours: "Geschlossen" },
  ],
  bookingUrl: undefined,
  socials: [],
};
