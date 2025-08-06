import React from 'react';
import { Container, Div, H2, P } from '@/lib/dev-container';
import { CheckCircle, LightningBolt, ChartBar } from 'lucide-react';

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    title: 'Collaboration',
    description: 'Real‑time chat, file sharing, and task management for teams of any size.',
    icon: CheckCircle,
  },
  {
    title: 'Automation',
    description: 'Smart workflows that automate repetitive tasks and boost productivity.',
    icon: LightningBolt,
  },
  {
    title: 'Analytics',
    description: 'Deep insights and dashboards to track performance and make data‑driven decisions.',
    icon: ChartBar,
  },
];

const Features: React.FC = () => {
  return (
    <Container componentId="landing-features" className="py-16 bg-white">
      <Div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <Div
              key={feat.title}
              className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              <Icon className="h-12 w-12 text-purple-600 mb-4" />
              <H2 className="text-xl font-semibold mb-2">{feat.title}</H2>
              <P className="text-gray-600">{feat.description}</P>
            </Div>
          );
        })}
      </Div>
    </Container>
  );
};

export default Features;