import type { Metadata } from "next";

import { activeLook } from "@/config/theme";
import { siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import { siteUrl } from "@/lib/metadata";
import { hairSalonSchema } from "@/lib/schema";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} – Hairstylist & Barber in Kassel`,
    template: `%s – ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-look={activeLook} className={fontVariables}>
      <body>
        {children}
        <WhatsAppButton />
        <script
          type="application/ld+json"
          // Fully typed, server-generated JSON — never user input.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(hairSalonSchema()),
          }}
        />
      </body>
    </html>
  );
}
