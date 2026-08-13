import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addAvailabilityRuleAction,
  addTimeOffAction,
  deleteAvailabilityRuleAction,
  deleteTimeOffAction,
} from "@/lib/actions/admin";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Verfügbarkeit",
  robots: { index: false },
};

const WEEKDAYS = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

interface Staff {
  id: string;
  name: string;
}

interface AvailabilityRule {
  id: string;
  staff_id: string;
  weekday: number;
  start_time: string;
  end_time: string;
}

interface TimeOff {
  id: string;
  staff_id: string;
  starts_at: string;
  ends_at: string;
  reason: string | null;
}

export default async function AvailabilityPage() {
  const supabase = await createClient();

  const [{ data: staff }, { data: rules }, { data: timeOff }] =
    await Promise.all([
      supabase
        .from("staff")
        .select("id, name")
        .order("name")
        .returns<Staff[]>(),
      supabase
        .from("availability_rules")
        .select("id, staff_id, weekday, start_time, end_time")
        .order("weekday")
        .returns<AvailabilityRule[]>(),
      supabase
        .from("time_off")
        .select("id, staff_id, starts_at, ends_at, reason")
        .order("starts_at")
        .returns<TimeOff[]>(),
    ]);

  const staffList = staff ?? [];
  const staffName = (id: string) =>
    staffList.find((s) => s.id === id)?.name ?? "—";

  return (
    <div className="flex flex-col gap-16">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Verfügbarkeit</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Arbeitszeiten und Blockzeiten pro Mitarbeiter.
        </p>
      </div>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium">Wöchentliche Arbeitszeiten</h2>
        <ul className="divide-y divide-border/60 border-t border-border/60">
          {(rules ?? []).map((rule) => (
            <li
              key={rule.id}
              className="flex items-center justify-between py-3 text-sm"
            >
              <span>
                {staffName(rule.staff_id)} · {WEEKDAYS[rule.weekday]} ·{" "}
                {rule.start_time.slice(0, 5)}–{rule.end_time.slice(0, 5)}
              </span>
              <form
                action={async () => {
                  "use server";
                  await deleteAvailabilityRuleAction(rule.id);
                }}
              >
                <Button type="submit" variant="ghost" size="sm">
                  Entfernen
                </Button>
              </form>
            </li>
          ))}
        </ul>

        <form
          action={addAvailabilityRuleAction}
          className="grid gap-4 rounded-xl border border-border/60 bg-muted p-4 sm:grid-cols-4 sm:items-end"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="rule-staff">Mitarbeiter</Label>
            <select
              id="rule-staff"
              name="staffId"
              required
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              {staffList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="rule-weekday">Wochentag</Label>
            <select
              id="rule-weekday"
              name="weekday"
              required
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              {WEEKDAYS.map((day, i) => (
                <option key={day} value={i}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="rule-start">Von</Label>
            <Input id="rule-start" name="startTime" type="time" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="rule-end">Bis</Label>
            <Input id="rule-end" name="endTime" type="time" required />
          </div>
          <Button type="submit" className="sm:col-span-4 sm:w-fit">
            Arbeitszeit hinzufügen
          </Button>
        </form>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-medium">Blockzeiten (Urlaub, Krankheit)</h2>
        <ul className="divide-y divide-border/60 border-t border-border/60">
          {(timeOff ?? []).map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between py-3 text-sm"
            >
              <span>
                {staffName(entry.staff_id)} ·{" "}
                {new Date(entry.starts_at).toLocaleString("de-DE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}{" "}
                –{" "}
                {new Date(entry.ends_at).toLocaleString("de-DE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
                {entry.reason && ` · ${entry.reason}`}
              </span>
              <form
                action={async () => {
                  "use server";
                  await deleteTimeOffAction(entry.id);
                }}
              >
                <Button type="submit" variant="ghost" size="sm">
                  Entfernen
                </Button>
              </form>
            </li>
          ))}
        </ul>

        <form
          action={addTimeOffAction}
          className="grid gap-4 rounded-xl border border-border/60 bg-muted p-4 sm:grid-cols-4 sm:items-end"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="off-staff">Mitarbeiter</Label>
            <select
              id="off-staff"
              name="staffId"
              required
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              {staffList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="off-start">Von</Label>
            <Input
              id="off-start"
              name="startsAt"
              type="datetime-local"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="off-end">Bis</Label>
            <Input id="off-end" name="endsAt" type="datetime-local" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="off-reason">Grund (optional)</Label>
            <Input id="off-reason" name="reason" placeholder="Urlaub" />
          </div>
          <Button type="submit" className="sm:col-span-4 sm:w-fit">
            Blockzeit hinzufügen
          </Button>
        </form>
      </section>
    </div>
  );
}
