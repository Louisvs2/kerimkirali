"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function cancelAppointmentAction(appointmentId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", appointmentId);

  if (error) throw error;
  revalidatePath("/admin");
}

export async function addAvailabilityRuleAction(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("availability_rules").insert({
    staff_id: formData.get("staffId"),
    weekday: Number(formData.get("weekday")),
    start_time: formData.get("startTime"),
    end_time: formData.get("endTime"),
  });

  if (error) throw error;
  revalidatePath("/admin/verfuegbarkeit");
}

export async function deleteAvailabilityRuleAction(ruleId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("availability_rules")
    .delete()
    .eq("id", ruleId);

  if (error) throw error;
  revalidatePath("/admin/verfuegbarkeit");
}

export async function addTimeOffAction(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("time_off").insert({
    staff_id: formData.get("staffId"),
    starts_at: formData.get("startsAt"),
    ends_at: formData.get("endsAt"),
    reason: formData.get("reason") || null,
  });

  if (error) throw error;
  revalidatePath("/admin/verfuegbarkeit");
}

export async function deleteTimeOffAction(timeOffId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("time_off")
    .delete()
    .eq("id", timeOffId);

  if (error) throw error;
  revalidatePath("/admin/verfuegbarkeit");
}
