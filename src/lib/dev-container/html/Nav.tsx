// src/lib/dev-container/geenius/Nav.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

interface DevNavProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Nav = React.forwardRef<HTMLElement, DevNavProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    // If no devId provided, throw build error
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    // If no devId provided or explicitly set to "noID", don't containerize
    if (!devId || devId === "noID" || !shouldContainerize) {
      return (
        <nav ref={ref} {...props}>
          {children}
        </nav>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-nav' // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <nav ref={ref} {...props}>
          {children}
        </nav>
      </Container>
    );
  }
);

Nav.displayName = 'DevNav';

export { type DevNavProps };