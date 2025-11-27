-- Tabela para armazenar alertas de crise
CREATE TABLE IF NOT EXISTS public.crisis_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_name TEXT NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('volume_spike', 'sentiment_drop', 'narrative_threat', 'velocity_anomaly', 'influencer_attack')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  metrics JSONB,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'monitoring', 'resolved')),
  detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para armazenar métricas de temperatura da marca
CREATE TABLE IF NOT EXISTS public.brand_temperature (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_name TEXT NOT NULL,
  temperature_score INTEGER NOT NULL CHECK (temperature_score BETWEEN 0 AND 100),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('safe', 'warning', 'danger', 'critical')),
  positive_volume INTEGER NOT NULL DEFAULT 0,
  negative_volume INTEGER NOT NULL DEFAULT 0,
  neutral_volume INTEGER NOT NULL DEFAULT 0,
  velocity_indicator NUMERIC(5,2) NOT NULL DEFAULT 0,
  narrative_threats INTEGER NOT NULL DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para narrativas emergentes
CREATE TABLE IF NOT EXISTS public.emerging_narratives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_name TEXT NOT NULL,
  narrative TEXT NOT NULL,
  sentiment TEXT NOT NULL CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  volume INTEGER NOT NULL DEFAULT 0,
  growth_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  risk_score INTEGER NOT NULL CHECK (risk_score BETWEEN 0 AND 100),
  first_detected TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'escalating', 'declining', 'resolved'))
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_crisis_alerts_brand ON public.crisis_alerts(brand_name);
CREATE INDEX IF NOT EXISTS idx_crisis_alerts_severity ON public.crisis_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_crisis_alerts_status ON public.crisis_alerts(status);
CREATE INDEX IF NOT EXISTS idx_brand_temp_brand ON public.brand_temperature(brand_name);
CREATE INDEX IF NOT EXISTS idx_brand_temp_recorded ON public.brand_temperature(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_narratives_brand ON public.emerging_narratives(brand_name);
CREATE INDEX IF NOT EXISTS idx_narratives_risk ON public.emerging_narratives(risk_score DESC);

-- Habilitar RLS
ALTER TABLE public.crisis_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_temperature ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emerging_narratives ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS (públicas para demo - ajuste conforme necessário)
CREATE POLICY "Permitir leitura pública de alertas" 
ON public.crisis_alerts FOR SELECT 
USING (true);

CREATE POLICY "Permitir leitura pública de temperatura" 
ON public.brand_temperature FOR SELECT 
USING (true);

CREATE POLICY "Permitir leitura pública de narrativas" 
ON public.emerging_narratives FOR SELECT 
USING (true);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_crisis_alerts_updated_at
BEFORE UPDATE ON public.crisis_alerts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir dados de exemplo para demonstração
INSERT INTO public.crisis_alerts (brand_name, alert_type, severity, title, description, metrics, status, detected_at) VALUES
('Charisma', 'velocity_anomaly', 'high', 'Pico Abrupto de Menções', 'Aumento de 340% no volume de menções nas últimas 2 horas. Concentração em tópicos relacionados a atendimento.', '{"volume_increase": 340, "time_window": "2h", "primary_topic": "atendimento"}', 'active', now() - interval '2 hours'),
('Charisma', 'narrative_threat', 'critical', 'Narrativa Crítica Emergente', 'Nova narrativa negativa identificada: "problemas com entrega". Crescimento de 180% em 4 horas.', '{"growth_rate": 180, "mentions": 234, "reach": 45000}', 'active', now() - interval '4 hours');

INSERT INTO public.brand_temperature (brand_name, temperature_score, risk_level, positive_volume, negative_volume, neutral_volume, velocity_indicator, narrative_threats) VALUES
('Charisma', 68, 'warning', 1240, 420, 680, 2.8, 2);

INSERT INTO public.emerging_narratives (brand_name, narrative, sentiment, volume, growth_rate, risk_score, status) VALUES
('Charisma', 'Problemas com prazo de entrega', 'negative', 234, 180.5, 85, 'escalating'),
('Charisma', 'Qualidade do atendimento', 'negative', 156, 95.2, 72, 'active'),
('Charisma', 'Produto inovador', 'positive', 890, 45.0, 25, 'active');