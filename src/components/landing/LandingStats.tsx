// src/components/landing/LandingStats.tsx

import React from 'react';
import { Container, Card, CardContent, Section, Div } from '@/lib/dev-container';

const stats = [
  { devId:'stat-card-0', label: "Build Time", value: "< 2s" },
  { devId:'stat-card-1', label: "Bundle Size", value: "< 50KB" },
  { devId:'stat-card-2', label: "TypeScript", value: "100%" },
  { devId:'stat-card-3', label: "Performance", value: "A+" }
];

export const LandingStats: React.FC = () => {
  return (
    <Container componentId="stats-section">
      <Section 
        devId="stats-content" 
        devName="Stats Content" 
        devDescription="Statistics Section showing performance metrics"
        className="container mx-auto px-4 py-12"
      >
        <Div 
          devId="stats-grid" 
          devName="Stats Grid" 
          devDescription="Grid container for statistics cards"
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              devId={stat.devId}
              devName={`${stat.label} Stat Card`}
              devDescription={`Statistical card showing ${stat.label}: ${stat.value}`}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
            >
              <CardContent devId="stat-card-content" className="p-0">
                <Div devId="stat-value" className="text-2xl font-bold text-white mb-2">{stat.value}</Div>
                <Div devId="stat-label" className="text-gray-400">{stat.label}</Div>
              </CardContent>
            </Card>
          ))}
        </Div>
      </Section>
    </Container>
  );
};

