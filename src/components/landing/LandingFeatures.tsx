// src/components/landing/LandingFeatures.tsx

import React from 'react';
import { Zap, Database, Code, Globe } from 'lucide-react';
import { Container, Card, CardContent, Section, H2, P, Div } from '@/lib/dev-container';

const features = [
  {
    cardDevId: 'feature-card-0',
    cardContentDevId: 'feature-card-content-0',
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    title: "Lightning Fast",
    description: "Built with Vite for instant hot module replacement and blazing fast builds"
  },
  {
    cardDevId: 'feature-card-1',
    cardContentDevId: 'feature-card-content-1',
    icon: <Database className="w-8 h-8 text-green-500" />,
    title: "MongoDB + Prisma",
    description: "Type-safe database access with MongoDB flexibility and Prisma's developer experience"
  },
  {
    cardDevId: 'feature-card-2',
    cardContentDevId: 'feature-card-content-2',
    icon: <Code className="w-8 h-8 text-blue-500" />,
    title: "TypeScript Ready",
    description: "Full TypeScript support with strict type checking and IntelliSense"
  },
  {
    cardDevId: 'feature-card-3',
    cardContentDevId: 'feature-card-content-3',
    icon: <Globe className="w-8 h-8 text-purple-500" />,
    title: "Deploy Anywhere",
    description: "Ready for Netlify, Vercel, or any modern hosting platform"
  }
];

export const LandingFeatures: React.FC = () => {
  return (
    <Container componentId="features-section">
      <Section devId="features-content" className="container mx-auto px-4 py-20">
        <Div devId="features-header" className="text-center mb-16">
          <H2 devId="features-title" className="text-4xl font-bold text-white mb-4">Why Choose This Template?</H2>
          <P devId="features-subtitle" className="text-gray-300 max-w-2xl mx-auto">
            Everything you need to build modern web applications with the latest technologies
          </P>
        </Div>
        <Div devId="features-grid" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              devId={feature.cardDevId}
              devName={`${feature.title} Feature Card`}
              devDescription={`Feature card highlighting ${feature.title}: ${feature.description}`}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all"
            >
              <CardContent 
                devId={feature.cardContentDevId}
                className="p-0"
              >
                <Div devId="feature-icon-wrapper" className="mb-4">{feature.icon}</Div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <P devId="feature-description" className="text-gray-400">{feature.description}</P>
              </CardContent>
            </Card>
          ))}
        </Div>
      </Section>
    </Container>
  );
};

