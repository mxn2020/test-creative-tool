// src/components/auth/Logo.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';
import { Container, Div, Span } from '@/lib/dev-container';

interface LogoProps {
  logoIconId?: string;
}

export const Logo: React.FC<LogoProps> = ({ logoIconId = 'login-page-logo-icon' }) => {
  return (
    <Container componentId="logo-component" className="flex justify-center">
      <Link to="/" className="group inline-block">
        <Div 
          devId="logo-section" 
          devName="Logo Section" 
          devDescription="Company logo and brand name"
          className="flex items-center space-x-3 transition-transform group-hover:scale-105"
        >
          <Div devId={logoIconId} className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <Code className="w-6 h-6 text-white" />
          </Div>
          <Span 
            devId="brand-name" 
            devName="Brand Name" 
            devDescription="Geenius Template brand name"
            className="text-2xl font-bold text-gray-900"
          >
            Geenius Template
          </Span>
        </Div>
      </Link>
    </Container>
  );
};