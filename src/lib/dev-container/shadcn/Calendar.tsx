// src/lib/dev-container/shadcn/Calendar.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Calendar as ShadcnCalendar, CalendarDayButton as ShadcnCalendarDayButton } from '../../../components/ui/calendar';

type ShadcnCalendarProps = React.ComponentPropsWithoutRef<typeof ShadcnCalendar>;
type ShadcnCalendarDayButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnCalendarDayButton>;

type DevCalendarProps = ShadcnCalendarProps & DevProps;
type DevCalendarDayButtonProps = ShadcnCalendarDayButtonProps & DevProps;

export const Calendar: React.FC<DevCalendarProps> = ({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }) => {
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
    return <ShadcnCalendar {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-calendar"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCalendar {...props} />
    </Container>
  );
};

Calendar.displayName = 'DevCalendar';

export const CalendarDayButton: React.FC<DevCalendarDayButtonProps> = ({ 
  devId, 
  devName, 
  devDescription, 
  devSelectable = true, 
  devDetailed, 
  ...props 
}) => {
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
    return <ShadcnCalendarDayButton {...props} />;
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-calendar-day-button"
      {...(devName && { name: devName })}
      {...(devDescription && { description: devDescription })}
      selectable={devSelectable}
    >
      <ShadcnCalendarDayButton {...props} />
    </Container>
  );
};

CalendarDayButton.displayName = 'DevCalendarDayButton';