import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Twitter, MessageCircle, Globe, ThumbsUp } from "lucide-react";

const mentions = [
  {
    id: 1,
    source: "twitter",
    author: "@MariaOliveira",
    content: "Excelente atendimento e produto de qualidade! Super recomendo a marca.",
    sentiment: "positive",
    engagement: 245,
    time: "há 2 horas"
  },
  {
    id: 2,
    source: "news",
    author: "Portal Tech Brasil",
    content: "Empresa se destaca por inovação e compromisso com sustentabilidade.",
    sentiment: "positive",
    engagement: 1240,
    time: "há 4 horas"
  },
  {
    id: 3,
    source: "facebook",
    author: "João Santos",
    content: "Produtos entregues dentro do prazo. Qualidade mantida como sempre.",
    sentiment: "neutral",
    engagement: 89,
    time: "há 6 horas"
  },
  {
    id: 4,
    source: "instagram",
    author: "@CarlaRocha",
    content: "Adorei a nova coleção! Design moderno e acabamento perfeito.",
    sentiment: "positive",
    engagement: 534,
    time: "há 8 horas"
  },
];

const sourceIcons = {
  twitter: Twitter,
  news: Globe,
  facebook: MessageCircle,
  instagram: MessageCircle,
};

const sentimentColors = {
  positive: "bg-success/10 text-success border-success/20",
  negative: "bg-destructive/10 text-destructive border-destructive/20",
  neutral: "bg-warning/10 text-warning border-warning/20",
};

const sentimentLabels = {
  positive: "Positivo",
  negative: "Negativo",
  neutral: "Neutro",
};

export const RecentMentions = () => {
  return (
    <Card className="bg-gradient-card border-border shadow-lg">
      <CardHeader>
        <CardTitle>Menções Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mentions.map((mention) => {
            const SourceIcon = sourceIcons[mention.source as keyof typeof sourceIcons];
            return (
              <div 
                key={mention.id} 
                className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <SourceIcon className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">{mention.author}</span>
                  </div>
                  <Badge className={sentimentColors[mention.sentiment as keyof typeof sentimentColors]}>
                    {sentimentLabels[mention.sentiment as keyof typeof sentimentLabels]}
                  </Badge>
                </div>
                
                <p className="text-sm text-foreground mb-3 leading-relaxed">
                  {mention.content}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{mention.engagement} interações</span>
                  </div>
                  <span>{mention.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
