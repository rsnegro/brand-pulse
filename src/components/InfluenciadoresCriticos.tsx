import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, TrendingUp, AlertTriangle } from "lucide-react";

interface Influencer {
  id: string;
  name: string;
  handle: string;
  followers: string;
  sentiment: "positive" | "negative" | "neutral";
  impact: number;
  mentions: number;
  reach: string;
}

const influencers: Influencer[] = [
  {
    id: "1",
    name: "Carlos Mendes",
    handle: "@carlosm_tech",
    followers: "125k",
    sentiment: "negative",
    impact: 92,
    mentions: 8,
    reach: "340k"
  },
  {
    id: "2",
    name: "Ana Paula",
    handle: "@anaptech",
    followers: "89k",
    sentiment: "negative",
    impact: 78,
    mentions: 5,
    reach: "210k"
  },
  {
    id: "3",
    name: "Tech Today",
    handle: "@techtodaybr",
    followers: "245k",
    sentiment: "neutral",
    impact: 65,
    mentions: 3,
    reach: "450k"
  },
  {
    id: "4",
    name: "Maria Costa",
    handle: "@mariacosta",
    followers: "67k",
    sentiment: "positive",
    impact: 58,
    mentions: 12,
    reach: "180k"
  }
];

const sentimentConfig = {
  positive: { color: "bg-success/10 text-success border-success/20", label: "Positivo" },
  neutral: { color: "bg-warning/10 text-warning border-warning/20", label: "Neutro" },
  negative: { color: "bg-destructive/10 text-destructive border-destructive/20", label: "Negativo" }
};

export const InfluenciadoresCriticos = () => {
  return (
    <Card className="bg-gradient-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Influenciadores Críticos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {influencers.map((influencer) => {
            const config = sentimentConfig[influencer.sentiment];
            
            return (
              <div
                key={influencer.id}
                className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-all"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {influencer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{influencer.name}</h4>
                        <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                      </div>
                      <Badge className={config.color}>
                        {config.label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">Seguidores:</span>
                        <span className="ml-1 font-semibold">{influencer.followers}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Alcance:</span>
                        <span className="ml-1 font-semibold">{influencer.reach}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Menções:</span>
                        <span className="ml-1 font-semibold">{influencer.mentions}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Impacto:</span>
                        <span className={`ml-1 font-semibold ${influencer.impact >= 80 ? 'text-destructive' : 'text-foreground'}`}>
                          {influencer.impact}%
                        </span>
                      </div>
                    </div>

                    {influencer.impact >= 80 && influencer.sentiment === 'negative' && (
                      <div className="flex items-center gap-1 mt-3 p-2 rounded bg-destructive/5 border border-destructive/20">
                        <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0" />
                        <span className="text-xs text-destructive">
                          Alto impacto negativo - monitorar de perto
                        </span>
                      </div>
                    )}
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
