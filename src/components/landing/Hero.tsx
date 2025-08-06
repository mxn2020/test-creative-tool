import React from 'react';
import { Container, Div, H1, P, Button } from '@/lib/dev-container';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <Container componentId="landing-hero">
      <Div
        devId="hero-wrapper"
        className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-500 text-white py-20 px-6 md:px-12 lg:px-24 flex flex-col items-center text-center"
      >
        <H1 devId="hero-title" className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
          Empower Your Business with Seamless Solutions
        </H1>
        <P devId="hero-subtitle" className="mt-4 text-lg md:text-xl max-w-2xl">
          A fully integrated platform that connects your teams, data, and customers—all in one place.
        </P>
        <Button
          devId="hero-cta-button"
          className={cn('mt-8 bg-white text-indigo-600 hover:bg-gray-100 font-medium flex items-center')}
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
        >
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Div>
    </Container>
  );
};

export default Hero;