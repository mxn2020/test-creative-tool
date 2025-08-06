// src/lib/dev-container/geenius/Span.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

interface DevSpanProps extends React.HTMLAttributes<HTMLSpanElement>, DevProps {
  children?: React.ReactNode;
}

export const Span = React.forwardRef<HTMLSpanElement, DevSpanProps>(
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
        <span ref={ref} {...props}>
          {children}
        </span>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-span" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <span ref={ref} {...props}>
          {children}
        </span>
      </Container>
    );
  }
);

Span.displayName = 'DevSpan';

export { type DevSpanProps };