import { BarChart3, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-primary py-20 px-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm px-4 py-2 rounded-full border border-card/20">
            <Shield className="w-4 h-4 text-card" />
            <span className="text-sm font-medium text-card">Monitoramento em Tempo Real</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-card leading-tight">
            Previsão Charisma
            <br />
            <span className="text-card/90">Detecção Precoce de Crises</span>
          </h1>
          
          <p className="text-xl text-card/80 max-w-2xl mx-auto">
            Sistema inteligente de alerta que monitora conversas, detecta anomalias e previne crises reputacionais antes que escalem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-card text-primary hover:bg-card/90 shadow-lg">
              <BarChart3 className="w-4 h-4 mr-2" />
              Ver Dashboard
            </Button>
            <Button size="lg" className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Análise Gratuita
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { value: "98%", label: "Precisão", desc: "nos insights gerados" },
            { value: "24/7", label: "Monitoramento", desc: "em tempo real" },
            { value: "50+", label: "Fontes", desc: "rastreadas" }
          ].map((stat, i) => (
            <div key={i} className="bg-card/10 backdrop-blur-md rounded-xl p-6 border border-card/20 text-center">
              <div className="text-4xl font-bold text-card mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-card/90">{stat.label}</div>
              <div className="text-sm text-card/70 mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
