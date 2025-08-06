// src/lib/dev-container/shadcn/Menubar.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Menubar as ShadcnMenubar,
  MenubarMenu as ShadcnMenubarMenu,
  MenubarTrigger as ShadcnMenubarTrigger,
  MenubarContent as ShadcnMenubarContent,
  MenubarItem as ShadcnMenubarItem,
  MenubarSeparator as ShadcnMenubarSeparator,
  MenubarLabel as ShadcnMenubarLabel,
  MenubarCheckboxItem as ShadcnMenubarCheckboxItem,
  MenubarRadioGroup as ShadcnMenubarRadioGroup,
  MenubarRadioItem as ShadcnMenubarRadioItem,
  MenubarPortal as ShadcnMenubarPortal,
  MenubarSubContent as ShadcnMenubarSubContent,
  MenubarSubTrigger as ShadcnMenubarSubTrigger,
  MenubarGroup as ShadcnMenubarGroup,
  MenubarSub as ShadcnMenubarSub,
  MenubarShortcut as ShadcnMenubarShortcut,
} from '../../../components/ui/menubar';

// Menubar root component
type ShadcnMenubarProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubar>;
interface DevMenubarProps extends ShadcnMenubarProps, DevProps {
  children?: React.ReactNode;
}

export const Menubar = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubar>,
  DevMenubarProps
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
      <ShadcnMenubar ref={ref} {...props}>
        {children}
      </ShadcnMenubar>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubar ref={ref} {...props}>
        {children}
      </ShadcnMenubar>
    </Container>
  );
});

Menubar.displayName = 'DevMenubar';

// MenubarMenu component
type ShadcnMenubarMenuProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarMenu>;
interface DevMenubarMenuProps extends ShadcnMenubarMenuProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarMenu = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevMenubarMenuProps) => {
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
      <ShadcnMenubarMenu {...props}>
        {children}
      </ShadcnMenubarMenu>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-menu"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarMenu {...props}>
        {children}
      </ShadcnMenubarMenu>
    </Container>
  );
};

MenubarMenu.displayName = 'DevMenubarMenu';

// MenubarTrigger component
type ShadcnMenubarTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarTrigger>;
interface DevMenubarTriggerProps extends ShadcnMenubarTriggerProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarTrigger>,
  DevMenubarTriggerProps
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
      <ShadcnMenubarTrigger ref={ref} {...props}>
        {children}
      </ShadcnMenubarTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-trigger"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarTrigger ref={ref} {...props}>
        {children}
      </ShadcnMenubarTrigger>
    </Container>
  );
});

MenubarTrigger.displayName = 'DevMenubarTrigger';

// MenubarContent component
type ShadcnMenubarContentProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarContent>;
interface DevMenubarContentProps extends ShadcnMenubarContentProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarContent = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarContent>,
  DevMenubarContentProps
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
      <ShadcnMenubarContent ref={ref} {...props}>
        {children}
      </ShadcnMenubarContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-content"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarContent ref={ref} {...props}>
        {children}
      </ShadcnMenubarContent>
    </Container>
  );
});

MenubarContent.displayName = 'DevMenubarContent';

// MenubarItem component
type ShadcnMenubarItemProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarItem>;
interface DevMenubarItemProps extends ShadcnMenubarItemProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarItem = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarItem>,
  DevMenubarItemProps
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
      <ShadcnMenubarItem ref={ref} {...props}>
        {children}
      </ShadcnMenubarItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-item"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarItem ref={ref} {...props}>
        {children}
      </ShadcnMenubarItem>
    </Container>
  );
});

MenubarItem.displayName = 'DevMenubarItem';

// MenubarCheckboxItem component
type ShadcnMenubarCheckboxItemProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarCheckboxItem>;
interface DevMenubarCheckboxItemProps extends ShadcnMenubarCheckboxItemProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarCheckboxItem>,
  DevMenubarCheckboxItemProps
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
      <ShadcnMenubarCheckboxItem ref={ref} {...props}>
        {children}
      </ShadcnMenubarCheckboxItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-checkbox-item"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarCheckboxItem ref={ref} {...props}>
        {children}
      </ShadcnMenubarCheckboxItem>
    </Container>
  );
});

MenubarCheckboxItem.displayName = 'DevMenubarCheckboxItem';

// MenubarRadioGroup component
type ShadcnMenubarRadioGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarRadioGroup>;
interface DevMenubarRadioGroupProps extends ShadcnMenubarRadioGroupProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarRadioGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarRadioGroup>,
  DevMenubarRadioGroupProps
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
      <ShadcnMenubarRadioGroup ref={ref} {...props}>
        {children}
      </ShadcnMenubarRadioGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-radio-group"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarRadioGroup ref={ref} {...props}>
        {children}
      </ShadcnMenubarRadioGroup>
    </Container>
  );
});

MenubarRadioGroup.displayName = 'DevMenubarRadioGroup';

// MenubarRadioItem component
type ShadcnMenubarRadioItemProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarRadioItem>;
interface DevMenubarRadioItemProps extends ShadcnMenubarRadioItemProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarRadioItem>,
  DevMenubarRadioItemProps
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
      <ShadcnMenubarRadioItem ref={ref} {...props}>
        {children}
      </ShadcnMenubarRadioItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-radio-item"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarRadioItem ref={ref} {...props}>
        {children}
      </ShadcnMenubarRadioItem>
    </Container>
  );
});

MenubarRadioItem.displayName = 'DevMenubarRadioItem';

// MenubarLabel component
type ShadcnMenubarLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarLabel>;
interface DevMenubarLabelProps extends ShadcnMenubarLabelProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarLabel>,
  DevMenubarLabelProps
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
      <ShadcnMenubarLabel ref={ref} {...props}>
        {children}
      </ShadcnMenubarLabel>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-label"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarLabel ref={ref} {...props}>
        {children}
      </ShadcnMenubarLabel>
    </Container>
  );
});

MenubarLabel.displayName = 'DevMenubarLabel';

// MenubarSeparator component
type ShadcnMenubarSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarSeparator>;
interface DevMenubarSeparatorProps extends ShadcnMenubarSeparatorProps, DevProps {}

export const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarSeparator>,
  DevMenubarSeparatorProps
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
    return <ShadcnMenubarSeparator ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-separator"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarSeparator ref={ref} {...props} />
    </Container>
  );
});

MenubarSeparator.displayName = 'DevMenubarSeparator';

// MenubarGroup component
type ShadcnMenubarGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarGroup>;
interface DevMenubarGroupProps extends ShadcnMenubarGroupProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarGroup = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevMenubarGroupProps) => {
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
      <ShadcnMenubarGroup {...props}>
        {children}
      </ShadcnMenubarGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-group"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarGroup {...props}>
        {children}
      </ShadcnMenubarGroup>
    </Container>
  );
};

MenubarGroup.displayName = 'DevMenubarGroup';

// MenubarSub component
type ShadcnMenubarSubProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarSub>;
interface DevMenubarSubProps extends ShadcnMenubarSubProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarSub = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevMenubarSubProps) => {
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
      <ShadcnMenubarSub {...props}>
        {children}
      </ShadcnMenubarSub>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-sub"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarSub {...props}>
        {children}
      </ShadcnMenubarSub>
    </Container>
  );
};

MenubarSub.displayName = 'DevMenubarSub';

// MenubarSubTrigger component
type ShadcnMenubarSubTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarSubTrigger>;
interface DevMenubarSubTriggerProps extends ShadcnMenubarSubTriggerProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarSubTrigger>,
  DevMenubarSubTriggerProps
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
      <ShadcnMenubarSubTrigger ref={ref} {...props}>
        {children}
      </ShadcnMenubarSubTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-sub-trigger"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarSubTrigger ref={ref} {...props}>
        {children}
      </ShadcnMenubarSubTrigger>
    </Container>
  );
});

MenubarSubTrigger.displayName = 'DevMenubarSubTrigger';

// MenubarSubContent component
type ShadcnMenubarSubContentProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarSubContent>;
interface DevMenubarSubContentProps extends ShadcnMenubarSubContentProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarSubContent>,
  DevMenubarSubContentProps
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
      <ShadcnMenubarSubContent ref={ref} {...props}>
        {children}
      </ShadcnMenubarSubContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-sub-content"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarSubContent ref={ref} {...props}>
        {children}
      </ShadcnMenubarSubContent>
    </Container>
  );
});

MenubarSubContent.displayName = 'DevMenubarSubContent';

// MenubarPortal component
type ShadcnMenubarPortalProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarPortal>;
interface DevMenubarPortalProps extends ShadcnMenubarPortalProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevMenubarPortalProps) => {
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
      <ShadcnMenubarPortal {...props}>
        {children}
      </ShadcnMenubarPortal>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-portal"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarPortal {...props}>
        {children}
      </ShadcnMenubarPortal>
    </Container>
  );
};

MenubarPortal.displayName = 'DevMenubarPortal';

// MenubarShortcut component
type ShadcnMenubarShortcutProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarShortcut>;
interface DevMenubarShortcutProps extends ShadcnMenubarShortcutProps, DevProps {
  children?: React.ReactNode;
}

export const MenubarShortcut = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevMenubarShortcutProps) => {
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
      <ShadcnMenubarShortcut {...props}>
        {children}
      </ShadcnMenubarShortcut>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-menubar-shortcut"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnMenubarShortcut {...props}>
        {children}
      </ShadcnMenubarShortcut>
    </Container>
  );
};

MenubarShortcut.displayName = 'DevMenubarShortcut';

// Export prop types
export {
  type DevMenubarProps,
  type DevMenubarMenuProps,
  type DevMenubarTriggerProps,
  type DevMenubarContentProps,
  type DevMenubarItemProps,
  type DevMenubarCheckboxItemProps,
  type DevMenubarRadioGroupProps,
  type DevMenubarRadioItemProps,
  type DevMenubarLabelProps,
  type DevMenubarSeparatorProps,
  type DevMenubarGroupProps,
  type DevMenubarSubProps,
  type DevMenubarSubTriggerProps,
  type DevMenubarSubContentProps,
  type DevMenubarPortalProps,
  type DevMenubarShortcutProps,
};