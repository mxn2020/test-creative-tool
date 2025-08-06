// src/lib/dev-container/geenius/Text.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

// Strong
interface DevStrongProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Strong = React.forwardRef<HTMLElement, DevStrongProps>(
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
        <strong ref={ref} {...props}>
          {children}
        </strong>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-strong" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <strong ref={ref} {...props}>
          {children}
        </strong>
      </Container>
    );
  }
);

// Emphasis
interface DevEmProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Em = React.forwardRef<HTMLElement, DevEmProps>(
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
        <em ref={ref} {...props}>
          {children}
        </em>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-em" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <em ref={ref} {...props}>
          {children}
        </em>
      </Container>
    );
  }
);

// Small
interface DevSmallProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Small = React.forwardRef<HTMLElement, DevSmallProps>(
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
        <small ref={ref} {...props}>
          {children}
        </small>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-small" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <small ref={ref} {...props}>
          {children}
        </small>
      </Container>
    );
  }
);

Strong.displayName = 'DevStrong';
Em.displayName = 'DevEm';
// Anchor
interface DevAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, DevProps {
  children?: React.ReactNode;
}

export const A = React.forwardRef<HTMLAnchorElement, DevAnchorProps>(
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
        <a ref={ref} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-anchor" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <a ref={ref} {...props}>
          {children}
        </a>
      </Container>
    );
  }
);

// Code
interface DevCodeProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Code = React.forwardRef<HTMLElement, DevCodeProps>(
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
        <code ref={ref} {...props}>
          {children}
        </code>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-code" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <code ref={ref} {...props}>
          {children}
        </code>
      </Container>
    );
  }
);

// Pre
interface DevPreProps extends React.HTMLAttributes<HTMLPreElement>, DevProps {
  children?: React.ReactNode;
}

export const Pre = React.forwardRef<HTMLPreElement, DevPreProps>(
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
        <pre ref={ref} {...props}>
          {children}
        </pre>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-pre" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <pre ref={ref} {...props}>
          {children}
        </pre>
      </Container>
    );
  }
);

// Blockquote
interface DevBlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>, DevProps {
  children?: React.ReactNode;
}

export const Blockquote = React.forwardRef<HTMLQuoteElement, DevBlockquoteProps>(
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
        <blockquote ref={ref} {...props}>
          {children}
        </blockquote>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-blockquote" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <blockquote ref={ref} {...props}>
          {children}
        </blockquote>
      </Container>
    );
  }
);

Small.displayName = 'DevSmall';

A.displayName = 'DevAnchor';
Code.displayName = 'DevCode';
Pre.displayName = 'DevPre';
Blockquote.displayName = 'DevBlockquote';

export { type DevStrongProps, type DevEmProps, type DevSmallProps, type DevAnchorProps, type DevCodeProps, type DevPreProps, type DevBlockquoteProps };