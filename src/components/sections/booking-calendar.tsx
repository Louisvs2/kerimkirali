"use client";

import { useEffect, useState, useTransition } from "react";
import { Check, ChevronLeft, Loader2 } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  listSlotsAction,
  listStaffAction,
  submitBookingAction,
} from "@/lib/actions/booking";
import { cn } from "@/lib/utils";
import { bookableServices, serviceCategories } from "@/content/services";

interface StaffMember {
  id: string;
  slug: string;
  name: string;
  role: string;
}

type Step = "service" | "staff" | "datetime" | "details" | "success";
const STEP_ORDER: Step[] = ["service", "staff", "datetime", "details"];

// Shown when the booking backend isn't reachable yet (e.g. the Supabase
// project from supabase/README.md hasn't been set up). Keeps the flow
// demoable end-to-end instead of dead-ending in an error — clearly marked
// as a placeholder rather than pretending these are real team members.
const PLACEHOLDER_STAFF: StaffMember[] = [
  {
    id: "placeholder-1",
    slug: "platzhalter-1",
    name: "Mitarbeiter A (Platzhalter)",
    role: "Wird ergänzt",
  },
  {
    id: "placeholder-2",
    slug: "platzhalter-2",
    name: "Mitarbeiter B (Platzhalter)",
    role: "Wird ergänzt",
  },
];

function formatSlot(iso: string) {
  return new Date(iso).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  });
}

function isoDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// Multi-step booking flow: Leistung → Mitarbeiter → Datum/Uhrzeit →
// Kontaktdaten. Slots come from the database (get_available_slots), so
// what's shown here is genuinely free — booking calls the SECURITY DEFINER
// RPC, which re-checks and is protected by a DB-level exclusion constraint
// against double-booking (supabase/migrations/0001_booking_schema.sql).
export function BookingCalendar({ className }: { className?: string }) {
  const [step, setStep] = useState<Step>("service");
  const [serviceSlug, setServiceSlug] = useState<string | null>(null);

  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [staffLoading, setStaffLoading] = useState(true);
  const [staffIsPlaceholder, setStaffIsPlaceholder] = useState(false);
  const [staffId, setStaffId] = useState<string | null>(null);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const service = bookableServices.find((s) => s.slug === serviceSlug);
  const selectedStaff = staff.find((s) => s.id === staffId);

  useEffect(() => {
    listStaffAction()
      .then((result) => {
        if (result.length === 0) throw new Error("no staff");
        setStaff(result);
      })
      .catch(() => {
        setStaff(PLACEHOLDER_STAFF);
        setStaffIsPlaceholder(true);
      })
      .finally(() => setStaffLoading(false));
  }, []);

  useEffect(() => {
    if (!date || !staffId || !serviceSlug) return;
    setSlotsLoading(true);
    setSelectedSlot(null);
    listSlotsAction(staffId, isoDate(date), serviceSlug)
      .then(setSlots)
      .catch(() => setSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [date, staffId, serviceSlug]);

  function goBack() {
    const index = STEP_ORDER.indexOf(step);
    if (index > 0) setStep(STEP_ORDER[index - 1]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!staffId || !serviceSlug || !selectedSlot) return;
    setSubmitError(null);
    startTransition(async () => {
      const result = await submitBookingAction({
        staffId,
        serviceSlug,
        startsAt: selectedSlot,
        customerName: name,
        customerEmail: email,
        customerPhone: phone || undefined,
      });
      if (result.ok) {
        setStep("success");
      } else {
        setSubmitError(result.error ?? "Die Buchung ist fehlgeschlagen.");
      }
    });
  }

  if (step === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[var(--surface)] p-10 text-center backdrop-blur-[var(--glass-blur)]",
          className,
        )}
      >
        <Check className="size-8 text-brand" aria-hidden />
        <div>
          <p className="text-lg font-medium">Termin bestätigt</p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Wir haben dir eine Bestätigung an {email} geschickt. Bis bald!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-[var(--surface)] p-6 backdrop-blur-[var(--glass-blur)] sm:p-10",
        className,
      )}
    >
      {step !== "service" && (
        <button
          type="button"
          onClick={goBack}
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Zurück
        </button>
      )}

      {step === "service" && (
        <div className="flex flex-col gap-6">
          <p className="text-sm font-medium">Welche Leistung?</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {bookableServices.map((s) => {
              const category = serviceCategories.find(
                (c) => c.slug === s.categorySlug,
              );
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => {
                    setServiceSlug(s.slug);
                    setStep("staff");
                  }}
                  className="flex flex-col items-start gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left transition-colors hover:border-brand/40 hover:bg-white/[0.04]"
                >
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {category?.title} · {s.durationMinutes} Min.
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === "staff" && (
        <div className="flex flex-col gap-6">
          <p className="text-sm font-medium">Bei wem möchtest du buchen?</p>
          {staffLoading && (
            <p className="text-sm text-muted-foreground">Lädt …</p>
          )}
          {staffIsPlaceholder && (
            <p className="text-sm text-muted-foreground">
              Testmodus: Die echte Terminverwaltung folgt in Kürze.
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {staff.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => {
                  setStaffId(member.id);
                  setStep("datetime");
                }}
                className="flex flex-col items-start gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left transition-colors hover:border-brand/40 hover:bg-white/[0.04]"
              >
                <span className="text-sm font-medium">{member.name}</span>
                <span className="text-xs text-muted-foreground">
                  {member.role}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "datetime" && (
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium">Datum wählen</p>
            <Calendar
              selected={date}
              onSelect={setDate}
              disabled={(d) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return d < today;
              }}
            />
          </div>
          <div>
            <p className="mb-4 text-sm font-medium">Uhrzeit wählen</p>
            {!date && (
              <p className="text-sm text-muted-foreground">
                Bitte zuerst ein Datum wählen.
              </p>
            )}
            {date && slotsLoading && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Verfügbare Zeiten werden geladen …
              </p>
            )}
            {date && !slotsLoading && slots.length === 0 && (
              <p className="text-sm text-muted-foreground">
                An diesem Tag sind leider keine Termine mehr frei.
              </p>
            )}
            {date && !slotsLoading && slots.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setSelectedSlot(slot);
                      setStep("details");
                    }}
                    className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm transition-colors hover:border-brand/40 hover:bg-white/[0.04]"
                  >
                    {formatSlot(slot)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {step === "details" && service && selectedStaff && selectedSlot && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
            <p className="font-medium">{service.name}</p>
            <p className="mt-1 text-muted-foreground">
              {selectedStaff.name} ·{" "}
              {new Date(selectedSlot).toLocaleDateString("de-DE", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}{" "}
              · {formatSlot(selectedSlot)} Uhr
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="booking-name">Name</Label>
              <Input
                id="booking-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="booking-phone">Telefon (optional)</Label>
              <Input
                id="booking-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="booking-email">E-Mail</Label>
            <Input
              id="booking-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}
          <Button type="submit" size="lg" disabled={pending} className="w-fit">
            {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
            Termin verbindlich buchen
          </Button>
        </form>
      )}
    </div>
  );
}
