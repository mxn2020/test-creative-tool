// src/lib/dev-container/shadcn/Skeleton.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Skeleton as ShadcnSkeleton } from '../../../components/ui/skeleton';

// Skeleton component
type ShadcnSkeletonProps = React.ComponentPropsWithoutRef<typeof ShadcnSkeleton>;
type DevSkeletonProps = ShadcnSkeletonProps & DevProps;

export const Skeleton = ({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }: DevSkeletonProps) => {
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
    return <ShadcnSkeleton {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-skeleton"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSkeleton {...props} />
    </Container>
  );
};

Skeleton.displayName = 'DevSkeleton';

export { type DevSkeletonProps };