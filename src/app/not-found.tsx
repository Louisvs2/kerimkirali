import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] items-center">
      <Container>
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Diese Seite gibt es nicht
          </h1>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            Die aufgerufene Seite wurde nicht gefunden. Vielleicht hilft Ihnen
            einer der folgenden Links weiter.
          </p>
          <Button asChild size="lg">
            <Link href="/">Zur Startseite</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
