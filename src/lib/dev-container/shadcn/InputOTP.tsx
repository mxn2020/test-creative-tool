// src/lib/dev-container/shadcn/InputOTP.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  InputOTP as ShadcnInputOTP,
  InputOTPGroup as ShadcnInputOTPGroup,
  InputOTPSlot as ShadcnInputOTPSlot,
  InputOTPSeparator as ShadcnInputOTPSeparator,
} from '../../../components/ui/input-otp';

// InputOTP root component
type ShadcnInputOTPProps = React.ComponentPropsWithoutRef<typeof ShadcnInputOTP>;
type DevInputOTPProps = ShadcnInputOTPProps & DevProps;

export const InputOTP = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTP>,
  DevInputOTPProps
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
    return <ShadcnInputOTP ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-input-otp"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnInputOTP ref={ref} {...props} />
    </Container>
  );
});

InputOTP.displayName = 'DevInputOTP';

// InputOTPGroup component
type ShadcnInputOTPGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnInputOTPGroup>;
type DevInputOTPGroupProps = ShadcnInputOTPGroupProps & DevProps & { children?: React.ReactNode };

export const InputOTPGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTPGroup>,
  DevInputOTPGroupProps
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
      <ShadcnInputOTPGroup ref={ref} {...props}>
        {children}
      </ShadcnInputOTPGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-input-otp-group"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnInputOTPGroup ref={ref} {...props}>
        {children}
      </ShadcnInputOTPGroup>
    </Container>
  );
});

InputOTPGroup.displayName = 'DevInputOTPGroup';

// InputOTPSlot component
type ShadcnInputOTPSlotProps = React.ComponentPropsWithoutRef<typeof ShadcnInputOTPSlot>;
type DevInputOTPSlotProps = ShadcnInputOTPSlotProps & DevProps;

export const InputOTPSlot = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTPSlot>,
  DevInputOTPSlotProps
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
    return <ShadcnInputOTPSlot ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-input-otp-slot"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnInputOTPSlot ref={ref} {...props} />
    </Container>
  );
});

InputOTPSlot.displayName = 'DevInputOTPSlot';

// InputOTPSeparator component
type ShadcnInputOTPSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnInputOTPSeparator>;
type DevInputOTPSeparatorProps = ShadcnInputOTPSeparatorProps & DevProps;

export const InputOTPSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTPSeparator>,
  DevInputOTPSeparatorProps
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
    return <ShadcnInputOTPSeparator ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-input-otp-separator"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnInputOTPSeparator ref={ref} {...props} />
    </Container>
  );
});

InputOTPSeparator.displayName = 'DevInputOTPSeparator';

// Export types
export { 
  type DevInputOTPProps,
  type DevInputOTPGroupProps,
  type DevInputOTPSlotProps,
  type DevInputOTPSeparatorProps
};