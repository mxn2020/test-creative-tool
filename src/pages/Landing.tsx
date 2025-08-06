import React from 'react';
import { Container, Div } from '../lib/dev-container';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Stats } from '@/components/landing/Stats';
import { Testimonials } from '@/components/landing/Testimonials';
import { CTA } from '@/components/landing/CTA';
import { FAQ } from '@/components/landing/FAQ';

export const Landing: React.FC = () => {
  return (
    <Container componentId="landing-page-root">
      <Div
        devId="landing-main-wrapper"
        className="min-h-screen bg-gray-50 flex flex-col"
      >
        {/* Hero Section */}
        <Hero />

        {/* Stats Section */}
        <Stats />

        {/* Features Section */}
        <Features />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Call To Action Section */}
        <CTA />

        {/* FAQ Section */}
        <FAQ />
      </Div>
    </Container>
  );
};

export default Landing;