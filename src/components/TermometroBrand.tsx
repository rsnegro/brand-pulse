import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BrandTemperature {
  temperature_score: number;
  risk_level: string;
  positive_volume: number;
  negative_volume: number;
  neutral_volume: number;
  velocity_indicator: number;
  narrative_threats: number;
}

export const TermometroBrand = () => {
  const [temperature, setTemperature] = useState<BrandTemperature | null>(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      const { data } = await supabase
        .from('brand_temperature')
        .select('*')
        .eq('brand_name', 'Charisma')
        .order('recorded_at', { ascending: false })
        .limit(1)
        .single();
      
      if (data) setTemperature(data);
    };

    fetchTemperature();
  }, []);

  if (!temperature) return null;

  const riskConfig = {
    safe: { color: 'bg-success', text: 'text-success', label: 'Seguro', icon: TrendingUp },
    warning: { color: 'bg-warning', text: 'text-warning', label: 'Atenção', icon: Minus },
    danger: { color: 'bg-destructive', text: 'text-destructive', label: 'Perigo', icon: TrendingDown },
    critical: { color: 'bg-destructive', text: 'text-destructive', label: 'Crítico', icon: TrendingDown }
  };

  const config = riskConfig[temperature.risk_level as keyof typeof riskConfig];
  const Icon = config.icon;

  return (
    <Card className="bg-gradient-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="w-5 h-5" />
          Termômetro da Marca
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score principal */}
        <div className="text-center space-y-2">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center">
              <span className={`text-4xl font-bold ${config.text}`}>
                {temperature.temperature_score}°
              </span>
            </div>
          </div>
          <Badge className={`${config.color}/10 ${config.text} border-${config.color}/20`}>
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        </div>

        {/* Métricas de distribuição */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Positivo</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success"
                  style={{ 
                    width: `${(temperature.positive_volume / (temperature.positive_volume + temperature.negative_volume + temperature.neutral_volume)) * 100}%` 
                  }}
                />
              </div>
              <span className="text-sm font-medium">{temperature.positive_volume}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Negativo</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-destructive"
                  style={{ 
                    width: `${(temperature.negative_volume / (temperature.positive_volume + temperature.negative_volume + temperature.neutral_volume)) * 100}%` 
                  }}
                />
              </div>
              <span className="text-sm font-medium">{temperature.negative_volume}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Neutro</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-warning"
                  style={{ 
                    width: `${(temperature.neutral_volume / (temperature.positive_volume + temperature.negative_volume + temperature.neutral_volume)) * 100}%` 
                  }}
                />
              </div>
              <span className="text-sm font-medium">{temperature.neutral_volume}</span>
            </div>
          </div>
        </div>

        {/* Indicadores de risco */}
        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Velocidade da Conversa</span>
            <span className="font-semibold">{temperature.velocity_indicator}x</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Narrativas Ameaçadoras</span>
            <Badge variant="destructive" className="text-xs">{temperature.narrative_threats}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
