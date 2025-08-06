// src/lib/dev-container/shadcn/AlertDialog.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  AlertDialog as ShadcnAlertDialog,
  AlertDialogPortal as ShadcnAlertDialogPortal,
  AlertDialogOverlay as ShadcnAlertDialogOverlay,
  AlertDialogTrigger as ShadcnAlertDialogTrigger,
  AlertDialogContent as ShadcnAlertDialogContent,
  AlertDialogHeader as ShadcnAlertDialogHeader,
  AlertDialogFooter as ShadcnAlertDialogFooter,
  AlertDialogTitle as ShadcnAlertDialogTitle,
  AlertDialogDescription as ShadcnAlertDialogDescription,
  AlertDialogAction as ShadcnAlertDialogAction,
  AlertDialogCancel as ShadcnAlertDialogCancel,
} from '../../../components/ui/alert-dialog';

// Get props types for AlertDialog root
type ShadcnAlertDialogProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialog>;
type DevAlertDialogProps = ShadcnAlertDialogProps & DevProps & { children?: React.ReactNode };

export const AlertDialog = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevAlertDialogProps) => {
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
      <ShadcnAlertDialog {...props}>
        {children}
      </ShadcnAlertDialog>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-alert-dialog" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAlertDialog {...props}>
        {children}
      </ShadcnAlertDialog>
    </Container>
  );
};

AlertDialog.displayName = 'DevAlertDialog';

// Get props types for AlertDialogPortal
type ShadcnAlertDialogPortalProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogPortal>;
type DevAlertDialogPortalProps = ShadcnAlertDialogPortalProps & DevProps & { children?: React.ReactNode };

export const AlertDialogPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevAlertDialogPortalProps) => {
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
      <ShadcnAlertDialogPortal {...props}>
        {children}
      </ShadcnAlertDialogPortal>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-alert-dialog-portal" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAlertDialogPortal {...props}>
        {children}
      </ShadcnAlertDialogPortal>
    </Container>
  );
};

AlertDialogPortal.displayName = 'DevAlertDialogPortal';

// Get the props types from the original shadcn components
type ShadcnAlertDialogOverlayProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogOverlay>;
type ShadcnAlertDialogTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogTrigger>;
type ShadcnAlertDialogContentProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogContent>;
type ShadcnAlertDialogHeaderProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogHeader>;
type ShadcnAlertDialogFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogFooter>;
type ShadcnAlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogTitle>;
type ShadcnAlertDialogDescriptionProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogDescription>;
type ShadcnAlertDialogActionProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogAction>;
type ShadcnAlertDialogCancelProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogCancel>;

// Combined props types
type DevAlertDialogOverlayProps = ShadcnAlertDialogOverlayProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogTriggerProps = ShadcnAlertDialogTriggerProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogContentProps = ShadcnAlertDialogContentProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogHeaderProps = ShadcnAlertDialogHeaderProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogFooterProps = ShadcnAlertDialogFooterProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogTitleProps = ShadcnAlertDialogTitleProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogDescriptionProps = ShadcnAlertDialogDescriptionProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogActionProps = ShadcnAlertDialogActionProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogCancelProps = ShadcnAlertDialogCancelProps & DevProps & { children?: React.ReactNode };

export const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogOverlay>,
  DevAlertDialogOverlayProps
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
      <ShadcnAlertDialogOverlay ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogOverlay>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-alert-dialog-overlay" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAlertDialogOverlay ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogOverlay>
    </Container>
  );
});

AlertDialogOverlay.displayName = 'DevAlertDialogOverlay';

export const AlertDialogTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogTrigger>,
  DevAlertDialogTriggerProps
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
      <ShadcnAlertDialogTrigger ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-alert-dialog-trigger" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAlertDialogTrigger ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogTrigger>
    </Container>
  );
});

AlertDialogTrigger.displayName = 'DevAlertDialogTrigger';

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogContent>,
  DevAlertDialogContentProps
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
      <ShadcnAlertDialogContent ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-alert-dialog-content" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAlertDialogContent ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogContent>
    </Container>
  );
});

AlertDialogContent.displayName = 'DevAlertDialogContent';

export const AlertDialogHeader = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevAlertDialogHeaderProps) => {
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
      <ShadcnAlertDialogHeader {...props}>
        {children}
      </ShadcnAlertDialogHeader>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-alert-dialog-header" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAlertDialogHeader {...props}>
        {children}
      </ShadcnAlertDialogHeader>
    </Container>
  );
};

AlertDialogHeader.displayName = 'DevAlertDialogHeader';

export const AlertDialogFooter = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevAlertDialogFooterProps) => {
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
      <ShadcnAlertDialogFooter {...props}>
        {children}
      </ShadcnAlertDialogFooter>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-alert-dialog-footer" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAlertDialogFooter {...props}>
        {children}
      </ShadcnAlertDialogFooter>
    </Container>
  );
};

AlertDialogFooter.displayName = 'DevAlertDialogFooter';

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogTitle>,
  DevAlertDialogTitleProps
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
      <ShadcnAlertDialogTitle ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogTitle>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-alert-dialog-title" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAlertDialogTitle ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogTitle>
    </Container>
  );
});

AlertDialogTitle.displayName = 'DevAlertDialogTitle';

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogDescription>,
  DevAlertDialogDescriptionProps
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
      <ShadcnAlertDialogDescription ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogDescription>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-alert-dialog-description" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAlertDialogDescription ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogDescription>
    </Container>
  );
});

AlertDialogDescription.displayName = 'DevAlertDialogDescription';

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogAction>,
  DevAlertDialogActionProps
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
      <ShadcnAlertDialogAction ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogAction>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-alert-dialog-action" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAlertDialogAction ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogAction>
    </Container>
  );
});

AlertDialogAction.displayName = 'DevAlertDialogAction';

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogCancel>,
  DevAlertDialogCancelProps
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
      <ShadcnAlertDialogCancel ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogCancel>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-alert-dialog-cancel" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnAlertDialogCancel ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogCancel>
    </Container>
  );
});

AlertDialogCancel.displayName = 'DevAlertDialogCancel';

// Export types
export {
  type DevAlertDialogProps,
  type DevAlertDialogPortalProps,
  type DevAlertDialogOverlayProps,
  type DevAlertDialogTriggerProps,
  type DevAlertDialogContentProps,
  type DevAlertDialogHeaderProps,
  type DevAlertDialogFooterProps,
  type DevAlertDialogTitleProps,
  type DevAlertDialogDescriptionProps,
  type DevAlertDialogActionProps,
  type DevAlertDialogCancelProps
};