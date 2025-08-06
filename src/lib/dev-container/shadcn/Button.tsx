// src/lib/dev-container/shadcn/Button.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';
import { Button as ShadcnButton, buttonVariants } from '../../../components/ui/button';

type ShadcnButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnButton>;
type DevButtonProps = ShadcnButtonProps & DevProps & { children?: React.ReactNode };

export const Button = React.forwardRef<
  React.ElementRef<typeof ShadcnButton>,
  DevButtonProps
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
      <ShadcnButton ref={ref} {...props}>
        {children}
      </ShadcnButton>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId='dev-button' // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnButton ref={ref} {...props}>
        {children}
      </ShadcnButton>
    </Container>
  );
});

Button.displayName = 'DevButton';

// Export buttonVariants for convenience
export { buttonVariants };