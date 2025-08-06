import React from 'react';
import { Container, Div, H2, P } from '@/lib/dev-container';
import { Users, BarChart2, Clock } from 'lucide-react';

type Stat = {
  label: string;
  value: string;
  icon: React.ElementType;
};

const stats: Stat[] = [
  {
    label: 'Active Users',
    value: '12,345',
    icon: Users,
  },
  {
    label: 'Tasks Processed',
    value: '98,765',
    icon: BarChart2,
  },
  {
    label: 'Uptime',
    value: '99.99%',
    icon: Clock,
  },
];

const Stats: React.FC = () => {
  return (
    <Container componentId="landing-stats" className="bg-gray-100 py-12">
      <Div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Div key={stat.label} className="flex flex-col items-center">
              <Icon className="h-10 w-10 text-purple-600 mb-2" />
              <H2 className="text-3xl font-bold">{stat.value}</H2>
              <P className="text-gray-600">{stat.label}</P>
            </Div>
          );
        })}
      </Div>
    </Container>
  );
};

export default Stats;