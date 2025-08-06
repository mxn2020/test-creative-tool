import React from 'react';
import { Container, Div, H1, P, Button } from '@/lib/dev-container';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <Container componentId="landing-hero" className="bg-gray-50 py-20">
      <Div className="max-w-4xl mx-auto text-center px-4">
        <H1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Empower Your Business with Seamless Solutions
        </H1>
        <P className="text-lg text-gray-600 mb-8">
          A modern platform that brings your team together, streamlines workflows, and drives growth.
        </P>
        <Button
          devId="hero-cta-button"
          className="bg-purple-600 text-white hover:bg-purple-700 transition-colors inline-flex items-center mx-auto"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Div>
    </Container>
  );
};

export default Hero;