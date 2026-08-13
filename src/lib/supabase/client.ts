import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client — used from Client Components (e.g. the
// admin login form). Reads the public URL/anon key, safe to expose.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
