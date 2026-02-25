import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

const ICON_COLORS = [
  "bg-violet-50 text-violet-400",
  "bg-rose-50 text-rose-400",
  "bg-teal-50 text-teal-400",
  "bg-emerald-50 text-emerald-400",
  "bg-amber-50 text-amber-400",
] as const;

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
  const colorClass = ICON_COLORS[iconColorIndex % ICON_COLORS.length];

  return (
    <Card
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow",
        className
      )}
      size="default"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl text-lg">
            {icon ? (
              <span className={cn("flex size-10 items-center justify-center rounded-xl", colorClass)}>
                {icon}
              </span>
            ) : (
              <span className={cn("flex size-10 items-center justify-center rounded-xl font-bold text-sm", colorClass)}>
                {String(value).slice(0, 1)}
              </span>
            )}
          </div>
          <a
            href="#"
            className="text-xs font-medium text-slate-500 hover:text-slate-700 shrink-0"
          >
            View Details
          </a>
        </div>
        <p className="mt-3 text-sm font-medium text-slate-500">{title}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <p className="text-2xl font-semibold tabular-nums tracking-tight text-slate-900">{value}</p>
          {trend != null && (
            <span
              className={cn(
                "flex items-center text-xs font-medium",
                trendDown ? "text-rose-500" : "text-emerald-500"
              )}
            >
              {trendDown ? (
                <TrendingDown className="size-3.5 mr-0.5" />
              ) : (
                <TrendingUp className="size-3.5 mr-0.5" />
              )}
              {trend}
            </span>
          )}
        </div>
        {subtitle != null && (
          <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
