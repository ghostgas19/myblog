import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client using service role key (only on server!)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.warn(
    "Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Data operations will fail.",
  );
}

export const supabase = createClient(supabaseUrl ?? "", serviceRoleKey ?? "", {
  auth: {
    persistSession: false,
  },
});
