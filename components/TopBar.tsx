"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell, Plus, LayoutGrid, ChevronDown } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="relative w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search"
            className="h-9 pl-9 rounded-lg border-slate-200 bg-slate-50 text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary/20"
          />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="icon" className="size-9 rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-9 rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Add">
          <Plus className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-9 rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Apps">
          <LayoutGrid className="size-4" />
        </Button>
        <Link
          href="/settings"
          className="ml-1 flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition-colors"
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-slate-500 text-white text-sm font-medium">
            U
          </div>
          <span className="hidden text-sm font-medium text-slate-700 sm:inline">Account</span>
          <ChevronDown className="size-4 text-slate-500" />
        </Link>
      </div>
    </header>
  );
}
