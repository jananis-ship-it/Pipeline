"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { ScoredDeal } from "@/lib/types";

const BUCKETS = [
  { label: "0-3", min: 0, max: 3 },
  { label: "4-7", min: 4, max: 7 },
  { label: "8-14", min: 8, max: 14 },
  { label: "15-30", min: 15, max: 30 },
  { label: "30+", min: 31, max: 999 },
];

interface DealAgingChartProps {
  deals: ScoredDeal[];
}

export function DealAgingChart({ deals }: DealAgingChartProps) {
  const distribution = BUCKETS.map((b) => ({
    range: b.label,
    count: deals.filter((d) => {
      const days = d.daysSinceActivity;
      return days >= b.min && days <= b.max;
    }).length,
  }));

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={distribution} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="range" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip formatter={(value: number | undefined) => [value ?? 0, "Deals"]} />
          <Bar dataKey="count" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
