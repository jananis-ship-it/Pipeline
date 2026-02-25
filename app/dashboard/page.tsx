"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
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
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex flex-1 items-center justify-center bg-background">
          <p className="text-muted-foreground">Loading pipeline...</p>
        </div>
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex flex-1 items-center justify-center bg-background">
          <div className="text-center">
            <p className="text-muted-foreground">Could not load deals.</p>
            <p className="text-sm text-muted-foreground mt-1">Check the console and ensure the dev server is running.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between border-b border-border bg-card px-6 py-4">
          <h1 className="text-2xl font-semibold tracking-tight">Deals</h1>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="size-4" />
            Add Deal
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard title="Total Open Deals" value={openDeals.length} />
              <KpiCard title="At-Risk Deals" value={atRiskCount} />
              <KpiCard title="Avg Days in Stage" value={avgDaysInStage} subtitle="Across open deals" />
              <KpiCard title="Weighted Pipeline Value" value={formatCurrency(weightedValue)} />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="rounded-xl border-border bg-card shadow-sm overflow-hidden">
                <CardHeader className="pb-2 px-5 pt-5">
                  <div data-slot="card-title" className="text-sm font-medium text-foreground">
                    Deals by Stage
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <DealsByStageChart deals={openDeals} />
                </CardContent>
              </Card>
              <Card className="rounded-xl border-border bg-card shadow-sm overflow-hidden">
                <CardHeader className="pb-2 px-5 pt-5">
                  <div data-slot="card-title" className="text-sm font-medium text-foreground">
                    At-Risk Deals by Owner
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <AtRiskByOwnerChart deals={openDeals} />
                </CardContent>
              </Card>
              <Card className="rounded-xl border-border bg-card shadow-sm overflow-hidden">
                <CardHeader className="pb-2 px-5 pt-5">
                  <div data-slot="card-title" className="text-sm font-medium text-foreground">
                    Deal Aging (days since activity)
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <DealAgingChart deals={openDeals} />
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 tracking-tight">All Deals</h2>
              <DealsTable deals={deals} onSelectDeal={setSelectedDeal} />
            </section>
          </div>
        </main>
      </div>

      <DealDrawer deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
    </div>
  );
}
