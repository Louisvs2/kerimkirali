import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

interface PageMetadataInput {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/leistungen". Defaults to "/". */
  path?: string;
}

// Every page calls this once with its title/description (PLAN.md §6) —
// canonical URL, Open Graph, and Twitter tags come out consistent and
// automatically, without repeating boilerplate per page.
export function pageMetadata({
  title,
  description,
  path = "/",
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} – ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} – ${siteConfig.name}`,
      description,
    },
  };
}

export { siteUrl };
