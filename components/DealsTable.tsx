"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/date";
import type { ScoredDeal } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface DealsTableProps {
  deals: ScoredDeal[];
  onSelectDeal: (deal: ScoredDeal) => void;
}

type SortKey = "riskScore" | "value" | "daysSinceActivity" | "company" | "stage";

export function DealsTable({ deals, onSelectDeal }: DealsTableProps) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [leadSourceFilter, setLeadSourceFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("riskScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const stages = useMemo(() => [...new Set(deals.map((d) => d.stage))].sort(), [deals]);
  const owners = useMemo(() => [...new Set(deals.map((d) => d.owner))].sort(), [deals]);
  const leadSources = useMemo(() => [...new Set(deals.map((d) => d.leadSource))].sort(), [deals]);

  const filteredAndSorted = useMemo(() => {
    let list = deals.filter((d) => {
      const matchSearch =
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.company.toLowerCase().includes(search.toLowerCase());
      const matchStage = stageFilter === "all" || d.stage === stageFilter;
      const matchOwner = ownerFilter === "all" || d.owner === ownerFilter;
      const matchSource = leadSourceFilter === "all" || d.leadSource === leadSourceFilter;
      const matchRisk =
        riskFilter === "all" || d.risk.status === riskFilter;
      return matchSearch && matchStage && matchOwner && matchSource && matchRisk;
    });
    list = [...list].sort((a, b) => {
      let diff = 0;
      if (sortKey === "riskScore") diff = a.risk.score - b.risk.score;
      else if (sortKey === "value") diff = a.value - b.value;
      else if (sortKey === "daysSinceActivity") diff = a.daysSinceActivity - b.daysSinceActivity;
      else if (sortKey === "company") diff = a.company.localeCompare(b.company);
      else if (sortKey === "stage") diff = a.stage.localeCompare(b.stage);
      return sortDir === "asc" ? diff : -diff;
    });
    return list;
  }, [deals, search, stageFilter, ownerFilter, leadSourceFilter, riskFilter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "riskScore" ? "desc" : "asc");
    }
  };

  const Th = ({
    label,
    keyName,
    className,
  }: {
    label: string;
    keyName: SortKey;
    className?: string;
  }) => (
    <th
      className={cn(
        "text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2 cursor-pointer hover:bg-muted/50",
        className
      )}
      onClick={() => toggleSort(keyName)}
    >
      {label} {sortKey === keyName && (sortDir === "asc" ? "↑" : "↓")}
    </th>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[180px] max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search deal or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {stages.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={ownerFilter} onValueChange={setOwnerFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Owner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All owners</SelectItem>
            {owners.map((o) => (
              <SelectItem key={o} value={o}>{o}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={leadSourceFilter} onValueChange={setLeadSourceFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Lead source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            {leadSources.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All risk</SelectItem>
            <SelectItem value="Healthy">Healthy</SelectItem>
            <SelectItem value="Watch">Watch</SelectItem>
            <SelectItem value="At Risk">At Risk</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-muted/50">
            <tr>
              <Th label="Deal" keyName="company" />
              <Th label="Company" keyName="company" className="hidden sm:table-cell" />
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Stage</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Owner</th>
              <Th label="Value" keyName="value" />
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Last activity</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Days since activity</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Days in stage</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Touches</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Lead source</th>
              <Th label="Risk" keyName="riskScore" />
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((deal) => (
              <tr
                key={deal.id}
                className="border-t hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => onSelectDeal(deal)}
              >
                <td className="px-3 py-2 font-medium">{deal.name}</td>
                <td className="px-3 py-2 text-muted-foreground hidden sm:table-cell">{deal.company}</td>
                <td className="px-3 py-2">{deal.stage}</td>
                <td className="px-3 py-2">{deal.owner}</td>
                <td className="px-3 py-2 tabular-nums">{formatCurrency(deal.value)}</td>
                <td className="px-3 py-2">{formatDate(deal.lastActivityAt)}</td>
                <td className="px-3 py-2 tabular-nums">{deal.daysSinceActivity}</td>
                <td className="px-3 py-2 tabular-nums">{deal.daysInStage}</td>
                <td className="px-3 py-2">{deal.touchesCount}</td>
                <td className="px-3 py-2">{deal.leadSource}</td>
                <td className="px-3 py-2 tabular-nums">{deal.risk.score}</td>
                <td className="px-3 py-2">
                  <Badge
                    variant={
                      deal.risk.status === "At Risk"
                        ? "destructive"
                        : deal.risk.status === "Watch"
                          ? "secondary"
                          : "default"
                    }
                  >
                    {deal.risk.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">
        Showing {filteredAndSorted.length} of {deals.length} deals. Click a row to open details.
      </p>
    </div>
  );
}
