import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendDown?: boolean;
  iconColorIndex?: number;
  icon?: React.ReactNode;
  className?: string;
}

export function KpiCard({
  title,
  value,
  subtitle,
  trend,
  trendDown,
  iconColorIndex = 0,
  icon,
  className,
}: KpiCardProps) {
  return (
    <Card
      className={cn(
        "rounded-xl border border-slate-100 bg-white shadow-none transition-colors hover:border-slate-200",
        className
      )}
      size="default"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            {icon}
          </div>
          <a href="#" className="text-xs font-medium text-slate-400 hover:text-slate-600 shrink-0">
            View Details
          </a>
        </div>
        <p className="mt-2.5 text-xs font-medium text-slate-400">{title}</p>
        <div className="mt-0.5 flex items-baseline gap-2">
          <p className="text-xl font-semibold tabular-nums tracking-tight text-slate-700">{value}</p>
          {trend != null && (
            <span
              className={cn(
                "flex items-center text-xs font-medium",
                trendDown ? "text-slate-500" : "text-slate-500"
              )}
            >
              {trendDown ? (
                <TrendingDown className="size-3 mr-0.5 opacity-70" />
              ) : (
                <TrendingUp className="size-3 mr-0.5 opacity-70" />
              )}
              {trend}
            </span>
          )}
        </div>
        {subtitle != null && (
          <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
