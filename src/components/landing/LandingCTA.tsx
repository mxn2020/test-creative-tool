// src/components/landing/LandingCTA.tsx

import React from 'react';
import { Star, Users } from 'lucide-react';
import { Container, Button, Section, H2, P, Div } from '@/lib/dev-container';

export const LandingCTA: React.FC = () => {
  return (
    <Container componentId="cta-section">
      <Section devId="cta-content" className="container mx-auto px-4 py-20">
        <Div devId="cta-container" className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-12 text-center border border-purple-500/30">
          <H2 devId="cta-title" className="text-4xl font-bold text-white mb-4">Ready to Build Something Amazing?</H2>
          <P devId="cta-subtitle" className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get started with this template and build your next project with confidence
          </P>
          <Div devId="cta-buttons" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              devId="cta-start-project"
              devName="Start Project Button"
              devDescription="Primary CTA button to start a new project"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Start Project
              </span>
            </Button>
            <Button 
              devId="cta-join-community"
              devName="Join Community Button"
              devDescription="Secondary CTA button to join the community"
              variant="outline"
              className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Join Community
              </span>
            </Button>
          </Div>
        </Div>
      </Section>
    </Container>
  );
};