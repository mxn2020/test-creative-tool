// src/lib/dev-container/shadcn/Chart.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  ChartContainer as ShadcnChartContainer,
  ChartTooltip as ShadcnChartTooltip,
  ChartTooltipContent as ShadcnChartTooltipContent,
  ChartLegend as ShadcnChartLegend,
  ChartLegendContent as ShadcnChartLegendContent,
  ChartStyle as ShadcnChartStyle,
  type ChartConfig
} from '../../../components/ui/chart';

type ShadcnChartContainerProps = React.ComponentPropsWithoutRef<typeof ShadcnChartContainer>;
type ShadcnChartTooltipContentProps = React.ComponentPropsWithoutRef<typeof ShadcnChartTooltipContent>;
type ShadcnChartLegendContentProps = React.ComponentPropsWithoutRef<typeof ShadcnChartLegendContent>;

type DevChartContainerProps = ShadcnChartContainerProps & DevProps;
type DevChartTooltipContentProps = ShadcnChartTooltipContentProps & DevProps;
type DevChartLegendContentProps = ShadcnChartLegendContentProps & DevProps;

export const ChartContainer = React.forwardRef<
  React.ElementRef<typeof ShadcnChartContainer>,
  DevChartContainerProps
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
    return <ShadcnChartContainer ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-chart-container" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnChartContainer ref={ref} {...props} />
    </Container>
  );
});

ChartContainer.displayName = 'DevChartContainer';

export const ChartTooltipContent = React.forwardRef<
  React.ElementRef<typeof ShadcnChartTooltipContent>,
  DevChartTooltipContentProps
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
    return <ShadcnChartTooltipContent ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-chart-tooltip-content" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnChartTooltipContent ref={ref} {...props} />
    </Container>
  );
});

ChartTooltipContent.displayName = 'DevChartTooltipContent';

export const ChartLegendContent = React.forwardRef<
  React.ElementRef<typeof ShadcnChartLegendContent>,
  DevChartLegendContentProps
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
    return <ShadcnChartLegendContent ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-chart-legend-content" // Reference to ComponentDefinition
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnChartLegendContent ref={ref} {...props} />
    </Container>
  );
});

ChartLegendContent.displayName = 'DevChartLegendContent';

// Export primitive components and types that don't need containerization
export const ChartTooltip = ShadcnChartTooltip;
export const ChartLegend = ShadcnChartLegend;
export const ChartStyle = ShadcnChartStyle;
export type { ChartConfig };

// Export types
export { type DevChartContainerProps, type DevChartTooltipContentProps, type DevChartLegendContentProps };