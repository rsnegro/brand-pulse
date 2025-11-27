import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { date: "01/11", positivo: 72, neutro: 20, negativo: 8 },
  { date: "05/11", positivo: 68, neutro: 24, negativo: 8 },
  { date: "10/11", positivo: 75, neutro: 18, negativo: 7 },
  { date: "15/11", positivo: 78, neutro: 16, negativo: 6 },
  { date: "20/11", positivo: 82, neutro: 13, negativo: 5 },
  { date: "25/11", positivo: 85, neutro: 11, negativo: 4 },
  { date: "Hoje", positivo: 88, neutro: 9, negativo: 3 },
];

export const SentimentChart = () => {
  return (
    <Card className="bg-gradient-card border-border shadow-lg">
      <CardHeader>
        <CardTitle>Análise de Sentimento - Últimos 30 dias</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="positivo" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--success))' }}
              name="Positivo"
            />
            <Line 
              type="monotone" 
              dataKey="neutro" 
              stroke="hsl(var(--warning))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--warning))' }}
              name="Neutro"
            />
            <Line 
              type="monotone" 
              dataKey="negativo" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--destructive))' }}
              name="Negativo"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
