// src/lib/dev-container/shadcn/ToggleGroup.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  ToggleGroup as ShadcnToggleGroup,
  ToggleGroupItem as ShadcnToggleGroupItem,
} from '../../../components/ui/toggle-group';

// ToggleGroup component
type ShadcnToggleGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnToggleGroup>;
type DevToggleGroupProps = ShadcnToggleGroupProps & DevProps & { children?: React.ReactNode };

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnToggleGroup>,
  DevToggleGroupProps
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
      <ShadcnToggleGroup ref={ref} {...props}>
        {children}
      </ShadcnToggleGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-toggle-group"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnToggleGroup ref={ref} {...props}>
        {children}
      </ShadcnToggleGroup>
    </Container>
  );
});

ToggleGroup.displayName = 'DevToggleGroup';

// ToggleGroupItem component
type ShadcnToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof ShadcnToggleGroupItem>;
type DevToggleGroupItemProps = ShadcnToggleGroupItemProps & DevProps & { children?: React.ReactNode };

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ShadcnToggleGroupItem>,
  DevToggleGroupItemProps
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
      <ShadcnToggleGroupItem ref={ref} {...props}>
        {children}
      </ShadcnToggleGroupItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-toggle-group-item"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnToggleGroupItem ref={ref} {...props}>
        {children}
      </ShadcnToggleGroupItem>
    </Container>
  );
});

ToggleGroupItem.displayName = 'DevToggleGroupItem';

export { type DevToggleGroupProps, type DevToggleGroupItemProps };