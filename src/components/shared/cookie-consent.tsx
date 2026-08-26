"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "maps-consent";

/**
 * Gates a third-party embed (e.g. Google Maps) behind explicit consent —
 * loading it transfers data to that provider (DSGVO). Mirrors the previous
 * site's own "Inhalt entsperren" pattern. The choice is remembered locally
 * so returning visitors don't see the prompt again.
 */
export function ConsentGate({
  title,
  description,
  action = "Karte laden",
  className,
  children,
}: {
  title: string;
  description: string;
  action?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(window.localStorage.getItem(STORAGE_KEY) === "granted");
  }, []);

  if (consented) return <>{children}</>;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-[var(--surface)] p-10 text-center backdrop-blur-[var(--glass-blur)]",
        className,
      )}
    >
      <MapPin className="size-6 text-muted-foreground" aria-hidden />
      <div className="max-w-sm">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <Button
        onClick={() => {
          window.localStorage.setItem(STORAGE_KEY, "granted");
          setConsented(true);
        }}
      >
        {action}
      </Button>
    </div>
  );
}
