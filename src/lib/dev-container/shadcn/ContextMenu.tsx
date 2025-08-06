// src/lib/dev-container/shadcn/ContextMenu.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  ContextMenu as ShadcnContextMenu,
  ContextMenuTrigger as ShadcnContextMenuTrigger,
  ContextMenuContent as ShadcnContextMenuContent,
  ContextMenuItem as ShadcnContextMenuItem,
  ContextMenuCheckboxItem as ShadcnContextMenuCheckboxItem,
  ContextMenuRadioItem as ShadcnContextMenuRadioItem,
  ContextMenuLabel as ShadcnContextMenuLabel,
  ContextMenuSeparator as ShadcnContextMenuSeparator,
  ContextMenuShortcut as ShadcnContextMenuShortcut,
  ContextMenuGroup as ShadcnContextMenuGroup,
  ContextMenuPortal as ShadcnContextMenuPortal,
  ContextMenuSub as ShadcnContextMenuSub,
  ContextMenuSubContent as ShadcnContextMenuSubContent,
  ContextMenuSubTrigger as ShadcnContextMenuSubTrigger,
  ContextMenuRadioGroup as ShadcnContextMenuRadioGroup,
} from '../../../components/ui/context-menu';

// ContextMenu root component (FC type)
type ShadcnContextMenuProps = React.ComponentProps<typeof ShadcnContextMenu>;
type DevContextMenuProps = ShadcnContextMenuProps & DevProps & { children?: React.ReactNode };

export const ContextMenu = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevContextMenuProps) => {
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
      <ShadcnContextMenu {...props}>
        {children}
      </ShadcnContextMenu>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenu {...props}>
        {children}
      </ShadcnContextMenu>
    </Container>
  );
};

ContextMenu.displayName = 'DevContextMenu';

// ContextMenuTrigger component
type ShadcnContextMenuTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuTrigger>;
type DevContextMenuTriggerProps = ShadcnContextMenuTriggerProps & DevProps & { children?: React.ReactNode };

export const ContextMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuTrigger>,
  DevContextMenuTriggerProps
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
      <ShadcnContextMenuTrigger ref={ref} {...props}>
        {children}
      </ShadcnContextMenuTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-trigger"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuTrigger ref={ref} {...props}>
        {children}
      </ShadcnContextMenuTrigger>
    </Container>
  );
});

ContextMenuTrigger.displayName = 'DevContextMenuTrigger';

// ContextMenuContent component
type ShadcnContextMenuContentProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuContent>;
type DevContextMenuContentProps = ShadcnContextMenuContentProps & DevProps & { children?: React.ReactNode };

export const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuContent>,
  DevContextMenuContentProps
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
      <ShadcnContextMenuContent ref={ref} {...props}>
        {children}
      </ShadcnContextMenuContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-content"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuContent ref={ref} {...props}>
        {children}
      </ShadcnContextMenuContent>
    </Container>
  );
});

ContextMenuContent.displayName = 'DevContextMenuContent';

// ContextMenuItem component
type ShadcnContextMenuItemProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuItem>;
type DevContextMenuItemProps = ShadcnContextMenuItemProps & DevProps & { children?: React.ReactNode };

export const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuItem>,
  DevContextMenuItemProps
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
      <ShadcnContextMenuItem ref={ref} {...props}>
        {children}
      </ShadcnContextMenuItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-item"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuItem ref={ref} {...props}>
        {children}
      </ShadcnContextMenuItem>
    </Container>
  );
});

ContextMenuItem.displayName = 'DevContextMenuItem';

// ContextMenuCheckboxItem component
type ShadcnContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuCheckboxItem>;
type DevContextMenuCheckboxItemProps = ShadcnContextMenuCheckboxItemProps & DevProps & { children?: React.ReactNode };

export const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuCheckboxItem>,
  DevContextMenuCheckboxItemProps
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
      <ShadcnContextMenuCheckboxItem ref={ref} {...props}>
        {children}
      </ShadcnContextMenuCheckboxItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-checkbox-item"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuCheckboxItem ref={ref} {...props}>
        {children}
      </ShadcnContextMenuCheckboxItem>
    </Container>
  );
});

ContextMenuCheckboxItem.displayName = 'DevContextMenuCheckboxItem';

// ContextMenuRadioGroup component
type ShadcnContextMenuRadioGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuRadioGroup>;
type DevContextMenuRadioGroupProps = ShadcnContextMenuRadioGroupProps & DevProps & { children?: React.ReactNode };

export const ContextMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuRadioGroup>,
  DevContextMenuRadioGroupProps
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
      <ShadcnContextMenuRadioGroup ref={ref} {...props}>
        {children}
      </ShadcnContextMenuRadioGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-radio-group"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuRadioGroup ref={ref} {...props}>
        {children}
      </ShadcnContextMenuRadioGroup>
    </Container>
  );
});

ContextMenuRadioGroup.displayName = 'DevContextMenuRadioGroup';

// ContextMenuRadioItem component
type ShadcnContextMenuRadioItemProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuRadioItem>;
type DevContextMenuRadioItemProps = ShadcnContextMenuRadioItemProps & DevProps & { children?: React.ReactNode };

export const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuRadioItem>,
  DevContextMenuRadioItemProps
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
      <ShadcnContextMenuRadioItem ref={ref} {...props}>
        {children}
      </ShadcnContextMenuRadioItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-radio-item"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuRadioItem ref={ref} {...props}>
        {children}
      </ShadcnContextMenuRadioItem>
    </Container>
  );
});

ContextMenuRadioItem.displayName = 'DevContextMenuRadioItem';

// ContextMenuLabel component
type ShadcnContextMenuLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuLabel>;
type DevContextMenuLabelProps = ShadcnContextMenuLabelProps & DevProps & { children?: React.ReactNode };

export const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuLabel>,
  DevContextMenuLabelProps
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
      <ShadcnContextMenuLabel ref={ref} {...props}>
        {children}
      </ShadcnContextMenuLabel>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-label"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuLabel ref={ref} {...props}>
        {children}
      </ShadcnContextMenuLabel>
    </Container>
  );
});

ContextMenuLabel.displayName = 'DevContextMenuLabel';

// ContextMenuSeparator component
type ShadcnContextMenuSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuSeparator>;
type DevContextMenuSeparatorProps = ShadcnContextMenuSeparatorProps & DevProps;

export const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuSeparator>,
  DevContextMenuSeparatorProps
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
    return <ShadcnContextMenuSeparator ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-separator"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuSeparator ref={ref} {...props} />
    </Container>
  );
});

ContextMenuSeparator.displayName = 'DevContextMenuSeparator';

// ContextMenuGroup component
type ShadcnContextMenuGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuGroup>;
type DevContextMenuGroupProps = ShadcnContextMenuGroupProps & DevProps & { children?: React.ReactNode };

export const ContextMenuGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuGroup>,
  DevContextMenuGroupProps
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
      <ShadcnContextMenuGroup ref={ref} {...props}>
        {children}
      </ShadcnContextMenuGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-group"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuGroup ref={ref} {...props}>
        {children}
      </ShadcnContextMenuGroup>
    </Container>
  );
});

ContextMenuGroup.displayName = 'DevContextMenuGroup';

// ContextMenuPortal component (FC type)
type ShadcnContextMenuPortalProps = React.ComponentProps<typeof ShadcnContextMenuPortal>;
type DevContextMenuPortalProps = ShadcnContextMenuPortalProps & DevProps & { children?: React.ReactNode };

export const ContextMenuPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevContextMenuPortalProps) => {
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
      <ShadcnContextMenuPortal {...props}>
        {children}
      </ShadcnContextMenuPortal>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-portal"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuPortal {...props}>
        {children}
      </ShadcnContextMenuPortal>
    </Container>
  );
};

ContextMenuPortal.displayName = 'DevContextMenuPortal';

// ContextMenuSub component (FC type)
type ShadcnContextMenuSubProps = React.ComponentProps<typeof ShadcnContextMenuSub>;
type DevContextMenuSubProps = ShadcnContextMenuSubProps & DevProps & { children?: React.ReactNode };

export const ContextMenuSub = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevContextMenuSubProps) => {
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
      <ShadcnContextMenuSub {...props}>
        {children}
      </ShadcnContextMenuSub>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-sub"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuSub {...props}>
        {children}
      </ShadcnContextMenuSub>
    </Container>
  );
};

ContextMenuSub.displayName = 'DevContextMenuSub';

// ContextMenuSubTrigger component
type ShadcnContextMenuSubTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuSubTrigger>;
type DevContextMenuSubTriggerProps = ShadcnContextMenuSubTriggerProps & DevProps & { children?: React.ReactNode };

export const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuSubTrigger>,
  DevContextMenuSubTriggerProps
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
      <ShadcnContextMenuSubTrigger ref={ref} {...props}>
        {children}
      </ShadcnContextMenuSubTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-sub-trigger"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuSubTrigger ref={ref} {...props}>
        {children}
      </ShadcnContextMenuSubTrigger>
    </Container>
  );
});

ContextMenuSubTrigger.displayName = 'DevContextMenuSubTrigger';

// ContextMenuSubContent component
type ShadcnContextMenuSubContentProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuSubContent>;
type DevContextMenuSubContentProps = ShadcnContextMenuSubContentProps & DevProps & { children?: React.ReactNode };

export const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuSubContent>,
  DevContextMenuSubContentProps
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
      <ShadcnContextMenuSubContent ref={ref} {...props}>
        {children}
      </ShadcnContextMenuSubContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-sub-content"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuSubContent ref={ref} {...props}>
        {children}
      </ShadcnContextMenuSubContent>
    </Container>
  );
});

ContextMenuSubContent.displayName = 'DevContextMenuSubContent';

// ContextMenuShortcut component
type ShadcnContextMenuShortcutProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuShortcut>;
type DevContextMenuShortcutProps = ShadcnContextMenuShortcutProps & DevProps & { children?: React.ReactNode };

export const ContextMenuShortcut = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevContextMenuShortcutProps) => {
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
      <ShadcnContextMenuShortcut {...props}>
        {children}
      </ShadcnContextMenuShortcut>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-context-menu-shortcut"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnContextMenuShortcut {...props}>
        {children}
      </ShadcnContextMenuShortcut>
    </Container>
  );
};

ContextMenuShortcut.displayName = 'DevContextMenuShortcut';

// Export types
export { 
  type DevContextMenuProps, 
  type DevContextMenuTriggerProps, 
  type DevContextMenuContentProps, 
  type DevContextMenuItemProps, 
  type DevContextMenuCheckboxItemProps, 
  type DevContextMenuRadioGroupProps, 
  type DevContextMenuRadioItemProps, 
  type DevContextMenuLabelProps, 
  type DevContextMenuSeparatorProps, 
  type DevContextMenuGroupProps, 
  type DevContextMenuPortalProps, 
  type DevContextMenuSubProps, 
  type DevContextMenuSubTriggerProps, 
  type DevContextMenuSubContentProps, 
  type DevContextMenuShortcutProps 
};