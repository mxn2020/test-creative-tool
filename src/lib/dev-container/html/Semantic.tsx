// src/lib/dev-container/geenius/Semantic.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

// Article
interface DevArticleProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Article = React.forwardRef<HTMLElement, DevArticleProps>(
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
        <article ref={ref} {...props}>
          {children}
        </article>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-article" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <article ref={ref} {...props}>
          {children}
        </article>
      </Container>
    );
  }
);

// Aside
interface DevAsideProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Aside = React.forwardRef<HTMLElement, DevAsideProps>(
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
        <aside ref={ref} {...props}>
          {children}
        </aside>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-aside" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <aside ref={ref} {...props}>
          {children}
        </aside>
      </Container>
    );
  }
);

// Main
interface DevMainProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Main = React.forwardRef<HTMLElement, DevMainProps>(
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
        <main ref={ref} {...props}>
          {children}
        </main>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-main" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <main ref={ref} {...props}>
          {children}
        </main>
      </Container>
    );
  }
);

Article.displayName = 'DevArticle';
Aside.displayName = 'DevAside';
// Figure
interface DevFigureProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Figure = React.forwardRef<HTMLElement, DevFigureProps>(
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
        <figure ref={ref} {...props}>
          {children}
        </figure>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-figure" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <figure ref={ref} {...props}>
          {children}
        </figure>
      </Container>
    );
  }
);

// Figcaption
interface DevFigcaptionProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Figcaption = React.forwardRef<HTMLElement, DevFigcaptionProps>(
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
        <figcaption ref={ref} {...props}>
          {children}
        </figcaption>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId="dev-figcaption" // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <figcaption ref={ref} {...props}>
          {children}
        </figcaption>
      </Container>
    );
  }
);

Main.displayName = 'DevMain';
Figure.displayName = 'DevFigure';
Figcaption.displayName = 'DevFigcaption';

export { type DevArticleProps, type DevAsideProps, type DevMainProps, type DevFigureProps, type DevFigcaptionProps };