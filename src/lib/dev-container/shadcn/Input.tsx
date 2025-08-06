// src/lib/dev-container/shadcn/Input.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Input as ShadcnInput } from '../../../components/ui/input';

// Input component
type ShadcnInputProps = React.ComponentPropsWithoutRef<typeof ShadcnInput>;
type DevInputProps = ShadcnInputProps & DevProps;

export const Input = React.forwardRef<
  React.ElementRef<typeof ShadcnInput>,
  DevInputProps
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
  if (devId === "noID" || !shouldContainerize) {
    return <ShadcnInput ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-input"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnInput ref={ref} {...props} />
    </Container>
  );
});

Input.displayName = 'DevInput';

// Export types
export { type DevInputProps };

