// src/lib/dev-container/shadcn/Progress.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Progress as ShadcnProgress } from '../../../components/ui/progress';

// Progress component
type ShadcnProgressProps = React.ComponentPropsWithoutRef<typeof ShadcnProgress>;
type DevProgressProps = ShadcnProgressProps & DevProps;

export const Progress = React.forwardRef<
  React.ElementRef<typeof ShadcnProgress>,
  DevProgressProps
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
    return <ShadcnProgress ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-progress"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnProgress ref={ref} {...props} />
    </Container>
  );
});

Progress.displayName = 'DevProgress';

