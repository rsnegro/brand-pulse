import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreProps {
  score: number;
  change: number;
  period: string;
}

export const ReputationScore = ({ score, change, period }: ScoreProps) => {
  const isPositive = change >= 0;
  const scoreColor = score >= 80 ? "text-success" : score >= 60 ? "text-warning" : "text-destructive";
  
  return (
    <Card className="bg-gradient-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Score de Reputação</span>
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end gap-2">
          <span className={`text-6xl font-bold ${scoreColor}`}>{score}</span>
          <span className="text-muted-foreground text-sm mb-2">/100</span>
        </div>
        
        <Progress value={score} className="h-3" />
        
        <p className="text-sm text-muted-foreground">
          {isPositive ? "↑" : "↓"} {Math.abs(change)}% comparado ao {period}
        </p>
      </CardContent>
    </Card>
  );
};
