import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

export interface StaffMember {
  id: string;
  slug: string;
  name: string;
  role: string;
}

export async function getActiveStaff(): Promise<StaffMember[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("staff")
    .select("id, slug, name, role")
    .eq("active", true)
    .order("name");

  if (error) throw error;
  return data;
}

export async function getAvailableSlots(
  staffId: string,
  date: string,
  durationMinutes: number,
): Promise<Date[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_available_slots", {
    p_staff_id: staffId,
    p_date: date,
    p_duration_minutes: durationMinutes,
  });

  if (error) throw error;
  return (data ?? []).map(
    (row: { slot_start: string }) => new Date(row.slot_start),
  );
}

// Shared between the client-side form and the server action so the
// validation rules can never drift between the two (CLAUDE.md §9).
export const bookingSchema = z.object({
  staffId: z.uuid(),
  serviceSlug: z.string().min(1),
  startsAt: z.string().min(1),
  customerName: z.string().trim().min(2, "Bitte gib deinen Namen an."),
  customerEmail: z.email("Bitte gib eine gültige E-Mail-Adresse an."),
  customerPhone: z.string().trim().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export class SlotUnavailableError extends Error {}

export async function bookAppointment(
  input: BookingInput & { serviceName: string; durationMinutes: number },
) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("book_appointment", {
    p_staff_id: input.staffId,
    p_service_slug: input.serviceSlug,
    p_service_name: input.serviceName,
    p_duration_minutes: input.durationMinutes,
    p_starts_at: input.startsAt,
    p_customer_name: input.customerName,
    p_customer_email: input.customerEmail,
    p_customer_phone: input.customerPhone ?? null,
  });

  if (error) {
    if (
      error.message.includes("SLOT_UNAVAILABLE") ||
      error.message.includes("SLOT_IN_PAST")
    ) {
      throw new SlotUnavailableError(
        "Dieser Termin ist leider nicht mehr verfügbar. Bitte wähle einen anderen Zeitpunkt.",
      );
    }
    throw error;
  }

  return data;
}
