import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, Zap, AlertTriangle } from "lucide-react";

interface AnomalyIndicator {
  id: string;
  name: string;
  value: string;
  change: number;
  status: "normal" | "warning" | "critical";
  icon: any;
  description: string;
}

const anomalies: AnomalyIndicator[] = [
  {
    id: "1",
    name: "Velocidade da Conversa",
    value: "2.8x",
    change: 180,
    status: "warning",
    icon: Zap,
    description: "Pico abrupto nas últimas 2 horas"
  },
  {
    id: "2",
    name: "Aceleração",
    value: "340%",
    change: 340,
    status: "critical",
    icon: TrendingUp,
    description: "Volume crescendo exponencialmente"
  },
  {
    id: "3",
    name: "Cluster Negativo",
    value: "85%",
    change: 85,
    status: "critical",
    icon: AlertTriangle,
    description: "Alta concentração de buzz negativo"
  },
  {
    id: "4",
    name: "Novos Tópicos",
    value: "3",
    change: 0,
    status: "warning",
    icon: Activity,
    description: "Tópicos emergentes detectados"
  }
];

const statusConfig = {
  normal: {
    badge: "bg-success/10 text-success border-success/20",
    label: "Normal"
  },
  warning: {
    badge: "bg-warning/10 text-warning border-warning/20",
    label: "Atenção"
  },
  critical: {
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    label: "Crítico"
  }
};

export const DeteccaoAnomalias = () => {
  return (
    <Card className="bg-gradient-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Detecção de Anomalias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {anomalies.map((anomaly) => {
            const Icon = anomaly.icon;
            const config = statusConfig[anomaly.status];
            
            return (
              <div
                key={anomaly.id}
                className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${config.badge}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge className={config.badge}>
                    {config.label}
                  </Badge>
                </div>
                
                <h4 className="font-semibold text-foreground mb-1">{anomaly.name}</h4>
                <div className="text-2xl font-bold text-foreground mb-2">{anomaly.value}</div>
                <p className="text-xs text-muted-foreground">{anomaly.description}</p>
                
                {anomaly.change > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-destructive font-semibold">
                      ↑ +{anomaly.change}% vs período anterior
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
