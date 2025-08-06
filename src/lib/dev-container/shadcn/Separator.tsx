// src/lib/dev-container/shadcn/Separator.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Separator as ShadcnSeparator } from '../../../components/ui/separator';

// Separator component
type ShadcnSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnSeparator>;
type DevSeparatorProps = ShadcnSeparatorProps & DevProps;

export const Separator = React.forwardRef<
  React.ElementRef<typeof ShadcnSeparator>,
  DevSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
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
    return <ShadcnSeparator ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId='dev-separator'
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSeparator ref={ref} {...props} />
    </Container>
  );
});

Separator.displayName = 'DevSeparator';

// Export prop types
export {
  type DevSeparatorProps,
};