// Copy for the /kontakt page. Channels and opening hours come from
// src/config/site.ts — only the narrative copy lives here.

import type { SectionIntro } from "@/types/content";

export const contact: {
  intro: SectionIntro;
  map: { title: string; description: string; action: string };
} = {
  intro: {
    eyebrow: "Kontakt",
    title: "Termin vereinbaren",
    subtitle:
      "Der Salon arbeitet ausschließlich auf Terminbasis. Rufen Sie an, schreiben Sie uns oder nutzen Sie das Formular — wir melden uns zeitnah zurück.",
  },
  map: {
    title: "So finden Sie uns",
    description:
      "Beim Laden der Karte wird eine Verbindung zu Google hergestellt und es werden Daten an Google übertragen.",
    action: "Karte laden",
  },
};
