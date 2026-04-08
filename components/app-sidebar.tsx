"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Home, PanelLeft, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SIDEBAR_WIDTH = 170;
const BREAKPOINT = 1024;

const menuItems = [
  { title: "대시보드", href: "/", icon: Home },
  { title: "연간 목표", href: "/year-goals", icon: Target },
];

type SidebarContextType = {
  open: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  open: true,
  toggle: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= BREAKPOINT;
      setIsMobile(mobile);
      if (mobile) setOpen(false);
      else setOpen(true);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      <div className="flex min-h-svh w-full">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 flex flex-col border-r bg-card transition-transform duration-200",
            isMobile
              ? open ? "translate-x-0" : "-translate-x-full"
              : open ? "translate-x-0" : "-translate-x-full"
          )}
          style={{ width: SIDEBAR_WIDTH }}
        >
          <div className="flex h-14 items-center border-b px-4">
            <p className="text-sm font-semibold">My Diary</p>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            <p className="px-3 py-2 text-xs font-medium text-muted-foreground">메뉴</p>
            {menuItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                <item.icon className="size-4" />
                {item.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main area */}
        <div
          className="flex min-w-0 flex-1 flex-col transition-[margin] duration-200"
          style={{
            marginLeft: !isMobile && open ? SIDEBAR_WIDTH : 0,
          }}
        >
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

export function SidebarTrigger() {
  const { toggle } = useSidebar();

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="사이드바 토글">
      <PanelLeft className="size-4" />
    </Button>
  );
}
