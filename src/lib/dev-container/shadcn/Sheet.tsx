// src/lib/dev-container/shadcn/Sheet.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Sheet as ShadcnSheet,
  SheetPortal as ShadcnSheetPortal,
  SheetOverlay as ShadcnSheetOverlay,
  SheetTrigger as ShadcnSheetTrigger,
  SheetClose as ShadcnSheetClose,
  SheetContent as ShadcnSheetContent,
  SheetHeader as ShadcnSheetHeader,
  SheetFooter as ShadcnSheetFooter,
  SheetTitle as ShadcnSheetTitle,
  SheetDescription as ShadcnSheetDescription,
} from '../../../components/ui/sheet';

// Sheet root component (FC type)
type ShadcnSheetProps = React.ComponentProps<typeof ShadcnSheet>;
type DevSheetProps = ShadcnSheetProps & DevProps & { children?: React.ReactNode };

export const Sheet = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevSheetProps) => {
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
      <ShadcnSheet {...props}>
        {children}
      </ShadcnSheet>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sheet"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSheet {...props}>
        {children}
      </ShadcnSheet>
    </Container>
  );
};

Sheet.displayName = 'DevSheet';

// SheetPortal component (FC type)
type ShadcnSheetPortalProps = React.ComponentProps<typeof ShadcnSheetPortal>;
type DevSheetPortalProps = ShadcnSheetPortalProps & DevProps & { children?: React.ReactNode };

export const SheetPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevSheetPortalProps) => {
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
      <ShadcnSheetPortal {...props}>
        {children}
      </ShadcnSheetPortal>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sheet-portal"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSheetPortal {...props}>
        {children}
      </ShadcnSheetPortal>
    </Container>
  );
};

SheetPortal.displayName = 'DevSheetPortal';

// SheetOverlay component
type ShadcnSheetOverlayProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetOverlay>;
type DevSheetOverlayProps = ShadcnSheetOverlayProps & DevProps & { children?: React.ReactNode };

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetOverlay>,
  DevSheetOverlayProps
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
      <ShadcnSheetOverlay ref={ref} {...props}>
        {children}
      </ShadcnSheetOverlay>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sheet-overlay"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSheetOverlay ref={ref} {...props}>
        {children}
      </ShadcnSheetOverlay>
    </Container>
  );
});

SheetOverlay.displayName = 'DevSheetOverlay';

// SheetTrigger component
type ShadcnSheetTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetTrigger>;
type DevSheetTriggerProps = ShadcnSheetTriggerProps & DevProps & { children?: React.ReactNode };

export const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetTrigger>,
  DevSheetTriggerProps
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
      <ShadcnSheetTrigger ref={ref} {...props}>
        {children}
      </ShadcnSheetTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sheet-trigger"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSheetTrigger ref={ref} {...props}>
        {children}
      </ShadcnSheetTrigger>
    </Container>
  );
});

SheetTrigger.displayName = 'DevSheetTrigger';

// SheetClose component
type ShadcnSheetCloseProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetClose>;
type DevSheetCloseProps = ShadcnSheetCloseProps & DevProps & { children?: React.ReactNode };

export const SheetClose = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetClose>,
  DevSheetCloseProps
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
      <ShadcnSheetClose ref={ref} {...props}>
        {children}
      </ShadcnSheetClose>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sheet-close"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSheetClose ref={ref} {...props}>
        {children}
      </ShadcnSheetClose>
    </Container>
  );
});

SheetClose.displayName = 'DevSheetClose';

// SheetContent component
type ShadcnSheetContentProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetContent>;
type DevSheetContentProps = ShadcnSheetContentProps & DevProps & { children?: React.ReactNode };

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetContent>,
  DevSheetContentProps
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
      <ShadcnSheetContent ref={ref} {...props}>
        {children}
      </ShadcnSheetContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sheet-content"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSheetContent ref={ref} {...props}>
        {children}
      </ShadcnSheetContent>
    </Container>
  );
});

SheetContent.displayName = 'DevSheetContent';

// SheetHeader component
type ShadcnSheetHeaderProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetHeader>;
type DevSheetHeaderProps = ShadcnSheetHeaderProps & DevProps & { children?: React.ReactNode };

export const SheetHeader = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevSheetHeaderProps) => {
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
      <ShadcnSheetHeader {...props}>
        {children}
      </ShadcnSheetHeader>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sheet-header"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSheetHeader {...props}>
        {children}
      </ShadcnSheetHeader>
    </Container>
  );
};

SheetHeader.displayName = 'DevSheetHeader';

// SheetFooter component
type ShadcnSheetFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetFooter>;
type DevSheetFooterProps = ShadcnSheetFooterProps & DevProps & { children?: React.ReactNode };

export const SheetFooter = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevSheetFooterProps) => {
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
      <ShadcnSheetFooter {...props}>
        {children}
      </ShadcnSheetFooter>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sheet-footer"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSheetFooter {...props}>
        {children}
      </ShadcnSheetFooter>
    </Container>
  );
};

SheetFooter.displayName = 'DevSheetFooter';

// SheetTitle component
type ShadcnSheetTitleProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetTitle>;
type DevSheetTitleProps = ShadcnSheetTitleProps & DevProps & { children?: React.ReactNode };

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetTitle>,
  DevSheetTitleProps
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
      <ShadcnSheetTitle ref={ref} {...props}>
        {children}
      </ShadcnSheetTitle>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sheet-title"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSheetTitle ref={ref} {...props}>
        {children}
      </ShadcnSheetTitle>
    </Container>
  );
});

SheetTitle.displayName = 'DevSheetTitle';

// SheetDescription component
type ShadcnSheetDescriptionProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetDescription>;
type DevSheetDescriptionProps = ShadcnSheetDescriptionProps & DevProps & { children?: React.ReactNode };

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetDescription>,
  DevSheetDescriptionProps
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
      <ShadcnSheetDescription ref={ref} {...props}>
        {children}
      </ShadcnSheetDescription>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sheet-description"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSheetDescription ref={ref} {...props}>
        {children}
      </ShadcnSheetDescription>
    </Container>
  );
});

SheetDescription.displayName = 'DevSheetDescription';

export { 
  type DevSheetProps, 
  type DevSheetPortalProps, 
  type DevSheetOverlayProps, 
  type DevSheetTriggerProps, 
  type DevSheetCloseProps, 
  type DevSheetContentProps, 
  type DevSheetHeaderProps, 
  type DevSheetFooterProps, 
  type DevSheetTitleProps, 
  type DevSheetDescriptionProps 
};