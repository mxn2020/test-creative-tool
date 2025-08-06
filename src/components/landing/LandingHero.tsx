// src/components/landing/LandingHero.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Section, Span, H1, P, Div } from '@/lib/dev-container';
import { useAuth } from '@/components/auth/AuthProvider';

interface LandingHeroProps {
  mounted: boolean;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ mounted }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Container componentId="hero-section">
      <Section 
        devId="hero-content" 
        devName="Hero Content" 
        devDescription="Main hero Section with title and call-to-action"
        className="container mx-auto px-4 py-20 text-center"
      >
        <Div 
          devId="hero-content-wrapper" 
          devName="Hero Content Wrapper" 
          devDescription="Animated wrapper for hero content"
          className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <H1 
            devId="hero-title" 
            devName="Hero Title" 
            devDescription="Main hero title showcasing the tech stack"
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Vite + React + 
            <Span 
              devId="mongodb-highlight" 
              devName="MongoDB Highlight" 
              devDescription="Highlighted MongoDB text in gradient"
              className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {' '}MongoDB
            </Span>
          </H1>
          <P 
            devId="hero-description" 
            devName="Hero Description" 
            devDescription="Hero Section description explaining the template benefits"
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Modern full-stack template with lightning-fast development, type-safe database access, 
            and production-ready deployment configuration.
          </P>
          <Div 
            devId="hero-cta-buttons" 
            devName="Hero CTA Buttons" 
            devDescription="Call-to-action buttons in hero Section"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button 
                  devId="hero-start-building"
                  devName="Start Building Button"
                  devDescription="Primary call-to-action button for starting to build with the template"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button 
                  devId="hero-start-building"
                  devName="Start Building Button"
                  devDescription="Primary call-to-action button for starting to build with the template"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Start Building
                </Button>
              </Link>
            )}
            <Button 
              devId="hero-github-button"
              devName="View on GitHub Button"
              devDescription="Secondary button to view the project on GitHub"
              variant="outline"
              className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              View on GitHub
            </Button>
          </Div>
        </Div>
      </Section>
    </Container>
  );
};