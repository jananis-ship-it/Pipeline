import type { ScoredDeal } from "@/lib/types";

/**
 * Stub for AI-generated deal summary.
 * Returns rule-based summary text. No API keys required.
 *
 * TODO: Replace this with an LLM call (e.g. OpenAI) that takes deal + risk context
 * and returns a natural-language summary. Example:
 *   const response = await openai.chat.completions.create({
 *     model: "gpt-4o-mini",
 *     messages: [{ role: "user", content: buildPrompt(deal) }],
 *   });
 *   return response.choices[0].message.content;
 */
export function generateDealSummary(deal: ScoredDeal): string {
  const { stage, risk, daysInStage, daysSinceActivity } = deal;
  const action = getRecommendedAction(deal);
  return `This deal has been in ${stage} for ${daysInStage} days with no activity for ${daysSinceActivity} days. Risk is ${risk.status}. Recommended next step: ${action}.`;
}

function getRecommendedAction(deal: ScoredDeal): string {
  const { daysSinceActivity, touchesCount, stage, daysInStage } = deal;
  if (daysSinceActivity > 7) return "Send a follow-up message";
  if (touchesCount < 2) return "Call the lead and log notes";
  if (stage === "Proposal" && daysInStage > 10)
    return "Nudge for decision / offer a quick call";
  return "Schedule next touchpoint";
}
