import { Hero } from "@/components/Hero";
import { ReputationScore } from "@/components/ReputationScore";
import { MetricCard } from "@/components/MetricCard";
import { SentimentChart } from "@/components/SentimentChart";
import { RecentMentions } from "@/components/RecentMentions";
import { InsightCards } from "@/components/InsightCards";
import { MessageSquare, Users, Eye, Share2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="space-y-8">
          {/* Título da seção de dashboard */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard de Reputação</h2>
            <p className="text-muted-foreground">Visão geral dos principais indicadores da sua marca</p>
          </div>

          {/* Score principal e métricas */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ReputationScore score={87} change={5.2} period="mês anterior" />
            </div>
            
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard
                title="Menções"
                value="2.4k"
                change={12.5}
                icon={MessageSquare}
                trend="up"
              />
              <MetricCard
                title="Alcance"
                value="124k"
                change={8.3}
                icon={Eye}
                trend="up"
              />
              <MetricCard
                title="Engajamento"
                value="15.6k"
                change={-2.1}
                icon={Users}
                trend="down"
              />
            </div>
          </div>

          {/* Gráfico de sentimento */}
          <SentimentChart />

          {/* Grid de menções e insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentMentions />
            <InsightCards />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
