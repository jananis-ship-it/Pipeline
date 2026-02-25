import type { Deal, DealStage, LeadSource } from "@/lib/types";

const COMPANIES = [
  "Acme Corp", "Beta Industries", "Gamma Labs", "Delta Solutions", "Epsilon Inc",
  "Zeta Systems", "Eta Consulting", "Theta Media", "Iota Health", "Kappa Finance",
  "Lambda Tech", "Mu Dynamics", "Nu Ventures", "Xi Analytics", "Omicron Group",
  "Pi Software", "Rho Design", "Sigma Sales", "Tau Logistics", "Upsilon Labs",
  "Phoenix Co", "Atlas Group", "Nova Systems", "Apex Partners", "Summit LLC",
  "Horizon Inc", "Vertex Corp", "Pinnacle Labs", "Crest Consulting", "Peak Solutions",
];

const OWNERS = ["Jordan Smith", "Sam Chen", "Alex Rivera", "Morgan Lee", "Casey Brown", "Riley Davis"];

const LEAD_SOURCES: LeadSource[] = ["Referral", "Organic", "Paid Ads", "Outbound", "Event", "Website", "Cold Call"];

const STAGES: DealStage[] = ["Lead", "Qualified", "Meeting", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

// Seeded RNG for deterministic mock data (reproducible risk scores).
let seed = 42;
function nextSeed(): number {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}

function randomInt(min: number, max: number): number {
  return Math.floor(nextSeed() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(nextSeed() * arr.length)];
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

/**
 * Generate 40-60 mock deals with realistic variety.
 * Open stages: Lead, Qualified, Meeting, Proposal, Negotiation.
 */
export function generateMockDeals(): Deal[] {
  const deals: Deal[] = [];
  const openStages: DealStage[] = ["Lead", "Qualified", "Meeting", "Proposal", "Negotiation"];
  const count = randomInt(45, 55);

  for (let i = 0; i < count; i++) {
    const createdAtDays = randomInt(5, 120);
    const stageEnteredDays = randomInt(0, createdAtDays);
    const lastActivityDays = randomInt(0, Math.min(stageEnteredDays + 5, 25));
    const closedStages: DealStage[] = ["Closed Won", "Closed Lost"];
const stage = i < count - 4 ? pick(openStages) : pick(closedStages);
    const company = pick(COMPANIES);
    const owner = pick(OWNERS);
    const leadSource = pick(LEAD_SOURCES);
    const value = [5000, 7500, 10000, 15000, 20000, 25000, 35000, 50000, 75000, 100000][randomInt(0, 9)];
    const touchesCount = randomInt(0, 12);
    const notesCount = randomInt(0, Math.max(0, touchesCount - 1));

    deals.push({
      id: `deal-${i + 1}`,
      name: `${company} - ${["Q1", "Q2", "Enterprise", "Starter", "Pro"][randomInt(0, 4)]}`,
      company,
      stage,
      owner,
      value,
      leadSource,
      createdAt: daysAgo(createdAtDays),
      stageEnteredAt: daysAgo(stageEnteredDays),
      lastActivityAt: daysAgo(lastActivityDays),
      touchesCount,
      notesCount,
    });
  }

  return deals;
}

// Singleton for app (deterministic per load by seeding same count)
let cached: Deal[] | null = null;

export function getMockDeals(): Deal[] {
  if (!cached) {
    cached = generateMockDeals();
  }
  return cached;
}
