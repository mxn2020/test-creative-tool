// src/lib/dev-container/shadcn/Select.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Select as ShadcnSelect,
  SelectGroup as ShadcnSelectGroup,
  SelectValue as ShadcnSelectValue,
  SelectTrigger as ShadcnSelectTrigger,
  SelectContent as ShadcnSelectContent,
  SelectLabel as ShadcnSelectLabel,
  SelectItem as ShadcnSelectItem,
  SelectSeparator as ShadcnSelectSeparator,
  SelectScrollUpButton as ShadcnSelectScrollUpButton,
  SelectScrollDownButton as ShadcnSelectScrollDownButton,
} from '../../../components/ui/select';

// Select root component (FC type)
type ShadcnSelectProps = React.ComponentProps<typeof ShadcnSelect>;
type DevSelectProps = ShadcnSelectProps & DevProps & { children?: React.ReactNode };

export const Select = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevSelectProps) => {
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
      <ShadcnSelect {...props}>
        {children}
      </ShadcnSelect>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-select"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSelect {...props}>
        {children}
      </ShadcnSelect>
    </Container>
  );
};

Select.displayName = 'DevSelect';

// SelectGroup component
type ShadcnSelectGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectGroup>;
type DevSelectGroupProps = ShadcnSelectGroupProps & DevProps & { children?: React.ReactNode };

export const SelectGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectGroup>,
  DevSelectGroupProps
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
      <ShadcnSelectGroup ref={ref} {...props}>
        {children}
      </ShadcnSelectGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-select-group"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSelectGroup ref={ref} {...props}>
        {children}
      </ShadcnSelectGroup>
    </Container>
  );
});

SelectGroup.displayName = 'DevSelectGroup';

// SelectValue component
type ShadcnSelectValueProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectValue>;
type DevSelectValueProps = ShadcnSelectValueProps & DevProps;

export const SelectValue = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectValue>,
  DevSelectValueProps
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
    return <ShadcnSelectValue ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-select-value"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSelectValue ref={ref} {...props} />
    </Container>
  );
});

SelectValue.displayName = 'DevSelectValue';

// SelectTrigger component
type ShadcnSelectTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectTrigger>;
type DevSelectTriggerProps = ShadcnSelectTriggerProps & DevProps & { children?: React.ReactNode };

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectTrigger>,
  DevSelectTriggerProps
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
      <ShadcnSelectTrigger ref={ref} {...props}>
        {children}
      </ShadcnSelectTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-select-trigger"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSelectTrigger ref={ref} {...props}>
        {children}
      </ShadcnSelectTrigger>
    </Container>
  );
});

SelectTrigger.displayName = 'DevSelectTrigger';

// SelectContent component
type ShadcnSelectContentProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectContent>;
type DevSelectContentProps = ShadcnSelectContentProps & DevProps & { children?: React.ReactNode };

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectContent>,
  DevSelectContentProps
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
      <ShadcnSelectContent ref={ref} {...props}>
        {children}
      </ShadcnSelectContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-select-content"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSelectContent ref={ref} {...props}>
        {children}
      </ShadcnSelectContent>
    </Container>
  );
});

SelectContent.displayName = 'DevSelectContent';

// SelectLabel component
type ShadcnSelectLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectLabel>;
type DevSelectLabelProps = ShadcnSelectLabelProps & DevProps & { children?: React.ReactNode };

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectLabel>,
  DevSelectLabelProps
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
      <ShadcnSelectLabel ref={ref} {...props}>
        {children}
      </ShadcnSelectLabel>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-select-label"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSelectLabel ref={ref} {...props}>
        {children}
      </ShadcnSelectLabel>
    </Container>
  );
});

SelectLabel.displayName = 'DevSelectLabel';

// SelectItem component
type ShadcnSelectItemProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectItem>;
type DevSelectItemProps = ShadcnSelectItemProps & DevProps & { children?: React.ReactNode };

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectItem>,
  DevSelectItemProps
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
      <ShadcnSelectItem ref={ref} {...props}>
        {children}
      </ShadcnSelectItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-select-item"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSelectItem ref={ref} {...props}>
        {children}
      </ShadcnSelectItem>
    </Container>
  );
});

SelectItem.displayName = 'DevSelectItem';

// SelectSeparator component
type ShadcnSelectSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectSeparator>;
type DevSelectSeparatorProps = ShadcnSelectSeparatorProps & DevProps;

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectSeparator>,
  DevSelectSeparatorProps
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
    return <ShadcnSelectSeparator ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-select-separator"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSelectSeparator ref={ref} {...props} />
    </Container>
  );
});

SelectSeparator.displayName = 'DevSelectSeparator';

// SelectScrollUpButton component
type ShadcnSelectScrollUpButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectScrollUpButton>;
type DevSelectScrollUpButtonProps = ShadcnSelectScrollUpButtonProps & DevProps & { children?: React.ReactNode };

export const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectScrollUpButton>,
  DevSelectScrollUpButtonProps
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
      <ShadcnSelectScrollUpButton ref={ref} {...props}>
        {children}
      </ShadcnSelectScrollUpButton>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-select-scroll-up-button"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSelectScrollUpButton ref={ref} {...props}>
        {children}
      </ShadcnSelectScrollUpButton>
    </Container>
  );
});

SelectScrollUpButton.displayName = 'DevSelectScrollUpButton';

// SelectScrollDownButton component
type ShadcnSelectScrollDownButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectScrollDownButton>;
type DevSelectScrollDownButtonProps = ShadcnSelectScrollDownButtonProps & DevProps & { children?: React.ReactNode };

export const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectScrollDownButton>,
  DevSelectScrollDownButtonProps
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
      <ShadcnSelectScrollDownButton ref={ref} {...props}>
        {children}
      </ShadcnSelectScrollDownButton>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-select-scroll-down-button"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSelectScrollDownButton ref={ref} {...props}>
        {children}
      </ShadcnSelectScrollDownButton>
    </Container>
  );
});

SelectScrollDownButton.displayName = 'DevSelectScrollDownButton';

export { 
  type DevSelectProps, 
  type DevSelectGroupProps, 
  type DevSelectValueProps, 
  type DevSelectTriggerProps, 
  type DevSelectContentProps, 
  type DevSelectLabelProps, 
  type DevSelectItemProps, 
  type DevSelectSeparatorProps, 
  type DevSelectScrollUpButtonProps, 
  type DevSelectScrollDownButtonProps 
};