import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendDown?: boolean;
  className?: string;
}

export function KpiCard({ title, value, subtitle, trend, trendDown, className }: KpiCardProps) {
  return (
    <Card className={cn("rounded-2xl border border-border/80 bg-white shadow-sm transition-shadow hover:shadow", className)} size="default">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">{value}</p>
          {trend != null && (
            <span className={cn(
              "flex items-center text-xs font-medium",
              trendDown ? "text-red-600" : "text-emerald-600"
            )}>
              {trendDown ? <TrendingDown className="size-3.5 mr-0.5" /> : <TrendingUp className="size-3.5 mr-0.5" />}
              {trend}
            </span>
          )}
        </div>
        {subtitle != null && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
