# Smart Pipeline Health Dashboard

A CRM-style dashboard that flags at-risk deals and provides AI-ready summaries. Built with Next.js (App Router), TypeScript, TailwindCSS, Recharts, and mock data.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects `/` to `/dashboard`.

## Features

- **Dashboard** (`/dashboard`): KPIs (Total Open Deals, At-Risk Deals, Avg Days in Stage, Weighted Pipeline Value), plus three charts: Deals by Stage, At-Risk Deals by Owner, Deal Aging (days since activity).
- **Deals table**: Sort (default: risk score desc), search (deal name/company), filters (Stage, Owner, Lead Source, Risk status). Row click opens a side drawer with deal details and an AI summary stub.
- **Risk scoring**: Deterministic 0–100 score with status (Healthy / Watch / At Risk) and text reasons. Implemented in `lib/risk.ts`.
- **AI summary**: Rule-based stub in the drawer; no API keys. A TODO marks where to plug in an LLM (e.g. OpenAI).

## Where to tweak thresholds

- **Risk score bands**: `lib/risk.ts` — `score <= 39` → Healthy, `40–69` → Watch, `70–100` → At Risk.
- **Risk factors**: Same file — `ACTIVITY_RISK_DAYS`, `STAGE_RISK_DAYS`, `LOW_TOUCHES`, `MAX_DAYS_ACTIVITY`, `MAX_DAYS_STAGE`, and `LEAD_SOURCE_WEIGHT`.
- **AI summary rules**: `lib/aiSummary.ts` — `getRecommendedAction()` (e.g. “follow-up if no activity > 7 days”).
- **Mock data**: `data/mockDeals.ts` — deal count, stages, and seed for reproducibility.

## Routes

| Route        | Description                    |
|-------------|--------------------------------|
| `/`         | Redirects to `/dashboard`      |
| `/dashboard`| Main dashboard and deals table |
| `/api/deals`| Raw deals (mock)               |
| `/api/score`| Deals with risk scores         |

## Tech stack

- Next.js 14+ (App Router), TypeScript, TailwindCSS
- Recharts (charts), Zustand available (state is local React here)
- Mock data in `data/mockDeals.ts`; no external APIs
