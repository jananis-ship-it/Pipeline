import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

export function KpiCard({ title, value, subtitle, className }: KpiCardProps) {
  return (
    <Card className={cn("", className)} size="default">
      <CardHeader className="pb-1">
        <div data-slot="card-title" className="text-sm font-medium text-muted-foreground">
          {title}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-semibold tabular-nums">{value}</div>
        {subtitle != null && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
