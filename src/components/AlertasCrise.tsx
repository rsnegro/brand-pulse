import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, TrendingUp, Zap, Users, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CrisisAlert {
  id: string;
  alert_type: string;
  severity: string;
  title: string;
  description: string;
  metrics: any;
  status: string;
  detected_at: string;
}

const alertTypeIcons = {
  volume_spike: TrendingUp,
  sentiment_drop: AlertTriangle,
  narrative_threat: MessageSquare,
  velocity_anomaly: Zap,
  influencer_attack: Users,
};

const severityColors = {
  low: "bg-primary/10 text-primary border-primary/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-destructive text-destructive-foreground",
};

const alertTypeLabels = {
  volume_spike: "Pico de Volume",
  sentiment_drop: "Queda de Sentimento",
  narrative_threat: "Narrativa Ameaçadora",
  velocity_anomaly: "Anomalia de Velocidade",
  influencer_attack: "Ataque de Influenciador",
};

export const AlertasCrise = () => {
  const [alerts, setAlerts] = useState<CrisisAlert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const { data } = await supabase
        .from('crisis_alerts')
        .select('*')
        .eq('brand_name', 'Charisma')
        .eq('status', 'active')
        .order('severity', { ascending: false })
        .order('detected_at', { ascending: false })
        .limit(5);
      
      if (data) setAlerts(data);
    };

    fetchAlerts();

    // Realtime subscription
    const channel = supabase
      .channel('crisis_alerts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'crisis_alerts'
        },
        () => fetchAlerts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (alerts.length === 0) {
    return (
      <Card className="bg-gradient-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alertas de Crise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
            <p className="text-muted-foreground">Nenhum alerta ativo no momento</p>
            <p className="text-sm text-muted-foreground mt-1">Sua marca está segura</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alertas de Crise Ativos
          </div>
          <Badge variant="destructive">{alerts.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alertTypeIcons[alert.alert_type as keyof typeof alertTypeIcons];
            return (
              <div
                key={alert.id}
                className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${severityColors[alert.severity as keyof typeof severityColors]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{alert.title}</h4>
                        <Badge className={severityColors[alert.severity as keyof typeof severityColors]}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {alert.description}
                      </p>
                    </div>
                  </div>
                </div>

                {alert.metrics && (
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pl-11">
                    {Object.entries(alert.metrics).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-1">
                        <span className="capitalize">{key.replace('_', ' ')}:</span>
                        <span className="font-semibold text-foreground">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pl-11">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(alert.detected_at), { locale: ptBR, addSuffix: true })}
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Investigar
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
