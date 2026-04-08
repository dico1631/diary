import { DashboardShell } from "@/components/dashboard-shell";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function Home() {
  const mode = isSupabaseConfigured() ? "authenticated" : "demo";
  return <DashboardShell mode={mode} />;
}
