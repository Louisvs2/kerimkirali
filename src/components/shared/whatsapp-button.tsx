import { siteConfig } from "@/config/site";

// Floating WhatsApp entry point, shown on every page. Plain server-rendered
// link — no client state needed. The number is siteConfig.contact.phone
// stripped to digits; if that's ever swapped for a dedicated WhatsApp
// Business line, this picks it up automatically.
export function WhatsAppButton() {
  const phone = siteConfig.contact.phone;
  if (!phone) return null;

  const digits = phone.replace(/\D/g, "");
  const message = encodeURIComponent(
    "Hallo, ich habe eine Frage zu einem Termin.",
  );

  return (
    <a
      href={`https://wa.me/${digits}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Kontakt per WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out hover:scale-105 motion-reduce:transition-none sm:right-6 sm:bottom-6"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-7"
        fill="currentColor"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm5.8 14.1c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.11.11-1.79-.11a16.5 16.5 0 0 1-1.63-.6c-2.87-1.24-4.74-4.13-4.89-4.32-.14-.2-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.28.57-.35.76-.35s.38 0 .55.01c.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.86.27.14.44.2.51.31.07.12.07.66-.17 1.34Z" />
      </svg>
    </a>
  );
}
