import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactSection } from "@/components/sections/contact";
import { ContactForm } from "@/components/sections/contact-form";
import { ConsentGate } from "@/components/shared/cookie-consent";
import { siteConfig } from "@/config/site";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt & Termin",
  description:
    "Friseur Kassel: Adresse, Öffnungszeiten und Kontakt von Kerem Kirali – Hairstylist & Barber in der Friedrich-Ebert-Straße 53.",
  path: "/kontakt",
});

export default function KontaktPage() {
  const mapQuery = encodeURIComponent(
    (siteConfig.contact.address ?? []).join(", "),
  );

  return (
    <>
      <ContactSection
        id="termin"
        intro={contact.intro}
        email={siteConfig.contact.email}
        phone={siteConfig.contact.phone}
        address={siteConfig.contact.address}
        openingHours={siteConfig.openingHours}
      >
        <ContactForm />
      </ContactSection>
      <Section className="pt-0">
        <Container>
          <ConsentGate
            title={contact.map.title}
            description={contact.map.description}
            action={contact.map.action}
            className="aspect-[16/9]"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <iframe
                title={contact.map.title}
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ConsentGate>
        </Container>
      </Section>
    </>
  );
}
