"use server";

import { Resend } from "resend";

import { siteConfig } from "@/config/site";
import { bookableServices } from "@/content/services";
import {
  bookAppointment,
  bookingSchema,
  getActiveStaff,
  getAvailableSlots,
  SlotUnavailableError,
} from "@/lib/booking";

export async function listStaffAction() {
  return getActiveStaff();
}

export async function listSlotsAction(
  staffId: string,
  date: string,
  serviceSlug: string,
) {
  const service = bookableServices.find((s) => s.slug === serviceSlug);
  if (!service) throw new Error("Unbekannte Leistung.");
  const slots = await getAvailableSlots(staffId, date, service.durationMinutes);
  return slots.map((slot) => slot.toISOString());
}

interface SubmitResult {
  ok: boolean;
  error?: string;
}

export async function submitBookingAction(
  input: unknown,
): Promise<SubmitResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Bitte prüfe deine Eingaben." };
  }

  const service = bookableServices.find(
    (s) => s.slug === parsed.data.serviceSlug,
  );
  if (!service) {
    return { ok: false, error: "Unbekannte Leistung." };
  }

  try {
    const appointment = await bookAppointment({
      ...parsed.data,
      serviceName: service.name,
      durationMinutes: service.durationMinutes,
    });

    await sendBookingEmails(appointment);
    return { ok: true };
  } catch (error) {
    if (error instanceof SlotUnavailableError) {
      return { ok: false, error: error.message };
    }
    console.error("Booking: submitBookingAction failed.", error);
    return {
      ok: false,
      error: "Die Buchung ist fehlgeschlagen. Bitte versuche es erneut.",
    };
  }
}

interface AppointmentEmailData {
  service_name: string;
  starts_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
}

async function sendBookingEmails(appointment: AppointmentEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "Booking: RESEND_API_KEY is not configured — skipping email.",
    );
    return;
  }

  const resend = new Resend(apiKey);
  const when = new Date(appointment.starts_at).toLocaleString("de-DE", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  });
  const from =
    process.env.CONTACT_FORM_FROM ?? "Kontaktformular <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to: appointment.customer_email,
    subject: `Terminbestätigung — ${siteConfig.name}`,
    text: `Hallo ${appointment.customer_name},\n\ndein Termin ist bestätigt:\n\n${appointment.service_name}\n${when}\n\n${siteConfig.contact.address?.join(", ")}\n\nWir freuen uns auf dich!\n${siteConfig.name}`,
  });

  await resend.emails.send({
    from,
    to: process.env.CONTACT_FORM_TO ?? siteConfig.contact.email,
    replyTo: appointment.customer_email,
    subject: `Neuer Termin: ${appointment.customer_name}`,
    text: `Neue Buchung:\n\nLeistung: ${appointment.service_name}\nZeit: ${when}\nKunde: ${appointment.customer_name}\nE-Mail: ${appointment.customer_email}\nTelefon: ${appointment.customer_phone ?? "–"}`,
  });
}
