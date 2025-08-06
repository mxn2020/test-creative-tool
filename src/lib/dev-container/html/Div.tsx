// src/lib/dev-container/geenius/Div.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

interface DevDivProps extends React.HTMLAttributes<HTMLDivElement>, DevProps {
  children?: React.ReactNode;
}

export const Div = React.forwardRef<HTMLDivElement, DevDivProps>(
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
        <div ref={ref} {...props}>
          {children}
        </div>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-div' // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <div ref={ref} {...props}>
          {children}
        </div>
      </Container>
    );
  }
);

Div.displayName = 'DevDiv';

export { type DevDivProps };

