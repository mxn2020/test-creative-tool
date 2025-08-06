// src/lib/dev-container/shadcn/Card.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardFooter as ShadcnCardFooter,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent
} from '../../../components/ui/card';

type ShadcnCardProps = React.ComponentPropsWithoutRef<typeof ShadcnCard>;
type ShadcnCardHeaderProps = React.ComponentPropsWithoutRef<typeof ShadcnCardHeader>;
type ShadcnCardFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnCardFooter>;
type ShadcnCardTitleProps = React.ComponentPropsWithoutRef<typeof ShadcnCardTitle>;
type ShadcnCardDescriptionProps = React.ComponentPropsWithoutRef<typeof ShadcnCardDescription>;
type ShadcnCardContentProps = React.ComponentPropsWithoutRef<typeof ShadcnCardContent>;

type DevCardProps = ShadcnCardProps & DevProps & { children?: React.ReactNode };
type DevCardHeaderProps = ShadcnCardHeaderProps & DevProps & { children?: React.ReactNode };
type DevCardFooterProps = ShadcnCardFooterProps & DevProps & { children?: React.ReactNode };
type DevCardTitleProps = ShadcnCardTitleProps & DevProps & { children?: React.ReactNode };
type DevCardDescriptionProps = ShadcnCardDescriptionProps & DevProps & { children?: React.ReactNode };
type DevCardContentProps = ShadcnCardContentProps & DevProps & { children?: React.ReactNode };

export const Card = React.forwardRef<
  React.ElementRef<typeof ShadcnCard>,
  DevCardProps
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
      <ShadcnCard ref={ref} {...props}>
        {children}
      </ShadcnCard>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-card" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCard ref={ref} {...props}>
        {children}
      </ShadcnCard>
    </Container>
  );
});

Card.displayName = 'DevCard';

export const CardHeader = React.forwardRef<
  React.ElementRef<typeof ShadcnCardHeader>,
  DevCardHeaderProps
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
      <ShadcnCardHeader ref={ref} {...props}>
        {children}
      </ShadcnCardHeader>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-card-header" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCardHeader ref={ref} {...props}>
        {children}
      </ShadcnCardHeader>
    </Container>
  );
});

CardHeader.displayName = 'DevCardHeader';

export const CardFooter = React.forwardRef<
  React.ElementRef<typeof ShadcnCardFooter>,
  DevCardFooterProps
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
      <ShadcnCardFooter ref={ref} {...props}>
        {children}
      </ShadcnCardFooter>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-card-footer" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCardFooter ref={ref} {...props}>
        {children}
      </ShadcnCardFooter>
    </Container>
  );
});

CardFooter.displayName = 'DevCardFooter';

export const CardTitle = React.forwardRef<
  React.ElementRef<typeof ShadcnCardTitle>,
  DevCardTitleProps
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
      <ShadcnCardTitle ref={ref} {...props}>
        {children}
      </ShadcnCardTitle>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-card-title" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCardTitle ref={ref} {...props}>
        {children}
      </ShadcnCardTitle>
    </Container>
  );
});

CardTitle.displayName = 'DevCardTitle';

export const CardDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnCardDescription>,
  DevCardDescriptionProps
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
      <ShadcnCardDescription ref={ref} {...props}>
        {children}
      </ShadcnCardDescription>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-card-description" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCardDescription ref={ref} {...props}>
        {children}
      </ShadcnCardDescription>
    </Container>
  );
});

CardDescription.displayName = 'DevCardDescription';

export const CardContent = React.forwardRef<
  React.ElementRef<typeof ShadcnCardContent>,
  DevCardContentProps
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
      <ShadcnCardContent ref={ref} {...props}>
        {children}
      </ShadcnCardContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-card-content" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCardContent ref={ref} {...props}>
        {children}
      </ShadcnCardContent>
    </Container>
  );
});

CardContent.displayName = 'DevCardContent';

// Export types
export { 
  type DevCardProps, 
  type DevCardHeaderProps, 
  type DevCardFooterProps, 
  type DevCardTitleProps, 
  type DevCardDescriptionProps, 
  type DevCardContentProps 
};