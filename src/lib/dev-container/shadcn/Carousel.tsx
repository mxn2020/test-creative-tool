// src/lib/dev-container/shadcn/Carousel.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Carousel as ShadcnCarousel,
  CarouselContent as ShadcnCarouselContent,
  CarouselItem as ShadcnCarouselItem,
  CarouselPrevious as ShadcnCarouselPrevious,
  CarouselNext as ShadcnCarouselNext,
  type CarouselApi
} from '../../../components/ui/carousel';

type ShadcnCarouselProps = React.ComponentPropsWithoutRef<typeof ShadcnCarousel>;
type ShadcnCarouselContentProps = React.ComponentPropsWithoutRef<typeof ShadcnCarouselContent>;
type ShadcnCarouselItemProps = React.ComponentPropsWithoutRef<typeof ShadcnCarouselItem>;
type ShadcnCarouselPreviousProps = React.ComponentPropsWithoutRef<typeof ShadcnCarouselPrevious>;
type ShadcnCarouselNextProps = React.ComponentPropsWithoutRef<typeof ShadcnCarouselNext>;

type DevCarouselProps = ShadcnCarouselProps & DevProps & { children?: React.ReactNode };
type DevCarouselContentProps = ShadcnCarouselContentProps & DevProps & { children?: React.ReactNode };
type DevCarouselItemProps = ShadcnCarouselItemProps & DevProps & { children?: React.ReactNode };
type DevCarouselPreviousProps = ShadcnCarouselPreviousProps & DevProps & { children?: React.ReactNode };
type DevCarouselNextProps = ShadcnCarouselNextProps & DevProps & { children?: React.ReactNode };

export const Carousel = React.forwardRef<
  React.ElementRef<typeof ShadcnCarousel>,
  DevCarouselProps
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
      <ShadcnCarousel ref={ref} {...props}>
        {children}
      </ShadcnCarousel>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-carousel" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCarousel ref={ref} {...props}>
        {children}
      </ShadcnCarousel>
    </Container>
  );
});

Carousel.displayName = 'DevCarousel';

export const CarouselContent = React.forwardRef<
  React.ElementRef<typeof ShadcnCarouselContent>,
  DevCarouselContentProps
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
      <ShadcnCarouselContent ref={ref} {...props}>
        {children}
      </ShadcnCarouselContent>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-carousel-content" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCarouselContent ref={ref} {...props}>
        {children}
      </ShadcnCarouselContent>
    </Container>
  );
});

CarouselContent.displayName = 'DevCarouselContent';

export const CarouselItem = React.forwardRef<
  React.ElementRef<typeof ShadcnCarouselItem>,
  DevCarouselItemProps
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
      <ShadcnCarouselItem ref={ref} {...props}>
        {children}
      </ShadcnCarouselItem>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-carousel-item" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCarouselItem ref={ref} {...props}>
        {children}
      </ShadcnCarouselItem>
    </Container>
  );
});

CarouselItem.displayName = 'DevCarouselItem';

export const CarouselPrevious = React.forwardRef<
  React.ElementRef<typeof ShadcnCarouselPrevious>,
  DevCarouselPreviousProps
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
      <ShadcnCarouselPrevious ref={ref} {...props}>
        {children}
      </ShadcnCarouselPrevious>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-carousel-previous" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCarouselPrevious ref={ref} {...props}>
        {children}
      </ShadcnCarouselPrevious>
    </Container>
  );
});

CarouselPrevious.displayName = 'DevCarouselPrevious';

export const CarouselNext = React.forwardRef<
  React.ElementRef<typeof ShadcnCarouselNext>,
  DevCarouselNextProps
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
      <ShadcnCarouselNext ref={ref} {...props}>
        {children}
      </ShadcnCarouselNext>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-carousel-next" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCarouselNext ref={ref} {...props}>
        {children}
      </ShadcnCarouselNext>
    </Container>
  );
});

CarouselNext.displayName = 'DevCarouselNext';

// Export CarouselApi type for convenience
export type { CarouselApi };

// Export types
export { 
  type DevCarouselProps, 
  type DevCarouselContentProps, 
  type DevCarouselItemProps, 
  type DevCarouselPreviousProps, 
  type DevCarouselNextProps 
};