import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/metadata";

const routes = ["/", "/ueber-uns", "/leistungen", "/kontakt"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
