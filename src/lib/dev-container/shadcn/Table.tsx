// src/lib/dev-container/shadcn/Table.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Table as ShadcnTable,
  TableHeader as ShadcnTableHeader,
  TableBody as ShadcnTableBody,
  TableFooter as ShadcnTableFooter,
  TableHead as ShadcnTableHead,
  TableRow as ShadcnTableRow,
  TableCell as ShadcnTableCell,
  TableCaption as ShadcnTableCaption,
} from '../../../components/ui/table';

// Table root component
type ShadcnTableProps = React.ComponentPropsWithoutRef<typeof ShadcnTable>;
interface DevTableProps extends ShadcnTableProps, DevProps {
  children?: React.ReactNode;
}

export const Table = React.forwardRef<
  React.ElementRef<typeof ShadcnTable>,
  DevTableProps
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
      <ShadcnTable ref={ref} {...props}>
        {children}
      </ShadcnTable>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-table"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTable ref={ref} {...props}>
        {children}
      </ShadcnTable>
    </Container>
  );
});

Table.displayName = 'DevTable';

// TableHeader component
type ShadcnTableHeaderProps = React.ComponentPropsWithoutRef<typeof ShadcnTableHeader>;
interface DevTableHeaderProps extends ShadcnTableHeaderProps, DevProps {
  children?: React.ReactNode;
}

export const TableHeader = React.forwardRef<
  React.ElementRef<typeof ShadcnTableHeader>,
  DevTableHeaderProps
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
      <ShadcnTableHeader ref={ref} {...props}>
        {children}
      </ShadcnTableHeader>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-table-header"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTableHeader ref={ref} {...props}>
        {children}
      </ShadcnTableHeader>
    </Container>
  );
});

TableHeader.displayName = 'DevTableHeader';

// TableBody component
type ShadcnTableBodyProps = React.ComponentPropsWithoutRef<typeof ShadcnTableBody>;
interface DevTableBodyProps extends ShadcnTableBodyProps, DevProps {
  children?: React.ReactNode;
}

export const TableBody = React.forwardRef<
  React.ElementRef<typeof ShadcnTableBody>,
  DevTableBodyProps
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
      <ShadcnTableBody ref={ref} {...props}>
        {children}
      </ShadcnTableBody>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-table-body"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTableBody ref={ref} {...props}>
        {children}
      </ShadcnTableBody>
    </Container>
  );
});

TableBody.displayName = 'DevTableBody';

// TableFooter component
type ShadcnTableFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnTableFooter>;
interface DevTableFooterProps extends ShadcnTableFooterProps, DevProps {
  children?: React.ReactNode;
}

export const TableFooter = React.forwardRef<
  React.ElementRef<typeof ShadcnTableFooter>,
  DevTableFooterProps
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
      <ShadcnTableFooter ref={ref} {...props}>
        {children}
      </ShadcnTableFooter>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-table-footer"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTableFooter ref={ref} {...props}>
        {children}
      </ShadcnTableFooter>
    </Container>
  );
});

TableFooter.displayName = 'DevTableFooter';

// TableRow component
type ShadcnTableRowProps = React.ComponentPropsWithoutRef<typeof ShadcnTableRow>;
interface DevTableRowProps extends ShadcnTableRowProps, DevProps {
  children?: React.ReactNode;
}

export const TableRow = React.forwardRef<
  React.ElementRef<typeof ShadcnTableRow>,
  DevTableRowProps
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
      <ShadcnTableRow ref={ref} {...props}>
        {children}
      </ShadcnTableRow>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-table-row"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTableRow ref={ref} {...props}>
        {children}
      </ShadcnTableRow>
    </Container>
  );
});

TableRow.displayName = 'DevTableRow';

// TableHead component
type ShadcnTableHeadProps = React.ComponentPropsWithoutRef<typeof ShadcnTableHead>;
interface DevTableHeadProps extends ShadcnTableHeadProps, DevProps {
  children?: React.ReactNode;
}

export const TableHead = React.forwardRef<
  React.ElementRef<typeof ShadcnTableHead>,
  DevTableHeadProps
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
      <ShadcnTableHead ref={ref} {...props}>
        {children}
      </ShadcnTableHead>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-table-head"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTableHead ref={ref} {...props}>
        {children}
      </ShadcnTableHead>
    </Container>
  );
});

TableHead.displayName = 'DevTableHead';

// TableCell component
type ShadcnTableCellProps = React.ComponentPropsWithoutRef<typeof ShadcnTableCell>;
interface DevTableCellProps extends ShadcnTableCellProps, DevProps {
  children?: React.ReactNode;
}

export const TableCell = React.forwardRef<
  React.ElementRef<typeof ShadcnTableCell>,
  DevTableCellProps
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
      <ShadcnTableCell ref={ref} {...props}>
        {children}
      </ShadcnTableCell>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-table-cell"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTableCell ref={ref} {...props}>
        {children}
      </ShadcnTableCell>
    </Container>
  );
});

TableCell.displayName = 'DevTableCell';

// TableCaption component
type ShadcnTableCaptionProps = React.ComponentPropsWithoutRef<typeof ShadcnTableCaption>;
interface DevTableCaptionProps extends ShadcnTableCaptionProps, DevProps {
  children?: React.ReactNode;
}

export const TableCaption = React.forwardRef<
  React.ElementRef<typeof ShadcnTableCaption>,
  DevTableCaptionProps
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
      <ShadcnTableCaption ref={ref} {...props}>
        {children}
      </ShadcnTableCaption>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-table-caption"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnTableCaption ref={ref} {...props}>
        {children}
      </ShadcnTableCaption>
    </Container>
  );
});

TableCaption.displayName = 'DevTableCaption';

// Export prop types
export {
  type DevTableProps,
  type DevTableHeaderProps,
  type DevTableBodyProps,
  type DevTableFooterProps,
  type DevTableRowProps,
  type DevTableHeadProps,
  type DevTableCellProps,
  type DevTableCaptionProps,
};