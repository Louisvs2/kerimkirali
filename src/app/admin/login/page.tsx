import type { Metadata } from "next";

import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/shared/logo";

export const metadata: Metadata = {
  title: "Admin-Login",
  robots: { index: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10 bg-background px-6">
      <Logo />
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="text-center">
          <h1 className="text-xl font-semibold tracking-tight">
            Admin-Bereich
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Nur für Kerem Kirali — Terminverwaltung.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
