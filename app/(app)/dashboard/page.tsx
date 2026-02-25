"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { KpiCard } from "@/components/KpiCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/date";
import type { ScoredDeal } from "@/lib/types";
import { Plus } from "lucide-react";

const DealsByStageChart = dynamic(
  () => import("@/components/DealsByStageChart").then((m) => ({ default: m.DealsByStageChart })),
  { ssr: false }
);
const AtRiskByOwnerChart = dynamic(
  () => import("@/components/AtRiskByOwnerChart").then((m) => ({ default: m.AtRiskByOwnerChart })),
  { ssr: false }
);
const DealAgingChart = dynamic(
  () => import("@/components/DealAgingChart").then((m) => ({ default: m.DealAgingChart })),
  { ssr: false }
);
const DealsTable = dynamic(
  () => import("@/components/DealsTable").then((m) => ({ default: m.DealsTable })),
  { ssr: false }
);
const DealDrawer = dynamic(
  () => import("@/components/DealDrawer").then((m) => ({ default: m.DealDrawer })),
  { ssr: false }
);

export default function DashboardPage() {
  const [deals, setDeals] = useState<ScoredDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState<ScoredDeal | null>(null);

  const fetchDeals = useCallback(async () => {
    try {
      const res = await fetch("/api/score");
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setDeals(data);
    } catch (e) {
      console.error("Failed to load deals:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const openDeals = deals.filter(
    (d) => d.stage !== "Closed Won" && d.stage !== "Closed Lost"
  );
  const atRiskCount = openDeals.filter((d) => d.risk.status === "At Risk").length;
  const avgDaysInStage =
    openDeals.length > 0
      ? Math.round(
          openDeals.reduce((s, d) => s + d.daysInStage, 0) / openDeals.length
        )
      : 0;
  const stageWeights: Record<string, number> = {
    Lead: 0.1,
    Qualified: 0.25,
    Meeting: 0.5,
    Proposal: 0.75,
    Negotiation: 0.9,
  };
  const weightedValue = openDeals.reduce(
    (s, d) => s + d.value * (stageWeights[d.stage] ?? 0),
    0
  );

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">Loading pipeline...</p>
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Could not load deals.</p>
          <p className="text-sm text-muted-foreground mt-1">Check the console and ensure the dev server is running.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-border bg-white px-6 py-4 shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Pipeline health and at-risk deals</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">Last 30 days</span>
            <Button variant="outline" size="sm" className="border-border bg-white h-8">Filter</Button>
            <Button variant="outline" size="sm" className="border-border bg-white h-8">Export</Button>
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-8">
              <Plus className="size-4" />
              Add Deal
            </Button>
          </div>
        </div>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <div className="p-6 pb-10 space-y-8">
            <section>
              <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard title="Total Open Deals" value={openDeals.length} trend="+12%" />
                <KpiCard title="At-Risk Deals" value={atRiskCount} trend="-5%" trendDown />
                <KpiCard title="Avg Days in Stage" value={avgDaysInStage} subtitle="Across open deals" />
                <KpiCard title="Weighted Pipeline Value" value={formatCurrency(weightedValue)} trend="+8%" />
              </div>
            </section>

            <section>
              <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Charts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <Card className="rounded-2xl border border-border/80 bg-white shadow-sm overflow-hidden">
                  <CardHeader className="pb-2 px-6 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">Deals by Stage</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">Filter</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <DealsByStageChart deals={openDeals} />
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border border-border/80 bg-white shadow-sm overflow-hidden">
                  <CardHeader className="pb-2 px-6 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">At-Risk by Owner</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">Sort</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <AtRiskByOwnerChart deals={openDeals} />
                  </CardContent>
                </Card>
                <Card className="rounded-2xl border border-border/80 bg-white shadow-sm overflow-hidden">
                  <CardHeader className="pb-2 px-6 pt-6">
                    <span className="text-sm font-semibold text-foreground">Deal Aging</span>
                    <p className="text-xs text-muted-foreground mt-0.5">Days since last activity</p>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <DealAgingChart deals={openDeals} />
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">All Deals</h2>
              </div>
              <DealsTable deals={deals} onSelectDeal={setSelectedDeal} />
            </section>
          </div>
        </main>
      </div>

      <DealDrawer deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
    </>
  );
}
