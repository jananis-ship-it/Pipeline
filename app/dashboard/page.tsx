"use client";

import { useCallback, useEffect, useState } from "react";
import { KpiCard } from "@/components/KpiCard";
import { DealsByStageChart } from "@/components/DealsByStageChart";
import { AtRiskByOwnerChart } from "@/components/AtRiskByOwnerChart";
import { DealAgingChart } from "@/components/DealAgingChart";
import { DealsTable } from "@/components/DealsTable";
import { DealDrawer } from "@/components/DealDrawer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/date";
import type { ScoredDeal } from "@/lib/types";

export default function DashboardPage() {
  const [deals, setDeals] = useState<ScoredDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState<ScoredDeal | null>(null);

  const fetchDeals = useCallback(async () => {
    const res = await fetch("/api/score");
    if (!res.ok) return;
    const data = await res.json();
    setDeals(data);
    setLoading(false);
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading pipeline...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-4 py-4 md:px-6">
        <h1 className="text-xl font-semibold">Pipeline Health Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          At-risk deals and AI summaries
        </p>
      </header>

      <main className="p-4 md:p-6 space-y-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Total Open Deals" value={openDeals.length} />
          <KpiCard title="At-Risk Deals" value={atRiskCount} />
          <KpiCard title="Avg Days in Stage" value={avgDaysInStage} subtitle="Across open deals" />
          <KpiCard
            title="Weighted Pipeline Value"
            value={formatCurrency(weightedValue)}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div data-slot="card-title" className="text-sm font-medium">
                Deals by Stage
              </div>
            </CardHeader>
            <CardContent>
              <DealsByStageChart deals={openDeals} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div data-slot="card-title" className="text-sm font-medium">
                At-Risk Deals by Owner
              </div>
            </CardHeader>
            <CardContent>
              <AtRiskByOwnerChart deals={openDeals} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div data-slot="card-title" className="text-sm font-medium">
                Deal Aging (days since activity)
              </div>
            </CardHeader>
            <CardContent>
              <DealAgingChart deals={openDeals} />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-lg font-medium mb-3">Deals</h2>
          <DealsTable deals={deals} onSelectDeal={setSelectedDeal} />
        </section>
      </main>

      <DealDrawer deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
    </div>
  );
}
