import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/actions/admin";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link
                href="/admin"
                className="transition-colors hover:text-foreground"
              >
                Termine
              </Link>
              <Link
                href="/admin/verfuegbarkeit"
                className="transition-colors hover:text-foreground"
              >
                Verfügbarkeit
              </Link>
            </nav>
          </div>
          <form action={signOutAction}>
            <Button type="submit" variant="ghost" size="sm">
              Abmelden
            </Button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
    </div>
  );
}
