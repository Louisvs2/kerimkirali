import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Strips a display phone number down to a dialable `tel:` href. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
