// src/lib/dev-container/shadcn/Switch.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Switch as ShadcnSwitch } from '../../../components/ui/switch';

// Switch component
type ShadcnSwitchProps = React.ComponentPropsWithoutRef<typeof ShadcnSwitch>;
type DevSwitchProps = ShadcnSwitchProps & DevProps;

export const Switch = React.forwardRef<
  React.ElementRef<typeof ShadcnSwitch>,
  DevSwitchProps
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
    return <ShadcnSwitch ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-switch"
            {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSwitch ref={ref} {...props} />
    </Container>
  );
});

Switch.displayName = 'DevSwitch';

export { type DevSwitchProps };