// src/lib/dev-container/shadcn/Toggle.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Toggle as ShadcnToggle, toggleVariants } from '../../../components/ui/toggle';

// Toggle component
type ShadcnToggleProps = React.ComponentPropsWithoutRef<typeof ShadcnToggle>;
type DevToggleProps = ShadcnToggleProps & DevProps & { children?: React.ReactNode };

export const Toggle = React.forwardRef<
  React.ElementRef<typeof ShadcnToggle>,
  DevToggleProps
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
      <ShadcnToggle ref={ref} {...props}>
        {children}
      </ShadcnToggle>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-toggle"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnToggle ref={ref} {...props}>
        {children}
      </ShadcnToggle>
    </Container>
  );
});

Toggle.displayName = 'DevToggle';

// Export the toggle variants utility
export { toggleVariants };

export { type DevToggleProps };