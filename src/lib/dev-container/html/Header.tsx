// src/lib/dev-container/geenius/Header.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

interface DevHeaderProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Header = React.forwardRef<HTMLElement, DevHeaderProps>(
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
    if (devId === "noID" || !shouldContainerize) {
      return (
        <header ref={ref} {...props}>
          {children}
        </header>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-header" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <header ref={ref} {...props}>
          {children}
        </header>
      </Container>
    );
  }
);

Header.displayName = 'DevHeader';

export { type DevHeaderProps };