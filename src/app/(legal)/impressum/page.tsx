import type { Metadata } from "next";

import { LegalText } from "@/components/shared/legal-text";
import { impressum } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: impressum.title,
  description: "Impressum von Kerem Kirali – Hairstylist & Barber in Kassel.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return <LegalText content={impressum} />;
}
