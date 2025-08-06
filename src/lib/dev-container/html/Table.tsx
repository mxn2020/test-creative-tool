// src/lib/dev-container/geenius/Table.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

interface DevTableProps extends React.HTMLAttributes<HTMLTableElement>, DevProps {
  children?: React.ReactNode;
}

interface DevTHeadProps extends React.HTMLAttributes<HTMLTableSectionElement>, DevProps {
  children?: React.ReactNode;
}

interface DevTBodyProps extends React.HTMLAttributes<HTMLTableSectionElement>, DevProps {
  children?: React.ReactNode;
}

interface DevTFootProps extends React.HTMLAttributes<HTMLTableSectionElement>, DevProps {
  children?: React.ReactNode;
}

interface DevTrProps extends React.HTMLAttributes<HTMLTableRowElement>, DevProps {
  children?: React.ReactNode;
}

interface DevThProps extends React.ThHTMLAttributes<HTMLTableCellElement>, DevProps {
  children?: React.ReactNode;
}

interface DevTdProps extends React.TdHTMLAttributes<HTMLTableCellElement>, DevProps {
  children?: React.ReactNode;
}

export const Table = React.forwardRef<HTMLTableElement, DevTableProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (devId === "noID" || !shouldContainerize) {
      return (
        <table ref={ref} {...props}>
          {children}
        </table>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-table'
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <table ref={ref} {...props}>
          {children}
        </table>
      </Container>
    );
  }
);

export const THead = React.forwardRef<HTMLTableSectionElement, DevTHeadProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (devId === "noID" || !shouldContainerize) {
      return (
        <thead ref={ref} {...props}>
          {children}
        </thead>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-table-head'
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <thead ref={ref} {...props}>
          {children}
        </thead>
      </Container>
    );
  }
);

export const TBody = React.forwardRef<HTMLTableSectionElement, DevTBodyProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (devId === "noID" || !shouldContainerize) {
      return (
        <tbody ref={ref} {...props}>
          {children}
        </tbody>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-table-body'
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <tbody ref={ref} {...props}>
          {children}
        </tbody>
      </Container>
    );
  }
);

export const TFoot = React.forwardRef<HTMLTableSectionElement, DevTFootProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (devId === "noID" || !shouldContainerize) {
      return (
        <tfoot ref={ref} {...props}>
          {children}
        </tfoot>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-table-footer'
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <tfoot ref={ref} {...props}>
          {children}
        </tfoot>
      </Container>
    );
  }
);

export const Tr = React.forwardRef<HTMLTableRowElement, DevTrProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (devId === "noID" || !shouldContainerize) {
      return (
        <tr ref={ref} {...props}>
          {children}
        </tr>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-table-row'
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <tr ref={ref} {...props}>
          {children}
        </tr>
      </Container>
    );
  }
);

export const Th = React.forwardRef<HTMLTableCellElement, DevThProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (devId === "noID" || !shouldContainerize) {
      return (
        <th ref={ref} {...props}>
          {children}
        </th>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-table-header'
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <th ref={ref} {...props}>
          {children}
        </th>
      </Container>
    );
  }
);

export const Td = React.forwardRef<HTMLTableCellElement, DevTdProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    if (devId === "noID" || !shouldContainerize) {
      return (
        <td ref={ref} {...props}>
          {children}
        </td>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-table-data-cell'
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <td ref={ref} {...props}>
          {children}
        </td>
      </Container>
    );
  }
);

Table.displayName = 'DevTable';
THead.displayName = 'DevTHead';
TBody.displayName = 'DevTBody';
TFoot.displayName = 'DevTFoot';
Tr.displayName = 'DevTr';
Th.displayName = 'DevTh';
Td.displayName = 'DevTd';

export { 
  type DevTableProps, 
  type DevTHeadProps, 
  type DevTBodyProps, 
  type DevTFootProps,
  type DevTrProps,
  type DevThProps,
  type DevTdProps
};