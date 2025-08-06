// src/components/landing/LandingHeader.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Code, User } from 'lucide-react';
import { Button, Header, Nav, Div, Span } from '@/lib/dev-container';
import { useAuth } from '@/components/auth/AuthProvider';

export const LandingHeader: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Header 
      devId="main-header" 
      devName="Main Header" 
      devDescription="Primary site header with navigation"
      className="container mx-auto px-4 py-6"
    >
      <Nav 
        devId="main-nav" 
        devName="Main Navigation" 
        devDescription="Primary navigation bar"
        className="flex items-center justify-between"
      >
        <Div 
          devId="logo-section" 
          devName="Logo Section" 
          devDescription="Company logo and brand name"
          className="flex items-center space-x-2"
        >
          <Div devId="landing-logo-icon" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </Div>
          <Span 
            devId="brand-name" 
            devName="Brand Name" 
            devDescription="Geenius Template brand name"
            className="text-xl font-bold text-white"
          >
            Geenius Template
          </Span>
        </Div>
        <Div 
          devId="nav-actions" 
          devName="Navigation Actions" 
          devDescription="Navigation buttons and user menu"
          className="flex items-center space-x-4"
        >
          <Button 
            devId="docs-button" 
            devName="Docs Button" 
            devDescription="Link to documentation"
            variant="ghost" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            Docs
          </Button>
          {isAuthenticated ? (
            <Div 
              devId="user-section" 
              devName="User Section" 
              devDescription="Authenticated user welcome area"
              className="flex items-center space-x-4"
            >
              <Span 
                devId="welcome-message" 
                devName="Welcome Message" 
                devDescription="Welcome message for authenticated user"
                className="text-gray-300"
              >
                Welcome, {user?.name?.split(' ')[0]}!
              </Span>
              <Link to="/dashboard">
                <Button 
                  devId="nav-dashboard-button"
                  devName="Navigation Dashboard Button"
                  devDescription="Dashboard button in navigation header for authenticated users"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </Div>
          ) : (
            <Div 
              devId="auth-buttons" 
              devName="Authentication Buttons" 
              devDescription="Login and register buttons for unauthenticated users"
              className="flex items-center space-x-2"
            >
              <Link to="/login">
                <Button 
                  devId="nav-login-button"
                  devName="Navigation Login Button"
                  devDescription="Login button in navigation header"
                  variant="ghost" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  devId="nav-register-button"
                  devName="Navigation Register Button"
                  devDescription="Get started button in navigation header"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Get Started
                </Button>
              </Link>
            </Div>
          )}
        </Div>
      </Nav>
    </Header>
  );
};