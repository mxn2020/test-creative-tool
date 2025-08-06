// src/components/landing/LandingFooter.tsx

import React from 'react';
import { Footer, Div } from '@/lib/dev-container';

export const LandingFooter: React.FC = () => {
  return (
    <Footer 
      devId="main-footer" 
      devName="Main Footer" 
      devDescription="Site footer with links and copyright"
      className="container mx-auto px-4 py-8 border-t border-white/10"
    >
      <Div devId="footer-content" className="flex flex-col md:flex-row justify-between items-center">
        <Div devId="footer-copyright" className="text-gray-400 mb-4 md:mb-0">
          © 2024 Geenius Template. Built with ❤️ for Geenius.io users.
        </Div>
        <Div devId="footer-links" className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
        </Div>
      </Div>
    </Footer>
  );
};