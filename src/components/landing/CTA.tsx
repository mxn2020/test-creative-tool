import React from 'react';
import { Container, Div, H2, P } from '@/lib/dev-container';
import { Button } from '@/components/ui/button';

export const LandingCTA: React.FC = () => {
  return (
    <Container componentId="landing-cta-section">
      <Div
        devId="cta-section"
        className="py-24 bg-purple-600 text-center text-white"
      >
        <H2 devId="cta-heading" className="text-4xl font-bold mb-4">
          Ready to Transform Your Workflow?
        </H2>
        <P devId="cta-subtitle" className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of businesses who trust our platform to grow faster and work smarter.
        </P>
        <Button
          devId="cta-button"
          className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
          onClick={() => {
            const el = document.getElementById('landing-hero-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Start Your Free Trial
        </Button>
      </Div>
    </Container>
  );
};

export default LandingCTA;