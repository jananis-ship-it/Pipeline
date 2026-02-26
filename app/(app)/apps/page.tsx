"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const integrations = [
  { name: "Stripe", type: "Finance", rate: 40, profit: "$650.00", color: "bg-violet-500" },
  { name: "Zapier", type: "CRM", rate: 80, profit: "$720.50", color: "bg-orange-500" },
  { name: "Shopify", type: "Marketplace", rate: 20, profit: "$432.25", color: "bg-emerald-600" },
  { name: "Slack", type: "Communication", rate: 60, profit: "$320.00", color: "bg-rose-500" },
  { name: "Google Sheets", type: "Data", rate: 90, profit: "$180.00", color: "bg-green-600" },
];

export default function AppsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium tracking-tight text-slate-700">Apps & integrations</h1>
        <Button asChild className="h-8 gap-1.5 rounded-lg bg-slate-500 text-white hover:bg-slate-600 text-xs font-medium">
          <Link href="/apps/connect">Connect app</Link>
        </Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search integrations" className="pl-9 bg-card" />
          </div>
        </div>
        <Card className="rounded-xl border-border bg-card shadow-sm overflow-hidden">
          <div className="border-b border-border px-6 py-3">
            <h2 className="text-sm font-medium">List of integrations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Application</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Rate</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Profit</th>
                </tr>
              </thead>
              <tbody>
                {integrations.map((app) => (
                  <tr key={app.name} className="border-b border-border/80 hover:bg-muted/30 transition-colors last:border-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex size-10 items-center justify-center rounded-lg ${app.color} text-white text-sm font-bold`}>
                          {app.name.slice(0, 1)}
                        </div>
                        {app.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{app.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${app.rate}%` }} />
                        </div>
                        <span className="text-xs">{app.rate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium tabular-nums">{app.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-6 py-3 text-right">
            <Button variant="ghost" size="sm">See all</Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
