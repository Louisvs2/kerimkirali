import type { Metadata } from "next";

import { LegalText } from "@/components/shared/legal-text";
import { datenschutz } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: datenschutz.title,
  description:
    "Datenschutzerklärung von Kerem Kirali – Hairstylist & Barber in Kassel.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return <LegalText content={datenschutz} />;
}
