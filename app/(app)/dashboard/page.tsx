"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { KpiCard } from "@/components/KpiCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/date";
import type { ScoredDeal } from "@/lib/types";
import { Plus, Briefcase, AlertTriangle, CalendarDays, DollarSign } from "lucide-react";

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
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-slate-700">Dashboard</h1>
            <p className="text-xs text-slate-500 mt-0.5">Pipeline health and at-risk deals</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 rounded-lg border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs">
              Last 30 days
            </Button>
            <Button variant="outline" size="sm" className="h-8 rounded-lg border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs">
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-8 rounded-lg border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs">
              Export
            </Button>
            <Button className="h-8 gap-1.5 rounded-lg bg-blue-800 text-white hover:bg-blue-900 text-xs font-medium">
              <Plus className="size-4" />
              Add Deal
            </Button>
          </div>
        </div>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-slate-50/50">
          <div className="p-6 pb-10 space-y-6">
            <section>
              <h2 className="text-[11px] font-medium text-slate-400 mb-2.5 uppercase tracking-widest">Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                  title="Total Open Deals"
                  value={openDeals.length}
                  trend="+12%"
                  iconColorIndex={0}
                  icon={<Briefcase className="size-5" />}
                />
                <KpiCard
                  title="At-Risk Deals"
                  value={atRiskCount}
                  trend="-5%"
                  trendDown
                  iconColorIndex={1}
                  icon={<AlertTriangle className="size-5" />}
                />
                <KpiCard
                  title="Avg Days in Stage"
                  value={avgDaysInStage}
                  subtitle="Across open deals"
                  iconColorIndex={2}
                  icon={<CalendarDays className="size-5" />}
                />
                <KpiCard
                  title="Weighted Pipeline Value"
                  value={formatCurrency(weightedValue)}
                  trend="+8%"
                  iconColorIndex={4}
                  icon={<DollarSign className="size-5" />}
                />
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-medium text-slate-400 mb-2.5 uppercase tracking-widest">Charts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="rounded-xl border border-slate-100 bg-white shadow-none overflow-hidden">
                  <CardHeader className="pb-1 px-5 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600">Deals by Stage</span>
                      <Button variant="ghost" size="sm" className="h-6 text-[11px] text-slate-400 hover:text-slate-600">Filter</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-4 pt-0">
                    <DealsByStageChart deals={openDeals} />
                  </CardContent>
                </Card>
                <Card className="rounded-xl border border-slate-100 bg-white shadow-none overflow-hidden">
                  <CardHeader className="pb-1 px-5 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600">At-Risk by Owner</span>
                      <Button variant="ghost" size="sm" className="h-6 text-[11px] text-slate-400 hover:text-slate-600">Sort</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="px-5 pb-4 pt-0">
                    <AtRiskByOwnerChart deals={openDeals} />
                  </CardContent>
                </Card>
                <Card className="rounded-xl border border-slate-100 bg-white shadow-none overflow-hidden">
                  <CardHeader className="pb-1 px-5 pt-4">
                    <span className="text-xs font-medium text-slate-600">Deal Aging</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Days since last activity</p>
                  </CardHeader>
                  <CardContent className="px-5 pb-4 pt-0">
                    <DealAgingChart deals={openDeals} />
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-medium text-slate-400 mb-2.5 uppercase tracking-widest">All Deals</h2>
              <DealsTable deals={deals} onSelectDeal={setSelectedDeal} />
            </section>
          </div>
        </main>
      </div>

      <DealDrawer deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
    </>
  );
}
