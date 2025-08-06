import React from 'react';
import { Container, Div, H2, P } from '@/lib/dev-container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Graph } from 'lucide-react';

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: CheckCircle,
    title: 'All‑In‑One Management',
    description: 'Handle clients, appointments, and analytics from a single dashboard.',
  },
  {
    icon: Clock,
    title: 'Smart Scheduling',
    description: 'Automated reminders, conflict detection, and time‑zone aware bookings.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Roles, permissions, and activity logs for seamless teamwork.',
  },
  {
    icon: Graph,
    title: 'Data‑Driven Insights',
    description: 'Real‑time stats and reports to fuel growth decisions.',
  },
];

export const LandingFeatures: React.FC = () => {
  return (
    <Container componentId="landing-features">
      <Div devId="features-section" className="py-16 px-4 bg-white">
        <H2 devId="features-heading" className="text-3xl font-bold text-center mb-8">
          Features
        </H2>
        <Div devId="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <Card key={idx} className="flex flex-col items-start p-6">
              <CardHeader className="flex items-center gap-2">
                <feat.icon className="h-6 w-6 text-purple-600" />
                <CardTitle className="text-lg font-medium">{feat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <P className="text-gray-600">{feat.description}</P>
              </CardContent>
            </Card>
          ))}
        </Div>
      </Div>
    </Container>
  );
};

export default LandingFeatures;