// src/lib/dev-container/components/DevModeApp.tsx

import React from 'react';
import { DevModeProvider, DevModeFloatingIcon } from './DevModeProvider';
import { GeeniusSidebar } from './GeeniusSidebar';
import { ComponentSystem } from '../types';

interface DevModeAppProps {
  children: React.ReactNode;
  system: ComponentSystem; // Changed from registry
}

export const DevModeApp: React.FC<DevModeAppProps> = ({ children, system }) => {
  return (
    <DevModeProvider system={system}>
      <div className="min-h-screen relative">
        {children}
        <DevModeFloatingIcon />
        <GeeniusSidebar />
      </div>
    </DevModeProvider>
  );
};

export default DevModeApp;