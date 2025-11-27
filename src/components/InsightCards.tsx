import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertTriangle, TrendingUp } from "lucide-react";

const insights = [
  {
    id: 1,
    type: "opportunity",
    icon: TrendingUp,
    title: "Tendência Positiva Identificada",
    description: "Crescimento de 23% nas menções positivas após campanha de sustentabilidade.",
    priority: "high",
    color: "text-success"
  },
  {
    id: 2,
    type: "insight",
    icon: Lightbulb,
    title: "Novo Público Engajado",
    description: "Aumento de 45% no engajamento do público entre 25-34 anos nas últimas 2 semanas.",
    priority: "medium",
    color: "text-primary"
  },
  {
    id: 3,
    type: "alert",
    icon: AlertTriangle,
    title: "Atenção Requerida",
    description: "Pequeno aumento nas menções sobre tempo de entrega. Monitorar próximos 7 dias.",
    priority: "low",
    color: "text-warning"
  },
];

const priorityColors = {
  high: "bg-success/10 text-success border-success/20",
  medium: "bg-primary/10 text-primary border-primary/20",
  low: "bg-warning/10 text-warning border-warning/20",
};

const priorityLabels = {
  high: "Alta Prioridade",
  medium: "Média",
  low: "Baixa",
};

export const InsightCards = () => {
  return (
    <Card className="bg-gradient-card border-border shadow-lg">
      <CardHeader>
        <CardTitle>Insights & Recomendações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => {
            const Icon = insight.icon;
            return (
              <div 
                key={insight.id}
                className="p-4 rounded-lg border border-border bg-card/50 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-${insight.color.replace('text-', '')}/10`}>
                    <Icon className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">{insight.title}</h4>
                      <Badge className={priorityColors[insight.priority as keyof typeof priorityColors]}>
                        {priorityLabels[insight.priority as keyof typeof priorityLabels]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
