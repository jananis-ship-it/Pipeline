import { NextResponse } from "next/server";
import { getMockDeals } from "@/data/mockDeals";
import { computeRiskScore } from "@/lib/risk";
import { daysBetween } from "@/lib/date";
import type { ScoredDeal } from "@/lib/types";

export async function GET() {
  const deals = getMockDeals();
  const scored: ScoredDeal[] = deals.map((deal) => {
    const risk = computeRiskScore(deal);
    const now = new Date().toISOString().slice(0, 10);
    return {
      ...deal,
      risk,
      daysSinceActivity: Math.max(0, daysBetween(deal.lastActivityAt, now)),
      daysInStage: Math.max(0, daysBetween(deal.stageEnteredAt, now)),
    };
  });
  return NextResponse.json(scored);
}
