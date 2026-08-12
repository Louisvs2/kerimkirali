"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="flex min-h-[70vh] items-center">
      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">Fehler</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Etwas ist schiefgelaufen
          </h1>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            Bitte versuchen Sie es erneut. Besteht das Problem weiterhin,
            kontaktieren Sie uns gerne direkt.
          </p>
          <Button size="lg" onClick={reset}>
            Erneut versuchen
          </Button>
        </div>
      </Container>
    </Section>
  );
}
