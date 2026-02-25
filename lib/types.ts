/**
 * Core data model for pipeline deals.
 */
export type LeadSource =
  | "Referral"
  | "Organic"
  | "Paid Ads"
  | "Outbound"
  | "Event"
  | "Website"
  | "Cold Call";

export type DealStage =
  | "Lead"
  | "Qualified"
  | "Meeting"
  | "Proposal"
  | "Negotiation"
  | "Closed Won"
  | "Closed Lost";

export interface Deal {
  id: string;
  name: string;
  company: string;
  stage: DealStage;
  owner: string;
  value: number;
  leadSource: LeadSource;
  createdAt: string; // ISO date
  stageEnteredAt: string; // ISO date
  lastActivityAt: string; // ISO date
  touchesCount: number;
  notesCount: number;
}

export type RiskStatus = "Healthy" | "Watch" | "At Risk";

export interface RiskResult {
  score: number; // 0-100
  status: RiskStatus;
  reasons: string[];
}

export interface ScoredDeal extends Deal {
  risk: RiskResult;
  daysSinceActivity: number;
  daysInStage: number;
}
