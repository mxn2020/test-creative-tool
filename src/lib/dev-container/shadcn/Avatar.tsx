// src/lib/dev-container/shadcn/Avatar.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Avatar as ShadcnAvatar,
  AvatarImage as ShadcnAvatarImage,
  AvatarFallback as ShadcnAvatarFallback
} from '../../../components/ui/avatar';

type ShadcnAvatarProps = React.ComponentPropsWithoutRef<typeof ShadcnAvatar>;
type ShadcnAvatarImageProps = React.ComponentPropsWithoutRef<typeof ShadcnAvatarImage>;
type ShadcnAvatarFallbackProps = React.ComponentPropsWithoutRef<typeof ShadcnAvatarFallback>;

type DevAvatarProps = ShadcnAvatarProps & DevProps & { children?: React.ReactNode };
type DevAvatarImageProps = ShadcnAvatarImageProps & DevProps & { children?: React.ReactNode };
type DevAvatarFallbackProps = ShadcnAvatarFallbackProps & DevProps & { children?: React.ReactNode };

export const Avatar = React.forwardRef<
  React.ElementRef<typeof ShadcnAvatar>,
  DevAvatarProps
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
      <ShadcnAvatar ref={ref} {...props}>
        {children}
      </ShadcnAvatar>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-avatar" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAvatar ref={ref} {...props}>
        {children}
      </ShadcnAvatar>
    </Container>
  );
});

Avatar.displayName = 'DevAvatar';

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof ShadcnAvatarImage>,
  DevAvatarImageProps
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
      <ShadcnAvatarImage ref={ref} {...props}>
        {children}
      </ShadcnAvatarImage>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-avatar-image" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAvatarImage ref={ref} {...props}>
        {children}
      </ShadcnAvatarImage>
    </Container>
  );
});

AvatarImage.displayName = 'DevAvatarImage';

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof ShadcnAvatarFallback>,
  DevAvatarFallbackProps
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
      <ShadcnAvatarFallback ref={ref} {...props}>
        {children}
      </ShadcnAvatarFallback>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-avatar-fallback" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAvatarFallback ref={ref} {...props}>
        {children}
      </ShadcnAvatarFallback>
    </Container>
  );
});

AvatarFallback.displayName = 'DevAvatarFallback';

// Export types
export { type DevAvatarProps, type DevAvatarImageProps, type DevAvatarFallbackProps };