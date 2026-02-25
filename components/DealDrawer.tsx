"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  const statusVariant =
    deal.risk.status === "At Risk"
      ? "destructive"
      : deal.risk.status === "Watch"
        ? "secondary"
        : "default";

  const drawer = (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        aria-hidden
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background shadow-xl",
          "flex flex-col overflow-hidden",
          "animate-in slide-in-from-right duration-200"
        )}
        role="dialog"
        aria-label="Deal details"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold truncate pr-2">{deal.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant={statusVariant}>{deal.risk.status}</Badge>
            <Badge variant="outline">Risk: {deal.risk.score}</Badge>
          </div>

          <Card size="sm">
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
            <Card size="sm">
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

          <Card size="sm">
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
