// src/lib/dev-container/shadcn/ScrollArea.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  ScrollArea as ShadcnScrollArea,
  ScrollBar as ShadcnScrollBar,
} from '../../../components/ui/scroll-area';

// ScrollArea component
type ShadcnScrollAreaProps = React.ComponentPropsWithoutRef<typeof ShadcnScrollArea>;
type DevScrollAreaProps = ShadcnScrollAreaProps & DevProps & { children?: React.ReactNode };

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ShadcnScrollArea>,
  DevScrollAreaProps
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
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnScrollArea ref={ref} {...props}>
        {children}
      </ShadcnScrollArea>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId='dev-scroll-area'
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnScrollArea ref={ref} {...props}>
        {children}
      </ShadcnScrollArea>
    </Container>
  );
});

ScrollArea.displayName = 'DevScrollArea';

// ScrollBar component
type ShadcnScrollBarProps = React.ComponentPropsWithoutRef<typeof ShadcnScrollBar>;
type DevScrollBarProps = ShadcnScrollBarProps & DevProps;

export const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ShadcnScrollBar>,
  DevScrollBarProps
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
  if (!devId || devId === "noID" || !shouldContainerize) {
    return <ShadcnScrollBar ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId='dev-scroll-bar'
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnScrollBar ref={ref} {...props} />
    </Container>
  );
});

ScrollBar.displayName = 'DevScrollBar';

// Export dev prop types
export {
  type DevScrollAreaProps,
  type DevScrollBarProps,
};