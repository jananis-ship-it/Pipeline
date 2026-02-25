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
  PanelLeftClose,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workflows", label: "Workflows", icon: Workflow },
  { href: "/apps", label: "Apps", icon: Grid3X3 },
  { href: "/ai-agents", label: "AI agents", icon: Bot },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "#", label: "Pipelines", icon: GitBranch, badge: "Soon" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col bg-[#1e293b]">
      <div className="flex h-14 items-center gap-2 border-b border-white/10 px-4">
        <div className="flex items-center justify-center rounded-lg bg-[#3b82f6] text-white text-sm font-bold size-9">
          P
        </div>
        <div className="flex flex-1 flex-col min-w-0">
          <span className="text-sm font-semibold text-white truncate">Pipeline Health</span>
          <span className="text-xs text-slate-400">Primary</span>
        </div>
        <button
          type="button"
          className="rounded p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Switch account"
        >
          <ChevronDown className="size-4" />
        </button>
        <Link
          href="/settings"
          className="rounded p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Settings"
        >
          <PanelLeftClose className="size-4" />
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const content = (
            <>
              <Icon className="size-5 shrink-0" />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="rounded bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-medium text-amber-300">
                  {item.badge}
                </span>
              )}
            </>
          );
          const className = cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isActive
              ? "bg-[#3b82f6] text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          );
          if (item.href === "#") {
            return (
              <span key={item.label} className={cn(className, "cursor-default")}>
                {content}
              </span>
            );
          }
          return (
            <Link key={item.href} href={item.href} className={className}>
              {content}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/help"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Zap className="size-5 shrink-0" />
          Help & support
        </Link>
      </div>
    </aside>
  );
}
