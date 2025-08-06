// src/lib/dev-container/shadcn/Drawer.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Drawer as ShadcnDrawer,
  DrawerPortal as ShadcnDrawerPortal,
  DrawerOverlay as ShadcnDrawerOverlay,
  DrawerTrigger as ShadcnDrawerTrigger,
  DrawerClose as ShadcnDrawerClose,
  DrawerContent as ShadcnDrawerContent,
  DrawerHeader as ShadcnDrawerHeader,
  DrawerFooter as ShadcnDrawerFooter,
  DrawerTitle as ShadcnDrawerTitle,
  DrawerDescription as ShadcnDrawerDescription,
} from '../../../components/ui/drawer';

// Drawer root component
type ShadcnDrawerProps = React.ComponentPropsWithoutRef<typeof ShadcnDrawer>;
type DevDrawerProps = ShadcnDrawerProps & DevProps & { children?: React.ReactNode };

export const Drawer = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDrawerProps) => {
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
      <ShadcnDrawer {...props}>
        {children}
      </ShadcnDrawer>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-drawer"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnDrawer {...props}>
        {children}
      </ShadcnDrawer>
    </Container>
  );
};

Drawer.displayName = 'DevDrawer';

// DrawerPortal component
type ShadcnDrawerPortalProps = React.ComponentPropsWithoutRef<typeof ShadcnDrawerPortal>;
type DevDrawerPortalProps = ShadcnDrawerPortalProps & DevProps & { children?: React.ReactNode };

export const DrawerPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDrawerPortalProps) => {
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
      <ShadcnDrawerPortal {...props}>
        {children}
      </ShadcnDrawerPortal>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-drawer-portal"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnDrawerPortal {...props}>
        {children}
      </ShadcnDrawerPortal>
    </Container>
  );
};

DrawerPortal.displayName = 'DevDrawerPortal';

// DrawerOverlay component
type ShadcnDrawerOverlayProps = React.ComponentPropsWithoutRef<typeof ShadcnDrawerOverlay>;
type DevDrawerOverlayProps = ShadcnDrawerOverlayProps & DevProps & { children?: React.ReactNode };

export const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof ShadcnDrawerOverlay>,
  DevDrawerOverlayProps
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
      <ShadcnDrawerOverlay ref={ref} {...props}>
        {children}
      </ShadcnDrawerOverlay>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-drawer-overlay"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnDrawerOverlay ref={ref} {...props}>
        {children}
      </ShadcnDrawerOverlay>
    </Container>
  );
});

DrawerOverlay.displayName = 'DevDrawerOverlay';

// DrawerTrigger component
type ShadcnDrawerTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnDrawerTrigger>;
type DevDrawerTriggerProps = ShadcnDrawerTriggerProps & DevProps & { children?: React.ReactNode };

export const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnDrawerTrigger>,
  DevDrawerTriggerProps
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
      <ShadcnDrawerTrigger ref={ref} {...props}>
        {children}
      </ShadcnDrawerTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-drawer-trigger"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnDrawerTrigger ref={ref} {...props}>
        {children}
      </ShadcnDrawerTrigger>
    </Container>
  );
});

DrawerTrigger.displayName = 'DevDrawerTrigger';

// DrawerClose component
type ShadcnDrawerCloseProps = React.ComponentPropsWithoutRef<typeof ShadcnDrawerClose>;
type DevDrawerCloseProps = ShadcnDrawerCloseProps & DevProps & { children?: React.ReactNode };

export const DrawerClose = React.forwardRef<
  React.ElementRef<typeof ShadcnDrawerClose>,
  DevDrawerCloseProps
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
      <ShadcnDrawerClose ref={ref} {...props}>
        {children}
      </ShadcnDrawerClose>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-drawer-close"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnDrawerClose ref={ref} {...props}>
        {children}
      </ShadcnDrawerClose>
    </Container>
  );
});

DrawerClose.displayName = 'DevDrawerClose';

// DrawerContent component
type ShadcnDrawerContentProps = React.ComponentPropsWithoutRef<typeof ShadcnDrawerContent>;
type DevDrawerContentProps = ShadcnDrawerContentProps & DevProps & { children?: React.ReactNode };

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof ShadcnDrawerContent>,
  DevDrawerContentProps
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
      <ShadcnDrawerContent ref={ref} {...props}>
        {children}
      </ShadcnDrawerContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-drawer-content"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnDrawerContent ref={ref} {...props}>
        {children}
      </ShadcnDrawerContent>
    </Container>
  );
});

DrawerContent.displayName = 'DevDrawerContent';

// DrawerHeader component
type ShadcnDrawerHeaderProps = React.ComponentPropsWithoutRef<typeof ShadcnDrawerHeader>;
type DevDrawerHeaderProps = ShadcnDrawerHeaderProps & DevProps & { children?: React.ReactNode };

export const DrawerHeader = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDrawerHeaderProps) => {
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
      <ShadcnDrawerHeader {...props}>
        {children}
      </ShadcnDrawerHeader>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-drawer-header"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnDrawerHeader {...props}>
        {children}
      </ShadcnDrawerHeader>
    </Container>
  );
};

DrawerHeader.displayName = 'DevDrawerHeader';

// DrawerFooter component
type ShadcnDrawerFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnDrawerFooter>;
type DevDrawerFooterProps = ShadcnDrawerFooterProps & DevProps & { children?: React.ReactNode };

export const DrawerFooter = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDrawerFooterProps) => {
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
      <ShadcnDrawerFooter {...props}>
        {children}
      </ShadcnDrawerFooter>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-drawer-footer"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnDrawerFooter {...props}>
        {children}
      </ShadcnDrawerFooter>
    </Container>
  );
};

DrawerFooter.displayName = 'DevDrawerFooter';

// DrawerTitle component
type ShadcnDrawerTitleProps = React.ComponentPropsWithoutRef<typeof ShadcnDrawerTitle>;
type DevDrawerTitleProps = ShadcnDrawerTitleProps & DevProps & { children?: React.ReactNode };

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof ShadcnDrawerTitle>,
  DevDrawerTitleProps
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
      <ShadcnDrawerTitle ref={ref} {...props}>
        {children}
      </ShadcnDrawerTitle>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-drawer-title"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnDrawerTitle ref={ref} {...props}>
        {children}
      </ShadcnDrawerTitle>
    </Container>
  );
});

DrawerTitle.displayName = 'DevDrawerTitle';

// DrawerDescription component
type ShadcnDrawerDescriptionProps = React.ComponentPropsWithoutRef<typeof ShadcnDrawerDescription>;
type DevDrawerDescriptionProps = ShadcnDrawerDescriptionProps & DevProps & { children?: React.ReactNode };

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnDrawerDescription>,
  DevDrawerDescriptionProps
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
      <ShadcnDrawerDescription ref={ref} {...props}>
        {children}
      </ShadcnDrawerDescription>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-drawer-description"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnDrawerDescription ref={ref} {...props}>
        {children}
      </ShadcnDrawerDescription>
    </Container>
  );
});

DrawerDescription.displayName = 'DevDrawerDescription';

// Export types
export { 
  type DevDrawerProps, 
  type DevDrawerPortalProps, 
  type DevDrawerOverlayProps, 
  type DevDrawerTriggerProps, 
  type DevDrawerCloseProps, 
  type DevDrawerContentProps, 
  type DevDrawerHeaderProps, 
  type DevDrawerFooterProps, 
  type DevDrawerTitleProps, 
  type DevDrawerDescriptionProps 
};