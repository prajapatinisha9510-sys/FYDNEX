import { createClient } from "@supabase/supabase-js";

// SERVER-SIDE ONLY. Never import this in a "use client" component —
// the service role key bypasses all Row Level Security.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
