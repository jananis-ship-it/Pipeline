"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, MessageCircle, Plus, Settings, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function TopBar() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-card px-6 shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-80 max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="h-9 pl-9 bg-muted/50 border-0 focus-visible:ring-2"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
            ⌘F
          </kbd>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="size-9 rounded-lg" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-9 rounded-lg" aria-label="Messages">
          <MessageCircle className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-9 rounded-lg" aria-label="Add">
          <Plus className="size-4" />
        </Button>
        <Link href="/settings">
          <Button
            variant="ghost"
            size="icon"
            className={cn("size-9 rounded-lg", pathname === "/settings" && "bg-muted")}
            aria-label="Settings"
          >
            <Settings className="size-4" />
          </Button>
        </Link>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors"
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
            U
          </div>
          <span className="hidden text-sm font-medium md:inline">Account</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
