// src/lib/dev-container/shadcn/HoverCard.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  HoverCard as ShadcnHoverCard,
  HoverCardTrigger as ShadcnHoverCardTrigger,
  HoverCardContent as ShadcnHoverCardContent,
} from '../../../components/ui/hover-card';

// HoverCard root component
type ShadcnHoverCardProps = React.ComponentPropsWithoutRef<typeof ShadcnHoverCard>;
type DevHoverCardProps = ShadcnHoverCardProps & DevProps & { children?: React.ReactNode };

export const HoverCard = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevHoverCardProps) => {
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
      <ShadcnHoverCard {...props}>
        {children}
      </ShadcnHoverCard>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-hover-card"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnHoverCard {...props}>
        {children}
      </ShadcnHoverCard>
    </Container>
  );
};

HoverCard.displayName = 'DevHoverCard';

// HoverCardTrigger component
type ShadcnHoverCardTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnHoverCardTrigger>;
type DevHoverCardTriggerProps = ShadcnHoverCardTriggerProps & DevProps & { children?: React.ReactNode };

export const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnHoverCardTrigger>,
  DevHoverCardTriggerProps
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
      <ShadcnHoverCardTrigger ref={ref} {...props}>
        {children}
      </ShadcnHoverCardTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-hover-card-trigger"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnHoverCardTrigger ref={ref} {...props}>
        {children}
      </ShadcnHoverCardTrigger>
    </Container>
  );
});

HoverCardTrigger.displayName = 'DevHoverCardTrigger';

// HoverCardContent component
type ShadcnHoverCardContentProps = React.ComponentPropsWithoutRef<typeof ShadcnHoverCardContent>;
type DevHoverCardContentProps = ShadcnHoverCardContentProps & DevProps & { children?: React.ReactNode };

export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof ShadcnHoverCardContent>,
  DevHoverCardContentProps
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
      <ShadcnHoverCardContent ref={ref} {...props}>
        {children}
      </ShadcnHoverCardContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-hover-card-content"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnHoverCardContent ref={ref} {...props}>
        {children}
      </ShadcnHoverCardContent>
    </Container>
  );
});

HoverCardContent.displayName = 'DevHoverCardContent';

// Export types
export { 
  type DevHoverCardProps,
  type DevHoverCardTriggerProps,
  type DevHoverCardContentProps
};

