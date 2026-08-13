import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { cancelAppointmentAction } from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Termine",
  robots: { index: false },
};

interface AppointmentRow {
  id: string;
  service_name: string;
  starts_at: string;
  ends_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  status: string;
  staff: { name: string } | null;
}

export default async function AdminAppointmentsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select(
      "id, service_name, starts_at, ends_at, customer_name, customer_email, customer_phone, status, staff:staff_id(name)",
    )
    .eq("status", "confirmed")
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true })
    .returns<AppointmentRow[]>();

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Termine konnten nicht geladen werden.
      </p>
    );
  }

  const appointments = data ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Kommende Termine
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {appointments.length} bestätigte{" "}
          {appointments.length === 1 ? "Termin" : "Termine"}
        </p>
      </div>

      {appointments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aktuell keine bevorstehenden Termine.
        </p>
      ) : (
        <ul className="divide-y divide-border/60 border-t border-border/60">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-medium">
                  {new Date(appointment.starts_at).toLocaleString("de-DE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Europe/Berlin",
                  })}{" "}
                  Uhr — {appointment.service_name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {appointment.customer_name} · {appointment.customer_email}
                  {appointment.customer_phone &&
                    ` · ${appointment.customer_phone}`}
                  {appointment.staff && ` · bei ${appointment.staff.name}`}
                </p>
              </div>
              <form
                action={async () => {
                  "use server";
                  await cancelAppointmentAction(appointment.id);
                }}
              >
                <Button type="submit" variant="outline" size="sm">
                  Stornieren
                </Button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
