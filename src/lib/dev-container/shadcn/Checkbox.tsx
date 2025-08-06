// src/lib/dev-container/shadcn/Checkbox.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Checkbox as ShadcnCheckbox } from '../../../components/ui/checkbox';

type ShadcnCheckboxProps = React.ComponentPropsWithoutRef<typeof ShadcnCheckbox>;
type DevCheckboxProps = ShadcnCheckboxProps & DevProps & { children?: React.ReactNode };

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof ShadcnCheckbox>,
  DevCheckboxProps
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
      <ShadcnCheckbox ref={ref} {...props}>
        {children}
      </ShadcnCheckbox>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-checkbox"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCheckbox ref={ref} {...props}>
        {children}
      </ShadcnCheckbox>
    </Container>
  );
});

Checkbox.displayName = 'DevCheckbox';