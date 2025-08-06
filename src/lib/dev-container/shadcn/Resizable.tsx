// src/lib/dev-container/shadcn/Resizable.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  ResizablePanelGroup as ShadcnResizablePanelGroup,
  ResizablePanel as ShadcnResizablePanel,
  ResizableHandle as ShadcnResizableHandle,
} from '../../../components/ui/resizable';

// ResizablePanelGroup component
type ShadcnResizablePanelGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnResizablePanelGroup>;
type ShadcnResizablePanelProps = React.ComponentPropsWithoutRef<typeof ShadcnResizablePanel>;
type ShadcnResizableHandleProps = React.ComponentPropsWithoutRef<typeof ShadcnResizableHandle>;

type DevResizablePanelGroupProps = ShadcnResizablePanelGroupProps & DevProps & { children?: React.ReactNode };
type DevResizablePanelProps = ShadcnResizablePanelProps & DevProps & { children?: React.ReactNode };
type DevResizableHandleProps = ShadcnResizableHandleProps & DevProps;

export const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnResizablePanelGroup>,
  DevResizablePanelGroupProps
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
      <ShadcnResizablePanelGroup ref={ref} {...props}>
        {children}
      </ShadcnResizablePanelGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-resizable-panel-group"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnResizablePanelGroup ref={ref} {...props}>
        {children}
      </ShadcnResizablePanelGroup>
    </Container>
  );
});

ResizablePanelGroup.displayName = 'DevResizablePanelGroup';

// ResizablePanel component
export const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof ShadcnResizablePanel>,
  DevResizablePanelProps
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
      <ShadcnResizablePanel ref={ref} {...props}>
        {children}
      </ShadcnResizablePanel>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-resizable-panel"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnResizablePanel ref={ref} {...props}>
        {children}
      </ShadcnResizablePanel>
    </Container>
  );
});

ResizablePanel.displayName = 'DevResizablePanel';

// ResizableHandle component
export const ResizableHandle: React.FC<DevResizableHandleProps> = ({ 
  devId, 
  devName, 
  devDescription, 
  devSelectable = true, 
  devDetailed, 
  ...props 
}) => {
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
    return <ShadcnResizableHandle {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-resizable-handle"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnResizableHandle {...props} />
    </Container>
  );
};

ResizableHandle.displayName = 'DevResizableHandle';

export { type DevResizablePanelGroupProps, type DevResizablePanelProps, type DevResizableHandleProps };