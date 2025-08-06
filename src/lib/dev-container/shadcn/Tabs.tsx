// src/lib/dev-container/shadcn/Tabs.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Tabs as ShadcnTabs,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger,
  TabsContent as ShadcnTabsContent,
} from '../../../components/ui/tabs';

// Tabs root component (FC type)
type ShadcnTabsProps = React.ComponentProps<typeof ShadcnTabs>;
interface DevTabsProps extends ShadcnTabsProps, DevProps {
  children?: React.ReactNode;
}

export const Tabs = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevTabsProps) => {
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
      <ShadcnTabs {...props}>
        {children}
      </ShadcnTabs>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-tabs"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTabs {...props}>
        {children}
      </ShadcnTabs>
    </Container>
  );
};

Tabs.displayName = 'DevTabs';

// TabsList component
type ShadcnTabsListProps = React.ComponentPropsWithoutRef<typeof ShadcnTabsList>;
interface DevTabsListProps extends ShadcnTabsListProps, DevProps {
  children?: React.ReactNode;
}

export const TabsList = React.forwardRef<
  React.ElementRef<typeof ShadcnTabsList>,
  DevTabsListProps
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
      <ShadcnTabsList ref={ref} {...props}>
        {children}
      </ShadcnTabsList>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-tabs-list"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTabsList ref={ref} {...props}>
        {children}
      </ShadcnTabsList>
    </Container>
  );
});

TabsList.displayName = 'DevTabsList';

// TabsTrigger component
type ShadcnTabsTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnTabsTrigger>;
interface DevTabsTriggerProps extends ShadcnTabsTriggerProps, DevProps {
  children?: React.ReactNode;
}

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnTabsTrigger>,
  DevTabsTriggerProps
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
      <ShadcnTabsTrigger ref={ref} {...props}>
        {children}
      </ShadcnTabsTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-tabs-trigger"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTabsTrigger ref={ref} {...props}>
        {children}
      </ShadcnTabsTrigger>
    </Container>
  );
});

TabsTrigger.displayName = 'DevTabsTrigger';

// TabsContent component
type ShadcnTabsContentProps = React.ComponentPropsWithoutRef<typeof ShadcnTabsContent>;
interface DevTabsContentProps extends ShadcnTabsContentProps, DevProps {
  children?: React.ReactNode;
}

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof ShadcnTabsContent>,
  DevTabsContentProps
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
      <ShadcnTabsContent ref={ref} {...props}>
        {children}
      </ShadcnTabsContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-tabs-content"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTabsContent ref={ref} {...props}>
        {children}
      </ShadcnTabsContent>
    </Container>
  );
});

TabsContent.displayName = 'DevTabsContent';

// Export prop types
export {
  type DevTabsProps,
  type DevTabsListProps,
  type DevTabsTriggerProps,
  type DevTabsContentProps,
};