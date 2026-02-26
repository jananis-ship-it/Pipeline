"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { ScoredDeal } from "@/lib/types";

const LIGHT_COLORS = ["rgba(147, 197, 253, 0.8)", "rgba(253, 164, 175, 0.8)", "rgba(94, 234, 212, 0.8)", "rgba(253, 224, 71, 0.6)", "rgba(196, 181, 253, 0.7)"];

interface AtRiskByOwnerChartProps {
  deals: ScoredDeal[];
}

export function AtRiskByOwnerChart({ deals }: AtRiskByOwnerChartProps) {
  const atRisk = deals.filter((d) => d.risk.status === "At Risk");
  const byOwner = atRisk.reduce<Record<string, number>>((acc, d) => {
    acc[d.owner] = (acc[d.owner] ?? 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(byOwner).map(([owner, count]) => ({ name: owner, value: count }));

  if (data.length === 0) {
    return (
      <div className="flex h-[240px] w-full items-center justify-center text-sm text-slate-400">
        No at-risk deals
      </div>
    );
  }

  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={56}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={LIGHT_COLORS[index % LIGHT_COLORS.length]} stroke="#fff" strokeWidth={1} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value: number | undefined) => [value ?? 0, "Deals"]}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span style={{ color: "#64748b", fontSize: 12 }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
