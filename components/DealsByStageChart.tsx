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
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="stage"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={{ stroke: "#f1f5f9" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#64748b" }}
          />
          <Bar
            dataKey="count"
            fill="#cbd5e1"
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
