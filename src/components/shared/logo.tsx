import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// The wordmark, read from config/site.ts — never hardcoded so a rebrand is a
// config change (PLAN.md §3). Fixed height keeps the header from shifting
// while the browser resolves the file.
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} – Startseite`}
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={siteConfig.logo.src}
        alt={siteConfig.logo.alt}
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        priority
        className="h-7 w-auto"
      />
    </Link>
  );
}
