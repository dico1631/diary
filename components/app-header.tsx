"use client";

import { logout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

type AppHeaderProps = {
  userEmail?: string | null;
};

export function AppHeader({ userEmail }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-card px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="ml-auto flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {userEmail}
        </span>
        <form action={logout}>
          <Button size="sm" variant="outline" type="submit">
            로그아웃
          </Button>
        </form>
      </div>
    </header>
  );
}
