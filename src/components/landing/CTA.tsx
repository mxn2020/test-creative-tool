import React from 'react';
import { Container, Div, H2, P, Button } from '@/lib/dev-container';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CTA: React.FC = () => {
  return (
    <Container componentId="landing-cta">
      <Div
        devId="cta-section"
        className="py-20 bg-indigo-600 text-white text-center"
      >
        <H2 devId="cta-heading" className="text-3xl font-bold">
          Ready to Transform Your Business?
        </H2>
        <P devId="cta-subtitle" className="mt-4 text-lg">
          Join thousands of satisfied customers and start your free trial today.
        </P>
        <Button
          devId="cta-button"
          className={cn('mt-8 bg-white text-indigo-600 hover:bg-gray-100 font-medium flex items-center justify-center w-64 mx-auto')}
          onClick={() => window.location.href = '/register'}
        >
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Div>
    </Container>
  );
};

export default CTA;