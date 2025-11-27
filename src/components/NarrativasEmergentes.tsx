import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageSquareText, TrendingUp, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Narrative {
  id: string;
  narrative: string;
  sentiment: string;
  volume: number;
  growth_rate: number;
  risk_score: number;
  status: string;
}

const sentimentColors = {
  positive: "bg-success/10 text-success border-success/20",
  neutral: "bg-warning/10 text-warning border-warning/20",
  negative: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels = {
  active: "Ativo",
  escalating: "Escalando",
  declining: "Diminuindo",
  resolved: "Resolvido",
};

export const NarrativasEmergentes = () => {
  const [narratives, setNarratives] = useState<Narrative[]>([]);

  useEffect(() => {
    const fetchNarratives = async () => {
      const { data } = await supabase
        .from('emerging_narratives')
        .select('*')
        .eq('brand_name', 'Charisma')
        .in('status', ['active', 'escalating'])
        .order('risk_score', { ascending: false })
        .limit(5);
      
      if (data) setNarratives(data);
    };

    fetchNarratives();
  }, []);

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-destructive";
    if (score >= 60) return "text-warning";
    return "text-success";
  };

  return (
    <Card className="bg-gradient-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquareText className="w-5 h-5" />
          Narrativas Emergentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {narratives.map((narrative) => (
            <div
              key={narrative.id}
              className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{narrative.narrative}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className={sentimentColors[narrative.sentiment as keyof typeof sentimentColors]}>
                      {narrative.sentiment}
                    </Badge>
                    {narrative.status === 'escalating' && (
                      <Badge variant="destructive" className="text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {statusLabels[narrative.status]}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getRiskColor(narrative.risk_score)}`}>
                    {narrative.risk_score}
                  </div>
                  <div className="text-xs text-muted-foreground">risco</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Volume de menções</span>
                  <span className="font-semibold">{narrative.volume}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Taxa de crescimento</span>
                    <span className="font-semibold text-destructive">+{narrative.growth_rate}%</span>
                  </div>
                  <Progress value={Math.min(narrative.growth_rate, 100)} className="h-2" />
                </div>
              </div>

              {narrative.risk_score >= 70 && (
                <div className="flex items-start gap-2 p-2 rounded bg-warning/5 border border-warning/20">
                  <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-warning">
                    Narrativa de alto risco. Monitoramento contínuo recomendado.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
