import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

export function KpiCard({ title, value, subtitle, className }: KpiCardProps) {
  return (
    <Card className={cn("rounded-xl border-border bg-card shadow-sm", className)} size="default">
      <CardContent className="p-5">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">{value}</p>
        {subtitle != null && (
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
