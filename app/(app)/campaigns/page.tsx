"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Plus } from "lucide-react";

const campaigns = [
  { name: "Q1 outreach", status: "Active", sent: "1,240", openRate: "42%", ctaRate: "8%" },
  { name: "Proposal follow-up", status: "Scheduled", sent: "—", openRate: "—", ctaRate: "—" },
  { name: "Re-engagement", status: "Draft", sent: "—", openRate: "—", ctaRate: "—" },
];

export default function CampaignsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium tracking-tight text-slate-700">Campaigns</h1>
        <Button asChild className="h-8 gap-1.5 rounded-lg bg-slate-500 text-white hover:bg-slate-600 text-xs font-medium">
          <Link href="/campaigns/new">
            <Plus className="size-4" />
            New campaign
          </Link>
        </Button>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="rounded-xl border-border bg-card shadow-sm overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Megaphone className="size-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Email & campaigns</h2>
                <p className="text-sm text-muted-foreground">
                  Run sequences and one-off campaigns tied to your pipeline.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Campaign</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Sent</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Open rate</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">CTA rate</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <tr key={c.name} className="border-b border-border/80 hover:bg-muted/30 transition-colors last:border-0">
                      <td className="px-6 py-4 font-medium">{c.name}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          c.status === "Active" ? "bg-emerald-50 text-emerald-700" :
                          c.status === "Scheduled" ? "bg-amber-50 text-amber-700" : "bg-muted text-muted-foreground"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{c.sent}</td>
                      <td className="px-6 py-4">{c.openRate}</td>
                      <td className="px-6 py-4">{c.ctaRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
