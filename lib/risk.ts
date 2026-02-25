import type { Deal, LeadSource, RiskResult, RiskStatus } from "@/lib/types";
import { daysBetween } from "@/lib/date";

/**
 * Lead source risk weight (0 = lowest risk, 1 = highest). Deterministic.
 * Referral = lowest, Paid Ads / Cold Call = higher.
 */
const LEAD_SOURCE_WEIGHT: Record<LeadSource, number> = {
  Referral: 0.1,
  Organic: 0.2,
  Event: 0.25,
  Website: 0.3,
  Outbound: 0.5,
  "Paid Ads": 0.7,
  "Cold Call": 0.8,
};

/** Max days since activity that we consider for scoring (cap). */
const MAX_DAYS_ACTIVITY = 30;
/** Max days in stage that we consider for scoring (cap). */
const MAX_DAYS_STAGE = 45;
/** Threshold: days since activity above this adds risk. */
const ACTIVITY_RISK_DAYS = 7;
/** Threshold: days in stage above this adds risk (stage-dependent in reasons). */
const STAGE_RISK_DAYS = 10;
/** Touches below this count as low engagement. */
const LOW_TOUCHES = 2;

/**
 * Deterministic risk score 0-100 for a deal.
 * Based on: days since last activity, days in stage, touches count, lead source.
 */
export function computeRiskScore(deal: Deal): RiskResult {
  const reasons: string[] = [];
  const now = new Date().toISOString().slice(0, 10);
  const daysSinceActivity = Math.max(0, daysBetween(deal.lastActivityAt, now));
  const daysInStage = Math.max(0, daysBetween(deal.stageEnteredAt, now));

  // Component scores (each 0-1 scale, then weighted)
  // 1) Days since activity: 0 days = 0, 30+ days = 1
  const activityNorm = Math.min(1, daysSinceActivity / MAX_DAYS_ACTIVITY);
  const activityScore = activityNorm * 35; // max 35 points

  if (daysSinceActivity >= ACTIVITY_RISK_DAYS) {
    reasons.push(`No activity in ${daysSinceActivity} days`);
  }

  // 2) Days in stage: 0 = 0, 45+ = 1
  const stageNorm = Math.min(1, daysInStage / MAX_DAYS_STAGE);
  const stageScore = stageNorm * 30; // max 30 points

  if (daysInStage > STAGE_RISK_DAYS) {
    reasons.push(`In ${deal.stage} stage for ${daysInStage} days`);
  }

  // 3) Touches: 0 = max risk, 5+ = min risk
  const touchNorm = Math.min(1, deal.touchesCount / 5);
  const touchScore = (1 - touchNorm) * 20; // fewer touches = more points

  if (deal.touchesCount < LOW_TOUCHES) {
    reasons.push(`Only ${deal.touchesCount} touch${deal.touchesCount === 1 ? "" : "es"}`);
  }

  // 4) Lead source weight: 0-15 points
  const sourceScore = LEAD_SOURCE_WEIGHT[deal.leadSource] * 15;

  if (LEAD_SOURCE_WEIGHT[deal.leadSource] >= 0.5) {
    reasons.push(`Lead source "${deal.leadSource}" tends to be higher risk`);
  }

  const rawScore = Math.round(activityScore + stageScore + touchScore + sourceScore);
  const score = Math.min(100, Math.max(0, rawScore));

  let status: RiskStatus;
  if (score <= 39) status = "Healthy";
  else if (score <= 69) status = "Watch";
  else status = "At Risk";

  if (reasons.length === 0) {
    reasons.push("No significant risk factors");
  }

  return { score, status, reasons };
}
