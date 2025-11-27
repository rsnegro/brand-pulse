import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  trend?: "up" | "down";
}

export const MetricCard = ({ title, value, change, icon: Icon, trend = "up" }: MetricCardProps) => {
  const isPositive = trend === "up";
  
  return (
    <Card className="bg-gradient-card border-border hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">{value}</span>
              <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {isPositive ? '+' : ''}{change}%
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${isPositive ? 'bg-success/10' : 'bg-destructive/10'}`}>
            <Icon className={`w-6 h-6 ${isPositive ? 'text-success' : 'text-destructive'}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
