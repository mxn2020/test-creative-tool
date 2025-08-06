// src/lib/dev-container/shadcn/RadioGroup.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  RadioGroup as ShadcnRadioGroup,
  RadioGroupItem as ShadcnRadioGroupItem,
} from '../../../components/ui/radio-group';

// RadioGroup component
type ShadcnRadioGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnRadioGroup>;
type DevRadioGroupProps = ShadcnRadioGroupProps & DevProps & { children?: React.ReactNode };

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnRadioGroup>,
  DevRadioGroupProps
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
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnRadioGroup ref={ref} {...props}>
        {children}
      </ShadcnRadioGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId='dev-radio-group'
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnRadioGroup ref={ref} {...props}>
        {children}
      </ShadcnRadioGroup>
    </Container>
  );
});

RadioGroup.displayName = 'DevRadioGroup';

// RadioGroupItem component
type ShadcnRadioGroupItemProps = React.ComponentPropsWithoutRef<typeof ShadcnRadioGroupItem>;
type DevRadioGroupItemProps = ShadcnRadioGroupItemProps & DevProps;

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof ShadcnRadioGroupItem>,
  DevRadioGroupItemProps
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
  if (!devId || devId === "noID" || !shouldContainerize) {
    return <ShadcnRadioGroupItem ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId='dev-radio-group-item'
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnRadioGroupItem ref={ref} {...props} />
    </Container>
  );
});

RadioGroupItem.displayName = 'DevRadioGroupItem';

// Export dev prop types
export {
  type DevRadioGroupProps,
  type DevRadioGroupItemProps,
};