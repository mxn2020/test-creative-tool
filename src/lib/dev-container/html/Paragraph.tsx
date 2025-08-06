// src/lib/dev-container/geenius/Paragraph.tsx
 
import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

interface DevParagraphProps extends React.HTMLAttributes<HTMLParagraphElement>, DevProps {
  children?: React.ReactNode;
}

export const P = React.forwardRef<HTMLParagraphElement, DevParagraphProps>(
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
        <p ref={ref} {...props}>
          {children}
        </p>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-paragraph' // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <p ref={ref} {...props}>
          {children}
        </p>
      </Container>
    );
  }
);

P.displayName = 'DevParagraph';

export { type DevParagraphProps };