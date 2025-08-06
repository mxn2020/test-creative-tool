// src/lib/dev-container/shadcn/NavigationMenu.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  navigationMenuTriggerStyle,
  NavigationMenu as ShadcnNavigationMenu,
  NavigationMenuList as ShadcnNavigationMenuList,
  NavigationMenuItem as ShadcnNavigationMenuItem,
  NavigationMenuContent as ShadcnNavigationMenuContent,
  NavigationMenuTrigger as ShadcnNavigationMenuTrigger,
  NavigationMenuLink as ShadcnNavigationMenuLink,
  NavigationMenuIndicator as ShadcnNavigationMenuIndicator,
  NavigationMenuViewport as ShadcnNavigationMenuViewport,
} from '../../../components/ui/navigation-menu';

// NavigationMenu root component
type ShadcnNavigationMenuProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenu>;
interface DevNavigationMenuProps extends ShadcnNavigationMenuProps, DevProps {
  children?: React.ReactNode;
}

export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenu>,
  DevNavigationMenuProps
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
      <ShadcnNavigationMenu ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenu>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-navigation-menu"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnNavigationMenu ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenu>
    </Container>
  );
});

NavigationMenu.displayName = 'DevNavigationMenu';

// NavigationMenuList component
type ShadcnNavigationMenuListProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuList>;
interface DevNavigationMenuListProps extends ShadcnNavigationMenuListProps, DevProps {
  children?: React.ReactNode;
}

export const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuList>,
  DevNavigationMenuListProps
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
      <ShadcnNavigationMenuList ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuList>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-navigation-menu-list"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnNavigationMenuList ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuList>
    </Container>
  );
});

NavigationMenuList.displayName = 'DevNavigationMenuList';

// NavigationMenuItem component
type ShadcnNavigationMenuItemProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuItem>;
interface DevNavigationMenuItemProps extends ShadcnNavigationMenuItemProps, DevProps {
  children?: React.ReactNode;
}

export const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuItem>,
  DevNavigationMenuItemProps
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
      <ShadcnNavigationMenuItem ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-navigation-menu-item"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnNavigationMenuItem ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuItem>
    </Container>
  );
});

NavigationMenuItem.displayName = 'DevNavigationMenuItem';

// NavigationMenuTrigger component
type ShadcnNavigationMenuTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuTrigger>;
interface DevNavigationMenuTriggerProps extends ShadcnNavigationMenuTriggerProps, DevProps {
  children?: React.ReactNode;
}

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuTrigger>,
  DevNavigationMenuTriggerProps
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
      <ShadcnNavigationMenuTrigger ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-navigation-menu-trigger"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnNavigationMenuTrigger ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuTrigger>
    </Container>
  );
});

NavigationMenuTrigger.displayName = 'DevNavigationMenuTrigger';

// NavigationMenuContent component
type ShadcnNavigationMenuContentProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuContent>;
interface DevNavigationMenuContentProps extends ShadcnNavigationMenuContentProps, DevProps {
  children?: React.ReactNode;
}

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuContent>,
  DevNavigationMenuContentProps
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
      <ShadcnNavigationMenuContent ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-navigation-menu-content"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnNavigationMenuContent ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuContent>
    </Container>
  );
});

NavigationMenuContent.displayName = 'DevNavigationMenuContent';

// NavigationMenuLink component
type ShadcnNavigationMenuLinkProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuLink>;
interface DevNavigationMenuLinkProps extends ShadcnNavigationMenuLinkProps, DevProps {
  children?: React.ReactNode;
}

export const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuLink>,
  DevNavigationMenuLinkProps
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
      <ShadcnNavigationMenuLink ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuLink>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-navigation-menu-link"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnNavigationMenuLink ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuLink>
    </Container>
  );
});

NavigationMenuLink.displayName = 'DevNavigationMenuLink';

// NavigationMenuViewport component
type ShadcnNavigationMenuViewportProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuViewport>;
interface DevNavigationMenuViewportProps extends ShadcnNavigationMenuViewportProps, DevProps {
  children?: React.ReactNode;
}

export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuViewport>,
  DevNavigationMenuViewportProps
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
      <ShadcnNavigationMenuViewport ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuViewport>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-navigation-menu-viewport"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnNavigationMenuViewport ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuViewport>
    </Container>
  );
});

NavigationMenuViewport.displayName = 'DevNavigationMenuViewport';

// NavigationMenuIndicator component
type ShadcnNavigationMenuIndicatorProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuIndicator>;
interface DevNavigationMenuIndicatorProps extends ShadcnNavigationMenuIndicatorProps, DevProps {
  children?: React.ReactNode;
}

export const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuIndicator>,
  DevNavigationMenuIndicatorProps
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
      <ShadcnNavigationMenuIndicator ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuIndicator>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-navigation-menu-indicator"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnNavigationMenuIndicator ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuIndicator>
    </Container>
  );
});

NavigationMenuIndicator.displayName = 'DevNavigationMenuIndicator';

// Export the trigger style utility
export { navigationMenuTriggerStyle };

// Export prop types
export {
  type DevNavigationMenuProps,
  type DevNavigationMenuListProps,
  type DevNavigationMenuItemProps,
  type DevNavigationMenuTriggerProps,
  type DevNavigationMenuContentProps,
  type DevNavigationMenuLinkProps,
  type DevNavigationMenuViewportProps,
  type DevNavigationMenuIndicatorProps,
};