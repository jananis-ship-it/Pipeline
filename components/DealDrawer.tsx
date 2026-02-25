"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate, formatCurrency } from "@/lib/date";
import { generateDealSummary } from "@/lib/aiSummary";
import type { ScoredDeal } from "@/lib/types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DealDrawerProps {
  deal: ScoredDeal | null;
  onClose: () => void;
}

export function DealDrawer({ deal, onClose }: DealDrawerProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!deal) return null;

  const summary = generateDealSummary(deal);
  const statusStyles = {
    Healthy: "bg-emerald-50/90 text-emerald-600",
    Watch: "bg-amber-50/90 text-amber-600",
    "At Risk": "bg-rose-50/90 text-rose-600",
  };

  const drawer = (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-card border-l border-border shadow-2xl",
          "flex flex-col overflow-hidden",
          "animate-in slide-in-from-right duration-200"
        )}
        role="dialog"
        aria-label="Deal details"
      >
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-4">
          <h2 className="text-lg font-semibold truncate pr-2">{deal.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close" className="rounded-lg">
            <X className="size-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className={cn("rounded-md px-2.5 py-0.5 text-xs font-medium", statusStyles[deal.risk.status])}>
              {deal.risk.status}
            </span>
            <span className="rounded-md border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              Risk: {deal.risk.score}
            </span>
          </div>

          <Card size="sm" className="rounded-xl border-border">
            <CardHeader className="pb-1">
              <div data-slot="card-title" className="text-sm font-medium">
                Details
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-1.5">
              <p><span className="text-muted-foreground">Company:</span> {deal.company}</p>
              <p><span className="text-muted-foreground">Stage:</span> {deal.stage}</p>
              <p><span className="text-muted-foreground">Owner:</span> {deal.owner}</p>
              <p><span className="text-muted-foreground">Value:</span> {formatCurrency(deal.value)}</p>
              <p><span className="text-muted-foreground">Lead source:</span> {deal.leadSource}</p>
              <p><span className="text-muted-foreground">Last activity:</span> {formatDate(deal.lastActivityAt)}</p>
              <p><span className="text-muted-foreground">Days in stage:</span> {deal.daysInStage}</p>
              <p><span className="text-muted-foreground">Touches:</span> {deal.touchesCount}</p>
            </CardContent>
          </Card>

          {deal.risk.reasons.length > 0 && (
            <Card size="sm" className="rounded-xl border-border">
              <CardHeader className="pb-1">
                <div data-slot="card-title" className="text-sm font-medium">
                  Risk reasons
                </div>
              </CardHeader>
              <CardContent>
                <ul className="text-sm list-disc list-inside space-y-0.5">
                  {deal.risk.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card size="sm" className="rounded-xl border-border">
            <CardHeader className="pb-1">
              <div data-slot="card-title" className="text-sm font-medium">
                AI Summary
              </div>
              <div data-slot="card-description" className="text-xs text-muted-foreground">
                {/* TODO: Replace rule-based summary with LLM call (e.g. OpenAI). 
                    Call the API with deal + risk context and stream or return generated text here. */}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{summary}</p>
            </CardContent>
          </Card>
        </div>
      </aside>
    </>
  );

  if (typeof document === "undefined") return null;
  return createPortal(drawer, document.body);
}
