// src/pages/Landing.tsx

import React, { useState, useEffect } from 'react';
import { Container, Div } from '../lib/dev-container';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingStats } from '@/components/landing/LandingStats';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingTechStack } from '@/components/landing/LandingTechStack';
import { LandingCTA } from '@/components/landing/LandingCTA';
import { LandingFooter } from '@/components/landing/LandingFooter';

export const Landing: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container componentId="landing-page-root">
      <Div 
        devId="main-wrapper" 
        devName="Main Wrapper" 
        devDescription="Main page wrapper with gradient background"
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      >
        {/* Header */}
        <LandingHeader />

        {/* Hero Section */}
        <LandingHero mounted={mounted} />

        {/* Stats Section */}
        <LandingStats />

        {/* Features Section */}
        <LandingFeatures />

        {/* Tech Stack Section */}
        <LandingTechStack />

        {/* CTA Section */}
        <LandingCTA />

        {/* Footer */}
        <LandingFooter />
      </Div>
    </Container>
  );
};