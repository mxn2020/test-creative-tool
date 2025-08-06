import React from 'react';
import { Container, Div, H2, Stat } from '@/lib/dev-container';
import { TrendingUp, Users, ChartBar, Pulse } from 'lucide-react';

const stats = [
  {
    icon: <TrendingUp className="h-8 w-8 text-indigo-600" />,
    label: 'Active Users',
    value: '12,345',
  },
  {
    icon: <ChartBar className="h-8 w-8 text-indigo-600" />,
    label: 'Daily Sessions',
    value: '34,567',
  },
  {
    icon: <Pulse className="h-8 w-8 text-indigo-600" />,
    label: 'Uptime',
    value: '99.99%',
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-600" />,
    label: 'Projects Managed',
    value: '1,234',
  },
];

export const Stats: React.FC = () => {
  return (
    <Container componentId="landing-stats">
      <Div devId="stats-section" className="py-12 bg-gray-100">
        <H2 devId="stats-heading" className="text-3xl font-bold text-center mb-8">
          Business at a Glance
        </H2>
        <Div devId="stats-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {stats.map((item, idx) => (
            <Div
              key={idx}
              className="flex flex-col items-center bg-white rounded-lg shadow p-6"
            >
              <Div className="mb-3">{item.icon}</Div>
              <span className="text-xl font-semibold">{item.value}</span>
              <span className="text-gray-600">{item.label}</span>
            </Div>
          ))}
        </Div>
      </Div>
    </Container>
  );
};

export default Stats;