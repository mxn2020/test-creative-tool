// src/lib/dev-container/shadcn/Sidebar.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarFooter as ShadcnSidebarFooter,
  SidebarGroup as ShadcnSidebarGroup,
  SidebarGroupAction as ShadcnSidebarGroupAction,
  SidebarGroupContent as ShadcnSidebarGroupContent,
  SidebarGroupLabel as ShadcnSidebarGroupLabel,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarInput as ShadcnSidebarInput,
  SidebarInset as ShadcnSidebarInset,
  SidebarMenu as ShadcnSidebarMenu,
  SidebarMenuAction as ShadcnSidebarMenuAction,
  SidebarMenuBadge as ShadcnSidebarMenuBadge,
  SidebarMenuButton as ShadcnSidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
  SidebarMenuSkeleton as ShadcnSidebarMenuSkeleton,
  SidebarMenuSub as ShadcnSidebarMenuSub,
  SidebarMenuSubButton as ShadcnSidebarMenuSubButton,
  SidebarMenuSubItem as ShadcnSidebarMenuSubItem,
  SidebarProvider as ShadcnSidebarProvider,
  SidebarRail as ShadcnSidebarRail,
  SidebarSeparator as ShadcnSidebarSeparator,
  SidebarTrigger as ShadcnSidebarTrigger,
  useSidebar,
} from '../../../components/ui/sidebar';

// SidebarProvider component
type ShadcnSidebarProviderProps = React.ComponentPropsWithoutRef<typeof ShadcnSidebarProvider>;
type DevSidebarProviderProps = ShadcnSidebarProviderProps & DevProps & { children?: React.ReactNode };

export const SidebarProvider = React.forwardRef<
  React.ElementRef<typeof ShadcnSidebarProvider>,
  DevSidebarProviderProps
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
      <ShadcnSidebarProvider ref={ref} {...props}>
        {children}
      </ShadcnSidebarProvider>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sidebar-provider"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSidebarProvider ref={ref} {...props}>
        {children}
      </ShadcnSidebarProvider>
    </Container>
  );
});

SidebarProvider.displayName = 'DevSidebarProvider';

// Sidebar component
type ShadcnSidebarProps = React.ComponentPropsWithoutRef<typeof ShadcnSidebar>;
type DevSidebarProps = ShadcnSidebarProps & DevProps & { children?: React.ReactNode };

export const Sidebar = React.forwardRef<
  React.ElementRef<typeof ShadcnSidebar>,
  DevSidebarProps
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
      <ShadcnSidebar ref={ref} {...props}>
        {children}
      </ShadcnSidebar>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sidebar"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSidebar ref={ref} {...props}>
        {children}
      </ShadcnSidebar>
    </Container>
  );
});

Sidebar.displayName = 'DevSidebar';

// SidebarTrigger component
type ShadcnSidebarTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnSidebarTrigger>;
type DevSidebarTriggerProps = ShadcnSidebarTriggerProps & DevProps;

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnSidebarTrigger>,
  DevSidebarTriggerProps
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
  if (devId === "noID" || !shouldContainerize) {
    return <ShadcnSidebarTrigger ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sidebar-trigger"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSidebarTrigger ref={ref} {...props} />
    </Container>
  );
});

SidebarTrigger.displayName = 'DevSidebarTrigger';

// SidebarContent component
type ShadcnSidebarContentProps = React.ComponentPropsWithoutRef<typeof ShadcnSidebarContent>;
type DevSidebarContentProps = ShadcnSidebarContentProps & DevProps & { children?: React.ReactNode };

export const SidebarContent = React.forwardRef<
  React.ElementRef<typeof ShadcnSidebarContent>,
  DevSidebarContentProps
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
      <ShadcnSidebarContent ref={ref} {...props}>
        {children}
      </ShadcnSidebarContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sidebar-content"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSidebarContent ref={ref} {...props}>
        {children}
      </ShadcnSidebarContent>
    </Container>
  );
});

SidebarContent.displayName = 'DevSidebarContent';

// SidebarHeader component
type ShadcnSidebarHeaderProps = React.ComponentPropsWithoutRef<typeof ShadcnSidebarHeader>;
type DevSidebarHeaderProps = ShadcnSidebarHeaderProps & DevProps & { children?: React.ReactNode };

export const SidebarHeader = React.forwardRef<
  React.ElementRef<typeof ShadcnSidebarHeader>,
  DevSidebarHeaderProps
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
      <ShadcnSidebarHeader ref={ref} {...props}>
        {children}
      </ShadcnSidebarHeader>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sidebar-header"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSidebarHeader ref={ref} {...props}>
        {children}
      </ShadcnSidebarHeader>
    </Container>
  );
});

SidebarHeader.displayName = 'DevSidebarHeader';

// SidebarFooter component
type ShadcnSidebarFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnSidebarFooter>;
type DevSidebarFooterProps = ShadcnSidebarFooterProps & DevProps & { children?: React.ReactNode };

export const SidebarFooter = React.forwardRef<
  React.ElementRef<typeof ShadcnSidebarFooter>,
  DevSidebarFooterProps
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
      <ShadcnSidebarFooter ref={ref} {...props}>
        {children}
      </ShadcnSidebarFooter>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sidebar-footer"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSidebarFooter ref={ref} {...props}>
        {children}
      </ShadcnSidebarFooter>
    </Container>
  );
});

SidebarFooter.displayName = 'DevSidebarFooter';

// SidebarMenu component
type ShadcnSidebarMenuProps = React.ComponentPropsWithoutRef<typeof ShadcnSidebarMenu>;
type DevSidebarMenuProps = ShadcnSidebarMenuProps & DevProps & { children?: React.ReactNode };

export const SidebarMenu = React.forwardRef<
  React.ElementRef<typeof ShadcnSidebarMenu>,
  DevSidebarMenuProps
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
      <ShadcnSidebarMenu ref={ref} {...props}>
        {children}
      </ShadcnSidebarMenu>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sidebar-menu"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSidebarMenu ref={ref} {...props}>
        {children}
      </ShadcnSidebarMenu>
    </Container>
  );
});

SidebarMenu.displayName = 'DevSidebarMenu';

// SidebarMenuItem component
type ShadcnSidebarMenuItemProps = React.ComponentPropsWithoutRef<typeof ShadcnSidebarMenuItem>;
type DevSidebarMenuItemProps = ShadcnSidebarMenuItemProps & DevProps & { children?: React.ReactNode };

export const SidebarMenuItem = React.forwardRef<
  React.ElementRef<typeof ShadcnSidebarMenuItem>,
  DevSidebarMenuItemProps
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
      <ShadcnSidebarMenuItem ref={ref} {...props}>
        {children}
      </ShadcnSidebarMenuItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sidebar-menu-item"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSidebarMenuItem ref={ref} {...props}>
        {children}
      </ShadcnSidebarMenuItem>
    </Container>
  );
});

SidebarMenuItem.displayName = 'DevSidebarMenuItem';

// SidebarMenuButton component
type ShadcnSidebarMenuButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnSidebarMenuButton>;
type DevSidebarMenuButtonProps = ShadcnSidebarMenuButtonProps & DevProps & { children?: React.ReactNode };

export const SidebarMenuButton = React.forwardRef<
  React.ElementRef<typeof ShadcnSidebarMenuButton>,
  DevSidebarMenuButtonProps
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
      <ShadcnSidebarMenuButton ref={ref} {...props}>
        {children}
      </ShadcnSidebarMenuButton>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-sidebar-menu-button"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSidebarMenuButton ref={ref} {...props}>
        {children}
      </ShadcnSidebarMenuButton>
    </Container>
  );
});

SidebarMenuButton.displayName = 'DevSidebarMenuButton';

// Export remaining components with minimal containerization
export const SidebarRail = ShadcnSidebarRail;
export const SidebarInset = ShadcnSidebarInset;
export const SidebarInput = ShadcnSidebarInput;
export const SidebarSeparator = ShadcnSidebarSeparator;
export const SidebarGroup = ShadcnSidebarGroup;
export const SidebarGroupLabel = ShadcnSidebarGroupLabel;
export const SidebarGroupAction = ShadcnSidebarGroupAction;
export const SidebarGroupContent = ShadcnSidebarGroupContent;
export const SidebarMenuAction = ShadcnSidebarMenuAction;
export const SidebarMenuBadge = ShadcnSidebarMenuBadge;
export const SidebarMenuSkeleton = ShadcnSidebarMenuSkeleton;
export const SidebarMenuSub = ShadcnSidebarMenuSub;
export const SidebarMenuSubButton = ShadcnSidebarMenuSubButton;
export const SidebarMenuSubItem = ShadcnSidebarMenuSubItem;

// Export the hook as-is
export { useSidebar };

export { 
  type DevSidebarProviderProps, 
  type DevSidebarProps, 
  type DevSidebarTriggerProps, 
  type DevSidebarContentProps, 
  type DevSidebarHeaderProps, 
  type DevSidebarFooterProps, 
  type DevSidebarMenuProps, 
  type DevSidebarMenuItemProps, 
  type DevSidebarMenuButtonProps 
};