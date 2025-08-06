// src/lib/dev-container/shadcn/Badge.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';
import { Badge as ShadcnBadge } from '../../../components/ui/badge';

type ShadcnBadgeProps = React.ComponentPropsWithoutRef<typeof ShadcnBadge>;
type DevBadgeProps = ShadcnBadgeProps & DevProps & { children?: React.ReactNode };

export const Badge = React.forwardRef<
  HTMLDivElement,
  DevBadgeProps
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
      <div ref={ref}>
        <ShadcnBadge {...props}>
          {children}
        </ShadcnBadge>
      </div>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-badge"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <div ref={ref}>
        <ShadcnBadge {...props}>
          {children}
        </ShadcnBadge>
      </div>
    </Container>
  );
});

Badge.displayName = 'DevBadge';