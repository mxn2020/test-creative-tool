// src/lib/dev-container/shadcn/Slider.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Slider as ShadcnSlider } from '../../../components/ui/slider';

// Slider component
type ShadcnSliderProps = React.ComponentPropsWithoutRef<typeof ShadcnSlider>;
type DevSliderProps = ShadcnSliderProps & DevProps;

export const Slider = React.forwardRef<
  React.ElementRef<typeof ShadcnSlider>,
  DevSliderProps
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
    return <ShadcnSlider ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-slider"
            {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnSlider ref={ref} {...props} />
    </Container>
  );
});

Slider.displayName = 'DevSlider';

export { type DevSliderProps };