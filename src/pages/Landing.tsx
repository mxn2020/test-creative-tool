import React, { useState, useEffect } from 'react';
import { Container, Div } from '../lib/dev-container';
import { LandingHero } from '@/components/landing/Hero';
import { LandingStats } from '@/components/landing/Stats';
import { LandingFeatures } from '@/components/landing/Features';
import { LandingTestimonials } from '@/components/landing/Testimonials';
import { LandingCTA } from '@/components/landing/CTA';
import { LandingFAQ } from '@/components/landing/FAQ';

export const Landing: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container componentId="landing-page-root">
      <Div
        devId="landing-main-wrapper"
        devName="Landing Main Wrapper"
        devDescription="Main wrapper with gradient background"
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
      >
        <LandingHero mounted={mounted} />
        <LandingStats />
        <LandingFeatures />
        <LandingTestimonials />
        <LandingCTA />
        <LandingFAQ />
      </Div>
    </Container>
  );
};

export default Landing;