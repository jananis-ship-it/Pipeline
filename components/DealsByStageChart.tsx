"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { ScoredDeal } from "@/lib/types";

interface DealsByStageChartProps {
  deals: ScoredDeal[];
}

export function DealsByStageChart({ deals }: DealsByStageChartProps) {
  const byStage = deals.reduce<Record<string, number>>((acc, d) => {
    acc[d.stage] = (acc[d.stage] ?? 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(byStage).map(([stage, count]) => ({ stage, count }));

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="stage" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} />
          <YAxis tick={{ fontSize: 12, fill: "#64748b" }} allowDecimals={false} axisLine={{ stroke: "#e2e8f0" }} />
          <Tooltip />
          <Bar dataKey="count" fill="rgba(99, 102, 241, 0.35)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
