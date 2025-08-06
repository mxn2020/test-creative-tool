// src/lib/dev-container/shadcn/Toaster.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Toaster as ShadcnToaster } from '../../../components/ui/sonner';

// Toaster component
type ShadcnToasterProps = React.ComponentPropsWithoutRef<typeof ShadcnToaster>;
type DevToasterProps = ShadcnToasterProps & DevProps;

export const Toaster = ({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }: DevToasterProps) => {
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
    return <ShadcnToaster {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-toaster"
            {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnToaster {...props} />
    </Container>
  );
};

Toaster.displayName = 'DevToaster';

export { type DevToasterProps };