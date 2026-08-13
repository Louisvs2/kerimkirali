// Copy for the /kontakt page. Channels and opening hours come from
// src/config/site.ts — only the narrative copy lives here.

import type { SectionIntro } from "@/types/content";

export const contact: {
  booking: { intro: SectionIntro };
  intro: SectionIntro;
  map: { title: string; description: string; action: string };
} = {
  booking: {
    intro: {
      eyebrow: "Termin buchen",
      title: "In vier Schritten zum Termin",
      subtitle:
        "Leistung, Mitarbeiter, Datum und Uhrzeit wählen — die Verfügbarkeit wird live geprüft, dein Termin ist sofort bestätigt.",
    },
  },
  intro: {
    eyebrow: "Kontakt",
    title: "Lieber persönlich sprechen?",
    subtitle:
      "Rufen Sie an oder schreiben Sie uns — wir melden uns zeitnah zurück.",
  },
  map: {
    title: "So finden Sie uns",
    description:
      "Beim Laden der Karte wird eine Verbindung zu Google hergestellt und es werden Daten an Google übertragen.",
    action: "Karte laden",
  },
};
