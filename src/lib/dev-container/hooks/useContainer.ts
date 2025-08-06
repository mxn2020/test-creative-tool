// src/lib/dev-container/hooks/useContainer.ts

import { useRef } from 'react';
import { useDevMode } from '../components/DevModeProvider';
import { UseContainerReturn } from '../types';

export const useContainer = (componentId: string): UseContainerReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    isEnabled,
    selectedComponentId,
    hoveredComponentId,
    selectComponent,
    deselectComponent,
    hoverComponent,
  } = useDevMode();

  const isSelected = selectedComponentId === componentId;
  const isHovered = hoveredComponentId === componentId;
  const isDevMode = isEnabled;

  const handleClick = (e: React.MouseEvent) => {
    if (!isEnabled) return;
    
    e.stopPropagation();
    
    if (isSelected) {
      deselectComponent();
    } else {
      selectComponent(componentId);
    }
  };

  const handleMouseEnter = () => {
    if (!isEnabled) return;
    hoverComponent(componentId);
  };

  const handleMouseLeave = () => {
    if (!isEnabled) return;
    hoverComponent(null);
  };

  return {
    isSelected,
    isHovered,
    isDevMode,
    containerRef,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useContainer;