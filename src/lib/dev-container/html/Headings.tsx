// src/lib/dev-container/geenius/Headings.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

interface DevHeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, DevProps {
  children?: React.ReactNode;
}

export const H1 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
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
        <h1 ref={ref} {...props}>
          {children}
        </h1>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-h1" // Connect to component library definition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <h1 ref={ref} {...props}>
          {children}
        </h1>
      </Container>
    );
  }
);

export const H2 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (!devId || devId === "noID" || !shouldContainerize) {
      return (
        <h2 ref={ref} {...props}>
          {children}
        </h2>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-h2"
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <h2 ref={ref} {...props}>
          {children}
        </h2>
      </Container>
    );
  }
);

export const H3 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (!devId || devId === "noID" || !shouldContainerize) {
      return (
        <h3 ref={ref} {...props}>
          {children}
        </h3>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-h3" // Connect to component library definition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <h3 ref={ref} {...props}>
          {children}
        </h3>
      </Container>
    );
  }
);

export const H4 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (!devId || devId === "noID" || !shouldContainerize) {
      return (
        <h4 ref={ref} {...props}>
          {children}
        </h4>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-h4" // Connect to component library definition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <h4 ref={ref} {...props}>
          {children}
        </h4>
      </Container>
    );
  }
);

export const H5 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (!devId || devId === "noID" || !shouldContainerize) {
      return (
        <h5 ref={ref} {...props}>
          {children}
        </h5>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-h5" // Connect to component library definition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <h5 ref={ref} {...props}>
          {children}
        </h5>
      </Container>
    );
  }
);

export const H6 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (!devId || devId === "noID" || !shouldContainerize) {
      return (
        <h6 ref={ref} {...props}>
          {children}
        </h6>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-h6" // Connect to component library definition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <h6 ref={ref} {...props}>
          {children}
        </h6>
      </Container>
    );
  }
);

H1.displayName = 'DevH1';
H2.displayName = 'DevH2';
H3.displayName = 'DevH3';
H4.displayName = 'DevH4';
H5.displayName = 'DevH5';
H6.displayName = 'DevH6';

export { type DevHeadingProps };