// src/lib/dev-container/geenius/Media.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

// Image (keeping from previous)
interface DevImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, DevProps {}

export const Img = React.forwardRef<HTMLImageElement, DevImageProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
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
      return <img ref={ref} {...props} />;
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-img' // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <img ref={ref} {...props} />
      </Container>
    );
  }
);

// Video
interface DevVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement>, DevProps {
  children?: React.ReactNode;
}

export const Video = React.forwardRef<HTMLVideoElement, DevVideoProps>(
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
        <video ref={ref} {...props}>
          {children}
        </video>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-video' // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <video ref={ref} {...props}>
          {children}
        </video>
      </Container>
    );
  }
);

// Audio
interface DevAudioProps extends React.AudioHTMLAttributes<HTMLAudioElement>, DevProps {
  children?: React.ReactNode;
}

export const Audio = React.forwardRef<HTMLAudioElement, DevAudioProps>(
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
        <audio ref={ref} {...props}>
          {children}
        </audio>
      );
    }

    return (
      <Container
        componentId={devId}
        definitionId='dev-audio' // Reference to ComponentDefinition
        {...(devName && { name: devName })}
        {...(devDescription && { description: devDescription })}
        selectable={devSelectable}
      >
        <audio ref={ref} {...props}>
          {children}
        </audio>
      </Container>
    );
  }
);

Img.displayName = 'DevImg';
Video.displayName = 'DevVideo';
Audio.displayName = 'DevAudio';

export { type DevImageProps, type DevVideoProps, type DevAudioProps };

