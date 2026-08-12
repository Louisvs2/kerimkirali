import { siteConfig } from "@/config/site";
import { siteUrl } from "@/lib/metadata";

const DAY_MAP: Record<string, string> = {
  Montag: "Monday",
  Dienstag: "Tuesday",
  Mittwoch: "Wednesday",
  Donnerstag: "Thursday",
  Freitag: "Friday",
  Samstag: "Saturday",
  Sonntag: "Sunday",
};

// HairSalon JSON-LD (schema.org LocalBusiness subtype) — address and
// opening hours only, sourced from config/site.ts. Deliberately omits
// AggregateRating: no verifiable review count is available yet, and
// structured data must never claim more than can be backed up.
export function hairSalonSchema() {
  const openingHoursSpecification = siteConfig.openingHours
    .filter((entry) => entry.hours !== "Geschlossen")
    .map((entry) => {
      const [opens, closes] = entry.hours.split("–");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${DAY_MAP[entry.day]}`,
        opens,
        closes,
      };
    });

  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: siteConfig.contact.address && {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address[0],
      addressLocality: "Kassel",
      postalCode: siteConfig.contact.address[1]?.split(" ")[0],
      addressCountry: "DE",
    },
    openingHoursSpecification,
  };
}
