import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BookingCalendar } from "@/components/sections/booking-calendar";
import { ContactSection } from "@/components/sections/contact";
import { ContactForm } from "@/components/sections/contact-form";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
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
      <Section id="termin" className="pt-32 sm:pt-40">
        <Container>
          <SectionHeading {...contact.booking.intro} />
          <FadeIn className="mx-auto mt-14 max-w-3xl sm:mt-20">
            <BookingCalendar />
          </FadeIn>
        </Container>
      </Section>
      <ContactSection
        intro={contact.intro}
        email={siteConfig.contact.email}
        phone={siteConfig.contact.phone}
        address={siteConfig.contact.address}
        openingHours={siteConfig.openingHours}
        className="border-t border-border/60"
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
