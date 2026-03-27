import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Coba service role key dulu, fallback ke publishable key
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    [
      "",
      "⚠️  Supabase belum dikonfigurasi!",
      "Tambahkan variabel berikut ke file .env.local:",
      "",
      "  NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co",
      "",
      "  # Pilih salah satu (service role key lebih direkomendasikan):",
      "  SUPABASE_SERVICE_ROLE_KEY=eyJhbG...   ← dari Settings > API > service_role",
      "  # atau",
      "  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_...",
      "",
    ].join("\n"),
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
