import React from 'react';
import { Container, Div } from '../lib/dev-container';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Stats from '@/components/landing/Stats';
import Testimonials from '@/components/landing/Testimonials';
import CTA from '@/components/landing/CTA';
import FAQ from '@/components/landing/FAQ';

export const Landing: React.FC = () => {
  return (
    <Container componentId="landing-page-root">
      <Div className="min-h-screen bg-white text-gray-900">
        <Hero />
        <Stats />
        <Features />
        <Testimonials />
        <CTA />
        <FAQ />
      </Div>
    </Container>
  );
};

export default Landing;