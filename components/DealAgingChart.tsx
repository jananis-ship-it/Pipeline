"use client";

import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
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
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={distribution} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="agingFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="range"
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
            formatter={(value: number | undefined) => [value ?? 0, "Deals"]}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#94a3b8"
            strokeWidth={1.5}
            fill="url(#agingFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
