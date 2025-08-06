// src/lib/dev-container/shadcn/Label.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Label as ShadcnLabel } from '../../../components/ui/label';

// Label component
type ShadcnLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnLabel>;
type DevLabelProps = ShadcnLabelProps & DevProps & { children?: React.ReactNode };

export const Label = React.forwardRef<
  React.ElementRef<typeof ShadcnLabel>,
  DevLabelProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
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
      <ShadcnLabel ref={ref} {...props}>
        {children}
      </ShadcnLabel>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-label"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnLabel ref={ref} {...props}>
        {children}
      </ShadcnLabel>
    </Container>
  );
});

Label.displayName = 'DevLabel';

// Export types
export { type DevLabelProps };