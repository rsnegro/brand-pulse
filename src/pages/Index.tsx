import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { TermometroBrand } from "@/components/TermometroBrand";
import { AlertasCrise } from "@/components/AlertasCrise";
import { DeteccaoAnomalias } from "@/components/DeteccaoAnomalias";
import { MetricCard } from "@/components/MetricCard";
import { SentimentChart } from "@/components/SentimentChart";
import { NarrativasEmergentes } from "@/components/NarrativasEmergentes";
import { InfluenciadoresCriticos } from "@/components/InfluenciadoresCriticos";
import { RecentMentions } from "@/components/RecentMentions";
import { MessageSquare, Eye, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <Hero />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl flex-1">
        <div className="space-y-8">
          {/* Título da seção de dashboard */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Sistema de Prevenção de Crises</h2>
            <p className="text-muted-foreground">Monitoramento inteligente e alertas em tempo real</p>
          </div>

          {/* Termômetro e Alertas de Crise */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TermometroBrand />
            </div>
            <div className="lg:col-span-2">
              <AlertasCrise />
            </div>
          </div>

          {/* Detecção de Anomalias */}
          <DeteccaoAnomalias />

          {/* Métricas rápidas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              title="Volume Total"
              value="2.3k"
              change={340}
              icon={MessageSquare}
              trend="up"
            />
            <MetricCard
              title="Alcance"
              value="485k"
              change={180}
              icon={Eye}
              trend="up"
            />
            <MetricCard
              title="Velocidade"
              value="2.8x"
              change={180}
              icon={Zap}
              trend="up"
            />
          </div>

          {/* Gráfico de evolução do sentimento */}
          <SentimentChart />

          {/* Narrativas Emergentes e Influenciadores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NarrativasEmergentes />
            <InfluenciadoresCriticos />
          </div>

          {/* Menções recentes */}
          <RecentMentions />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
