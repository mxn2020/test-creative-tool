import React from 'react';
import { Container, Div, H2, Button } from '@/lib/dev-container';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <Container componentId="landing-cta" className="bg-purple-600 py-20">
      <Div className="max-w-3xl mx-auto text-center px-4">
        <H2 className="text-3xl font-bold text-white mb-4">
          Ready to Transform Your Workflow?
        </H2>
        <Button
          devId="cta-primary-button"
          className="bg-white text-purple-600 hover:bg-gray-100 font-medium inline-flex items-center mx-auto"
        >
          Start Your Free Trial
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Div>
    </Container>
  );
};

export default CTA;