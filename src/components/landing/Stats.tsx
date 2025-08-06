import React from 'react';
import { Container, Div, H2, P } from '@/lib/dev-container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Calendar, TrendingUp } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: string;
}

const stats: StatItem[] = [
  { icon: Users, label: 'Active Clients', value: '12,453' },
  { icon: Calendar, label: 'Monthly Appointments', value: '8,921' },
  { icon: TrendingUp, label: 'Growth Rate', value: '27%' },
];

export const LandingStats: React.FC = () => {
  return (
    <Container componentId="landing-stats">
      <Div devId="stats-section" className="py-12 bg-gray-50">
        <H2 devId="stats-heading" className="text-3xl font-bold text-center mb-8">
          Key Metrics
        </H2>
        <Div devId="stats-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <Card key={idx} className="flex flex-col items-center p-6">
              <CardHeader>
                <stat.icon className="h-8 w-8 text-purple-600" />
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-xl font-semibold">{stat.value}</CardTitle>
                <P className="text-gray-600">{stat.label}</P>
              </CardContent>
            </Card>
          ))}
        </Div>
      </Div>
    </Container>
  );
};

export default LandingStats;