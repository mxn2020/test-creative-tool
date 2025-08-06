// src/lib/dev-container/shadcn/Breadcrumb.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbList as ShadcnBreadcrumbList,
  BreadcrumbItem as ShadcnBreadcrumbItem,
  BreadcrumbLink as ShadcnBreadcrumbLink,
  BreadcrumbPage as ShadcnBreadcrumbPage,
  BreadcrumbSeparator as ShadcnBreadcrumbSeparator,
  BreadcrumbEllipsis as ShadcnBreadcrumbEllipsis,
} from '../../../components/ui/breadcrumb';

type ShadcnBreadcrumbProps = React.ComponentPropsWithoutRef<typeof ShadcnBreadcrumb>;
type ShadcnBreadcrumbListProps = React.ComponentPropsWithoutRef<typeof ShadcnBreadcrumbList>;
type ShadcnBreadcrumbItemProps = React.ComponentPropsWithoutRef<typeof ShadcnBreadcrumbItem>;
type ShadcnBreadcrumbLinkProps = React.ComponentPropsWithoutRef<typeof ShadcnBreadcrumbLink>;
type ShadcnBreadcrumbPageProps = React.ComponentPropsWithoutRef<typeof ShadcnBreadcrumbPage>;

type DevBreadcrumbProps = ShadcnBreadcrumbProps & DevProps & { children?: React.ReactNode };
type DevBreadcrumbListProps = ShadcnBreadcrumbListProps & DevProps & { children?: React.ReactNode };
type DevBreadcrumbItemProps = ShadcnBreadcrumbItemProps & DevProps & { children?: React.ReactNode };
type DevBreadcrumbLinkProps = ShadcnBreadcrumbLinkProps & DevProps & { children?: React.ReactNode };
type DevBreadcrumbPageProps = ShadcnBreadcrumbPageProps & DevProps & { children?: React.ReactNode };
type DevBreadcrumbSeparatorProps = React.ComponentProps<"li"> & DevProps & { children?: React.ReactNode };
type DevBreadcrumbEllipsisProps = React.ComponentProps<"span"> & DevProps & { children?: React.ReactNode };

export const Breadcrumb = React.forwardRef<
  HTMLElement,
  DevBreadcrumbProps
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
      <ShadcnBreadcrumb ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumb>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-breadcrumb" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnBreadcrumb ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumb>
    </Container>
  );
});

Breadcrumb.displayName = 'DevBreadcrumb';

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  DevBreadcrumbListProps
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
      <ShadcnBreadcrumbList ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbList>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-breadcrumb-list" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnBreadcrumbList ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbList>
    </Container>
  );
});

BreadcrumbList.displayName = 'DevBreadcrumbList';

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  DevBreadcrumbItemProps
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
      <ShadcnBreadcrumbItem ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-breadcrumb-item" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnBreadcrumbItem ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbItem>
    </Container>
  );
});

BreadcrumbItem.displayName = 'DevBreadcrumbItem';

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  DevBreadcrumbLinkProps
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
      <ShadcnBreadcrumbLink ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbLink>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-breadcrumb-link" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnBreadcrumbLink ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbLink>
    </Container>
  );
});

BreadcrumbLink.displayName = 'DevBreadcrumbLink';

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  DevBreadcrumbPageProps
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
      <ShadcnBreadcrumbPage ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbPage>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-breadcrumb-page" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnBreadcrumbPage ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbPage>
    </Container>
  );
});

BreadcrumbPage.displayName = 'DevBreadcrumbPage';

export const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  DevBreadcrumbSeparatorProps
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
      <ShadcnBreadcrumbSeparator ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbSeparator>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-breadcrumb-separator" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnBreadcrumbSeparator ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbSeparator>
    </Container>
  );
});

BreadcrumbSeparator.displayName = 'DevBreadcrumbSeparator';

export const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  DevBreadcrumbEllipsisProps
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
      <ShadcnBreadcrumbEllipsis ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbEllipsis>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-breadcrumb-ellipsis" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnBreadcrumbEllipsis ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumbEllipsis>
    </Container>
  );
});

BreadcrumbEllipsis.displayName = 'DevBreadcrumbEllipsis';

// Export types
export { 
  type DevBreadcrumbProps, 
  type DevBreadcrumbListProps, 
  type DevBreadcrumbItemProps, 
  type DevBreadcrumbLinkProps, 
  type DevBreadcrumbPageProps, 
  type DevBreadcrumbSeparatorProps, 
  type DevBreadcrumbEllipsisProps 
};