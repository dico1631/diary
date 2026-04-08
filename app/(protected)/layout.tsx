import { redirect } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { SidebarProvider } from "@/components/app-sidebar";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userEmail: string | null = null;

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }
    userEmail = user.email ?? null;
  }

  return (
    <SidebarProvider>
      <AppHeader userEmail={userEmail} />
      <main className="flex-1 bg-background p-4 sm:p-6">{children}</main>
    </SidebarProvider>
  );
}
