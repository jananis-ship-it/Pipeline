"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { ScoredDeal } from "@/lib/types";

interface AtRiskByOwnerChartProps {
  deals: ScoredDeal[];
}

export function AtRiskByOwnerChart({ deals }: AtRiskByOwnerChartProps) {
  const atRisk = deals.filter((d) => d.risk.status === "At Risk");
  const byOwner = atRisk.reduce<Record<string, number>>((acc, d) => {
    acc[d.owner] = (acc[d.owner] ?? 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(byOwner).map(([owner, count]) => ({ owner, count }));

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="owner" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="var(--destructive)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
