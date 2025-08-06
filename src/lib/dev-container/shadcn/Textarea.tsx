// src/lib/dev-container/shadcn/Textarea.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Textarea as ShadcnTextarea } from '../../../components/ui/textarea';

// Textarea component
type ShadcnTextareaProps = React.ComponentPropsWithoutRef<typeof ShadcnTextarea>;
type DevTextareaProps = ShadcnTextareaProps & DevProps;

export const Textarea = React.forwardRef<
  React.ElementRef<typeof ShadcnTextarea>,
  DevTextareaProps
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
    return <ShadcnTextarea ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-textarea"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTextarea ref={ref} {...props} />
    </Container>
  );
});

Textarea.displayName = 'DevTextarea';

export { type DevTextareaProps };