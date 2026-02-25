"use client";

import { useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency } from "@/lib/date";
import type { ScoredDeal } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Search,
  Filter,
  LayoutGrid,
  ChevronDown,
  User,
  Building2,
  DollarSign,
  Calendar,
  Tag,
  AlertTriangle,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PAGE_SIZE = 10;

interface DealsTableProps {
  deals: ScoredDeal[];
  onSelectDeal: (deal: ScoredDeal) => void;
}

type SortKey = "riskScore" | "value" | "daysSinceActivity" | "company" | "stage";

function Avatar({ name }: { name: string }) {
  const initial = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const hue = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div
      className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
      style={{ backgroundColor: `hsl(${hue}, 55%, 45%)` }}
    >
      {initial}
    </div>
  );
}

function CompanyCell({ company }: { company: string }) {
  const initial = company.slice(0, 1).toUpperCase();
  const hue = company.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-white"
        style={{ backgroundColor: `hsl(${hue}, 50%, 40%)` }}
      >
        {initial}
      </div>
      <span className="truncate">{company}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: "Healthy" | "Watch" | "At Risk" }) {
  const styles = {
    Healthy: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    Watch: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
    "At Risk": "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}

export function DealsTable({ deals, onSelectDeal }: DealsTableProps) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [leadSourceFilter, setLeadSourceFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("riskScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

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
      const matchRisk = riskFilter === "all" || d.risk.status === riskFilter;
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

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedRows = filteredAndSorted.slice(start, start + PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, stageFilter, ownerFilter, leadSourceFilter, riskFilter]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "riskScore" ? "desc" : "asc");
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedRows.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginatedRows.map((d) => d.id)));
  };
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const Th = ({
    label,
    keyName,
    icon: Icon,
    className,
  }: {
    label: string;
    keyName: SortKey;
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
  }) => (
    <th
      className={cn(
        "text-left text-xs font-medium text-muted-foreground px-4 py-3 cursor-pointer hover:bg-muted/60 transition-colors",
        className
      )}
      onClick={() => toggleSort(keyName)}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="size-4 shrink-0" />}
        <span>{label}</span>
        <ChevronDown
          className={cn("size-4 shrink-0 opacity-50", sortKey === keyName && "opacity-100")}
        />
      </div>
    </th>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredAndSorted.length} Deals
          </span>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[140px] h-9 border-muted bg-muted/30">
              <SelectValue placeholder="All stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Deals</SelectItem>
              {stages.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9 gap-1.5 border-muted bg-muted/30">
            <Filter className="size-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5 border-muted bg-muted/30">
            <LayoutGrid className="size-4" />
            Edit view
          </Button>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 bg-muted/30 border-muted"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="w-10 px-4 py-3">
                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    className="rounded p-0.5 hover:bg-muted"
                    aria-label="Select all"
                  >
                    {selectedIds.size === paginatedRows.length && paginatedRows.length > 0 ? (
                      <CheckSquare className="size-4 text-primary" />
                    ) : (
                      <Square className="size-4 text-muted-foreground" />
                    )}
                  </button>
                </th>
                <Th label="Deal name" keyName="company" icon={User} />
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="size-4" />
                    Company
                  </div>
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  Stage
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  Owner
                </th>
                <Th label="Value" keyName="value" icon={DollarSign} />
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    Last activity
                  </div>
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  Days (activity)
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  Days (stage)
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  Touches
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Tag className="size-4" />
                    Lead source
                  </div>
                </th>
                <Th label="Risk" keyName="riskScore" icon={AlertTriangle} />
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((deal) => (
                <tr
                  key={deal.id}
                  className="border-b border-border/80 hover:bg-muted/30 cursor-pointer transition-colors last:border-0"
                  onClick={() => onSelectDeal(deal)}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => toggleSelect(deal.id)}
                      className="rounded p-0.5 hover:bg-muted"
                    >
                      {selectedIds.has(deal.id) ? (
                        <CheckSquare className="size-4 text-primary" />
                      ) : (
                        <Square className="size-4 text-muted-foreground" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={deal.owner} />
                      <span className="font-medium">{deal.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <CompanyCell company={deal.company} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{deal.stage}</td>
                  <td className="px-4 py-3">{deal.owner}</td>
                  <td className="px-4 py-3 tabular-nums">{formatCurrency(deal.value)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(deal.lastActivityAt)}</td>
                  <td className="px-4 py-3 tabular-nums">{deal.daysSinceActivity}</td>
                  <td className="px-4 py-3 tabular-nums">{deal.daysInStage}</td>
                  <td className="px-4 py-3">{deal.touchesCount}</td>
                  <td className="px-4 py-3 text-muted-foreground">{deal.leadSource}</td>
                  <td className="px-4 py-3 tabular-nums">{deal.risk.score}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={deal.risk.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <p className="text-sm text-muted-foreground">
          Showing {start + 1}–{Math.min(start + PAGE_SIZE, filteredAndSorted.length)} of {filteredAndSorted.length} deals
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
