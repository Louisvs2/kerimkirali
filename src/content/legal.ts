// Legal page content for Kerem Kirali — Hairstylist & Barber. Data taken
// verbatim from the previous site's Impressum. Handelsregister-Nr. and
// USt-ID were already marked "wird nachgereicht" there and are carried over
// unchanged — inventing values here would be worse than leaving them open.
// The Datenschutzerklärung stays a reviewed-structure placeholder: final
// wording must be checked by the client's legal counsel before launch.

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalPageContent {
  title: string;
  sections: LegalSection[];
}

export const impressum: LegalPageContent = {
  title: "Impressum",
  sections: [
    {
      title: "Angaben gemäß § 5 DDG",
      paragraphs: [
        "Kerem Kirali Hairstylist & Barber",
        "Inhaber: Kerem Kirali",
        "Friedrich-Ebert-Straße 53, 34117 Kassel",
      ],
    },
    {
      title: "Kontakt",
      paragraphs: ["Telefon: +49 561 7015040", "E-Mail: info@keremkirali.de"],
    },
    {
      title: "Registereintrag",
      paragraphs: [
        "Registergericht: Amtsgericht Kassel",
        "Handelsregisternummer: wird nachgereicht",
      ],
    },
    {
      title: "Umsatzsteuer-ID",
      paragraphs: [
        "Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: wird nachgereicht",
      ],
    },
    {
      title: "Berufshaftpflichtversicherung",
      paragraphs: ["Allianz Versicherung, Geltungsbereich: Deutschland"],
    },
    {
      title: "EU-Streitschlichtung",
      paragraphs: [
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse finden Sie oben im Impressum.",
        "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      ],
    },
    {
      title: "Bildnachweis",
      paragraphs: [
        "Alle Bilder, auf denen Personen zu sehen sind, wurden gemäß § 13 UrhG für Kerem Kirali erstellt.",
      ],
    },
  ],
};

export const datenschutz: LegalPageContent = {
  title: "Datenschutzerklärung",
  sections: [
    {
      title: "Verantwortlicher",
      paragraphs: [
        "Verantwortlich für die Datenverarbeitung auf dieser Website: Kerem Kirali Hairstylist & Barber, Friedrich-Ebert-Straße 53, 34117 Kassel, info@keremkirali.de.",
      ],
    },
    {
      title: "Hosting",
      paragraphs: [
        "Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der Seiten verarbeitet Vercel technisch notwendige Daten (z. B. IP-Adresse) zur Auslieferung der Inhalte. [Details und Rechtsgrundlage von Rechtsberatung ergänzen lassen.]",
      ],
    },
    {
      title: "Kontaktformular",
      paragraphs: [
        "Wenn Sie uns über das Kontaktformular kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung Ihrer Anfrage. Der Versand erfolgt über den Dienstleister Resend. [Rechtsgrundlage, Speicherdauer und ggf. AV-Vertrag von Rechtsberatung ergänzen lassen.]",
      ],
    },
    {
      title: "Google Maps",
      paragraphs: [
        "Auf der Kontaktseite kann optional eine Karte von Google Maps eingebunden werden. Die Karte wird erst nach Ihrer ausdrücklichen Zustimmung geladen; erst dann werden Daten (u. a. Ihre IP-Adresse) an Google LLC übertragen. [Rechtsgrundlage und Details von Rechtsberatung ergänzen lassen.]",
      ],
    },
    {
      title: "Ihre Rechte",
      paragraphs: [
        "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Wenden Sie sich dazu an die oben genannte Adresse. Zudem besteht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde.",
      ],
    },
    {
      title: "Hinweis",
      paragraphs: [
        "[Diese Datenschutzerklärung ist ein Platzhalter-Gerüst mit den bekannten realen Diensten (Vercel, Resend, optional Google Maps). Vor dem Launch vollständig ausarbeiten und rechtlich prüfen lassen — insbesondere sobald ein Terminbuchungs-Anbieter angebunden wird.]",
      ],
    },
  ],
};
