// src/components/landing/LandingTechStack.tsx

import React from 'react';
import { Container, Badge, Section, H2, P, Div } from '@/lib/dev-container';

const techStack = [
  { letterDevId: 'tech-letter-0', badgeDevId: 'tech-badge-0', name: "Vite", color: "from-yellow-400 to-orange-500" },
  { letterDevId: 'tech-letter-1', badgeDevId: 'tech-badge-1', name: "React", color: "from-blue-400 to-cyan-400" },
  { letterDevId: 'tech-letter-2', badgeDevId: 'tech-badge-2', name: "TypeScript", color: "from-blue-500 to-blue-600" },
  { letterDevId: 'tech-letter-3', badgeDevId: 'tech-badge-3', name: "MongoDB", color: "from-green-400 to-green-500" },
  { letterDevId: 'tech-letter-4', badgeDevId: 'tech-badge-4', name: "Prisma", color: "from-purple-400 to-purple-500" },
  { letterDevId: 'tech-letter-5', badgeDevId: 'tech-badge-5', name: "Tailwind", color: "from-teal-400 to-teal-500" }
];  


export const LandingTechStack: React.FC = () => {
  return (
    <Container componentId="tech-stack-section">
      <Section devId="tech-stack-content" className="container mx-auto px-4 py-20">
        <Div devId="tech-stack-header" className="text-center mb-16">
          <H2 devId="tech-stack-title" className="text-4xl font-bold text-white mb-4">Modern Tech Stack</H2>
          <P devId="tech-stack-subtitle" className="text-gray-300 max-w-2xl mx-auto">
            Built with the most popular and reliable technologies
          </P>
        </Div>
        <Div devId="tech-stack-grid" className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {techStack.map((tech, index) => (
            <Div key={index} devId="tech-item-wrapper" className="text-center">
              <Div devId={tech.letterDevId} className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{tech.name[0]}</span>
              </Div>
              <Badge
                devId={tech.badgeDevId}
                devName={`${tech.name} Technology Badge`}
                devDescription={`Technology badge for ${tech.name}`}
                className="text-gray-300 font-medium bg-transparent border-none"
              >
                {tech.name}
              </Badge>
            </Div>
          ))}
        </Div>
      </Section>
    </Container>
  );
};