// src/lib/dev-container/shadcn/Command.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Command as ShadcnCommand,
  CommandDialog as ShadcnCommandDialog,
  CommandInput as ShadcnCommandInput,
  CommandList as ShadcnCommandList,
  CommandEmpty as ShadcnCommandEmpty,
  CommandGroup as ShadcnCommandGroup,
  CommandItem as ShadcnCommandItem,
  CommandShortcut as ShadcnCommandShortcut,
  CommandSeparator as ShadcnCommandSeparator,
} from '../../../components/ui/command';

// Command root component
type ShadcnCommandProps = React.ComponentPropsWithoutRef<typeof ShadcnCommand>;
type DevCommandProps = ShadcnCommandProps & DevProps & { children?: React.ReactNode };

export const Command = React.forwardRef<
  React.ElementRef<typeof ShadcnCommand>,
  DevCommandProps
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
      <ShadcnCommand ref={ref} {...props}>
        {children}
      </ShadcnCommand>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-command"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCommand ref={ref} {...props}>
        {children}
      </ShadcnCommand>
    </Container>
  );
});

Command.displayName = 'DevCommand';

// CommandDialog component
type ShadcnCommandDialogProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandDialog>;
type DevCommandDialogProps = ShadcnCommandDialogProps & DevProps & { children?: React.ReactNode };

export const CommandDialog = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevCommandDialogProps) => {
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
      <ShadcnCommandDialog {...props}>
        {children}
      </ShadcnCommandDialog>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-command-dialog"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCommandDialog {...props}>
        {children}
      </ShadcnCommandDialog>
    </Container>
  );
};

CommandDialog.displayName = 'DevCommandDialog';

// CommandInput component
type ShadcnCommandInputProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandInput>;
type DevCommandInputProps = ShadcnCommandInputProps & DevProps;

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandInput>,
  DevCommandInputProps
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
    return <ShadcnCommandInput ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-command-input"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCommandInput ref={ref} {...props} />
    </Container>
  );
});

CommandInput.displayName = 'DevCommandInput';

// CommandList component
type ShadcnCommandListProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandList>;
type DevCommandListProps = ShadcnCommandListProps & DevProps & { children?: React.ReactNode };

export const CommandList = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandList>,
  DevCommandListProps
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
      <ShadcnCommandList ref={ref} {...props}>
        {children}
      </ShadcnCommandList>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-command-list"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCommandList ref={ref} {...props}>
        {children}
      </ShadcnCommandList>
    </Container>
  );
});

CommandList.displayName = 'DevCommandList';

// CommandEmpty component
type ShadcnCommandEmptyProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandEmpty>;
type DevCommandEmptyProps = ShadcnCommandEmptyProps & DevProps & { children?: React.ReactNode };

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandEmpty>,
  DevCommandEmptyProps
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
      <ShadcnCommandEmpty ref={ref} {...props}>
        {children}
      </ShadcnCommandEmpty>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-command-empty"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCommandEmpty ref={ref} {...props}>
        {children}
      </ShadcnCommandEmpty>
    </Container>
  );
});

CommandEmpty.displayName = 'DevCommandEmpty';

// CommandGroup component
type ShadcnCommandGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandGroup>;
type DevCommandGroupProps = ShadcnCommandGroupProps & DevProps & { children?: React.ReactNode };

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandGroup>,
  DevCommandGroupProps
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
      <ShadcnCommandGroup ref={ref} {...props}>
        {children}
      </ShadcnCommandGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-command-group"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCommandGroup ref={ref} {...props}>
        {children}
      </ShadcnCommandGroup>
    </Container>
  );
});

CommandGroup.displayName = 'DevCommandGroup';

// CommandSeparator component
type ShadcnCommandSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandSeparator>;
type DevCommandSeparatorProps = ShadcnCommandSeparatorProps & DevProps;

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandSeparator>,
  DevCommandSeparatorProps
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
    return <ShadcnCommandSeparator ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-command-separator"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCommandSeparator ref={ref} {...props} />
    </Container>
  );
});

CommandSeparator.displayName = 'DevCommandSeparator';

// CommandItem component
type ShadcnCommandItemProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandItem>;
type DevCommandItemProps = ShadcnCommandItemProps & DevProps & { children?: React.ReactNode };

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandItem>,
  DevCommandItemProps
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
      <ShadcnCommandItem ref={ref} {...props}>
        {children}
      </ShadcnCommandItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-command-item"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCommandItem ref={ref} {...props}>
        {children}
      </ShadcnCommandItem>
    </Container>
  );
});

CommandItem.displayName = 'DevCommandItem';

// CommandShortcut component
type ShadcnCommandShortcutProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandShortcut>;
type DevCommandShortcutProps = ShadcnCommandShortcutProps & DevProps & { children?: React.ReactNode };

export const CommandShortcut = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevCommandShortcutProps) => {
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
      <ShadcnCommandShortcut {...props}>
        {children}
      </ShadcnCommandShortcut>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-command-shortcut"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCommandShortcut {...props}>
        {children}
      </ShadcnCommandShortcut>
    </Container>
  );
};

CommandShortcut.displayName = 'DevCommandShortcut';

// Export types
export { 
  type DevCommandProps, 
  type DevCommandDialogProps, 
  type DevCommandInputProps, 
  type DevCommandListProps, 
  type DevCommandEmptyProps, 
  type DevCommandGroupProps, 
  type DevCommandSeparatorProps, 
  type DevCommandItemProps, 
  type DevCommandShortcutProps 
};