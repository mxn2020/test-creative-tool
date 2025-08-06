import React from 'react';
import { Button } from '@/components/ui/button';
import { Container, Div, H1, P } from '@/lib/dev-container';

export const LandingHero: React.FC<{ mounted?: boolean }> = ({ mounted = false }) => {
  return (
    <Container componentId="landing-hero">
      <Div
        devId="hero-content"
        className="flex flex-col items-center justify-center py-20 px-4 text-center"
      >
        <H1 devId="hero-title" className="text-5xl font-extrabold md:text-6xl lg:text-7xl">
          Empower Your Business with Our Platform
        </H1>
        <P devId="hero-subtitle" className="mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl">
          Seamlessly manage clients, appointments, and growth. All in one intuitive, secure solution.
        </P>
        <Button
          devId="hero-cta-button"
          className="mt-8 px-8 py-4 text-base font-semibold"
          onClick={() => {
            const element = document.getElementById('landing-cta-section');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Get Started Free
        </Button>
      </Div>
    </Container>
  );
};

export default LandingHero;