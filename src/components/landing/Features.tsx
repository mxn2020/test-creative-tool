import React from 'react';
import { Container, Div, H2, Card, CardHeader, CardBody, CardTitle, CardDescription } from '@/lib/dev-container';
import { CheckCircle, BarChart2, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-indigo-600" />,
    title: 'Reliable Performance',
    description: 'Lightning‑fast load times and 99.9% uptime guaranteed.',
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-indigo-600" />,
    title: 'Analytics Dashboard',
    description: 'Deep insights with real‑time metrics and custom reports.',
  },
  {
    icon: <Users className="h-6 w-6 text-indigo-600" />,
    title: 'Team Collaboration',
    description: 'Shared workspaces, role‑based access, and activity streams.',
  },
  {
    icon: <Shield className="h-6 w-6 text-indigo-600" />,
    title: 'Enterprise Security',
    description: 'Built‑in audits, 2FA, and granular permission controls.',
  },
];

export const Features: React.FC = () => {
  return (
    <Container componentId="landing-features">
      <Div devId="features-section" className="py-16 bg-white">
        <H2 devId="features-heading" className="text-3xl font-bold text-center mb-12">
          Core Features
        </H2>
        <Div devId="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {features.map((feat, idx) => (
            <Card key={idx} className="flex flex-col items-center p-6 text-center">
              <Div className="mb-4">{feat.icon}</Div>
              <CardTitle className="text-xl font-semibold">{feat.title}</CardTitle>
              <CardDescription className="mt-2 text-gray-600">{feat.description}</CardDescription>
            </Card>
          ))}
        </Div>
      </Div>
    </Container>
  );
};

export default Features;