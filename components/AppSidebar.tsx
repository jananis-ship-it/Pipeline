"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GitBranch,
  Workflow,
  Grid3X3,
  Bot,
  Megaphone,
  Zap,
  ChevronDown,
  CreditCard,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "#", label: "Workflows", icon: Workflow },
  { href: "#", label: "Apps", icon: Grid3X3 },
  { href: "#", label: "AI agents", icon: Bot },
  { href: "#", label: "Campaigns", icon: Megaphone },
  { href: "#", label: "Pipelines", icon: GitBranch, badge: "Soon" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[240px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">Pipeline Health</span>
            <span className="text-xs text-muted-foreground">Primary</span>
          </div>
        </div>
        <button
          type="button"
          className="ml-auto rounded p-1 hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-foreground"
          aria-label="Switch account"
        >
          <ChevronDown className="size-4" />
        </button>
        <button
          type="button"
          className="rounded p-1 hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-foreground"
          aria-label="Settings"
        >
          <CreditCard className="size-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <Zap className="size-5 shrink-0" />
          Help & support
        </a>
      </div>
    </aside>
  );
}
