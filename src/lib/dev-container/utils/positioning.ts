import { PopoverPosition } from '../types';

// Get absolute position relative to document
const getAbsolutePosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    width: rect.width,
    height: rect.height,
    bottom: rect.bottom + scrollTop,
    right: rect.right + scrollLeft,
  };
};

// =====================================
// ENHANCED POPOVER POSITIONING
// =====================================

export interface PopoverOptions {
  width?: number;
  height?: number;
  preferredPlacement?: PopoverPosition['placement'];
  offset?: { x: number; y: number };
  margin?: number;
  avoidViewportEdges?: boolean;
}

export const calculatePopoverPosition = (
  element: HTMLElement,
  options: PopoverOptions = {}
): PopoverPosition => {
  const {
    width: popoverWidth = 320,
    height: popoverHeight = 300,
    preferredPlacement = 'top',
    offset = { x: 0, y: 0 },
    margin = 16,
    avoidViewportEdges = true
  } = options;

  const rect = getAbsolutePosition(element);
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
  // Calculate available space in each direction relative to viewport
  const viewportRect = element.getBoundingClientRect();
  const spaceTop = viewportRect.top;
  const spaceBottom = viewport.height - viewportRect.bottom;
  const spaceLeft = viewportRect.left;
  const spaceRight = viewport.width - viewportRect.right;
  
  // Track available space for each placement
  const placements = [
    { 
      placement: 'top' as const, 
      space: spaceTop, 
      fits: spaceTop >= popoverHeight + margin 
    },
    { 
      placement: 'bottom' as const, 
      space: spaceBottom, 
      fits: spaceBottom >= popoverHeight + margin 
    },
    { 
      placement: 'left' as const, 
      space: spaceLeft, 
      fits: spaceLeft >= popoverWidth + margin 
    },
    { 
      placement: 'right' as const, 
      space: spaceRight, 
      fits: spaceRight >= popoverWidth + margin 
    },
  ];

  // Try preferred placement first
  let selectedPlacement = placements.find(p => p.placement === preferredPlacement && p.fits);
  
  // If preferred doesn't fit, find the best alternative
  if (!selectedPlacement) {
    selectedPlacement = placements
      .filter(p => p.fits)
      .sort((a, b) => b.space - a.space)[0]; // Most space available
  }
  
  // If nothing fits well, use the one with most space
  if (!selectedPlacement) {
    selectedPlacement = placements.sort((a, b) => b.space - a.space)[0];
  }
  
  const placement = selectedPlacement.placement;
  let top: number;
  let left: number;
  
  // Calculate position based on final placement
  switch (placement) {
    case 'top':
      top = rect.top - popoverHeight - 8;
      left = rect.left + (rect.width / 2) - (popoverWidth / 2);
      break;
    case 'bottom':
      top = rect.bottom + 8;
      left = rect.left + (rect.width / 2) - (popoverWidth / 2);
      break;
    case 'left':
      top = rect.top + (rect.height / 2) - (popoverHeight / 2);
      left = rect.left - popoverWidth - 8;
      break;
    case 'right':
      top = rect.top + (rect.height / 2) - (popoverHeight / 2);
      left = rect.right + 8;
      break;
  }
  
  // Handle very large elements (like full page containers)
  if (rect.height > viewport.height * 0.8 || rect.width > viewport.width * 0.8) {
    // Center the popover in the viewport
    top = scrollTop + viewport.height / 2 - popoverHeight / 2;
    left = scrollLeft + viewport.width / 2 - popoverWidth / 2;
  }
  
  // Apply custom offset
  top += offset.y;
  left += offset.x;
  
  // Ensure popover stays within bounds if requested
  if (avoidViewportEdges) {
    if (placement === 'top' || placement === 'bottom') {
      // Horizontal bounds - keep within current viewport when possible
      const minLeft = scrollLeft + margin;
      const maxLeft = scrollLeft + viewport.width - popoverWidth - margin;
      
      left = Math.max(minLeft, Math.min(left, maxLeft));
    } else {
      // Vertical bounds - keep within current viewport when possible
      const minTop = scrollTop + margin;
      const maxTop = scrollTop + viewport.height - popoverHeight - margin;
      
      top = Math.max(minTop, Math.min(top, maxTop));
    }
  }
  
  return {
    top,
    left,
    placement,
    offset,
  };
};

// =====================================
// ENHANCED VIEWPORT AND SCROLLING
// =====================================

export const isElementInViewport = (
  element: HTMLElement, 
  threshold: number = 0
): boolean => {
  const rect = element.getBoundingClientRect();
  const viewport = {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  };
  
  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= viewport.height + threshold &&
    rect.right <= viewport.width + threshold
  );
};

export const isElementFullyInViewport = (element: HTMLElement): boolean => {
  return isElementInViewport(element, 0);
};

export const isElementPartiallyInViewport = (element: HTMLElement): boolean => {
  return isElementInViewport(element, Math.max(element.offsetWidth, element.offsetHeight));
};

export const getViewportVisibilityRatio = (element: HTMLElement): number => {
  const rect = element.getBoundingClientRect();
  const viewport = {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  };
  
  // Calculate intersection
  const intersectionTop = Math.max(0, rect.top);
  const intersectionLeft = Math.max(0, rect.left);
  const intersectionBottom = Math.min(viewport.height, rect.bottom);
  const intersectionRight = Math.min(viewport.width, rect.right);
  
  const intersectionWidth = Math.max(0, intersectionRight - intersectionLeft);
  const intersectionHeight = Math.max(0, intersectionBottom - intersectionTop);
  const intersectionArea = intersectionWidth * intersectionHeight;
  
  const elementArea = rect.width * rect.height;
  
  return elementArea > 0 ? intersectionArea / elementArea : 0;
};

export const scrollToElement = (
  element: HTMLElement, 
  options: ScrollIntoViewOptions = {}
): void => {
  const defaultOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
  };
  
  element.scrollIntoView({ ...defaultOptions, ...options });
};

export const scrollElementIntoViewportCenter = (element: HTMLElement): void => {
  const rect = element.getBoundingClientRect();
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  
  const targetX = rect.left + rect.width / 2 - viewport.width / 2;
  const targetY = rect.top + rect.height / 2 - viewport.height / 2;
  
  window.scrollBy({
    left: targetX,
    top: targetY,
    behavior: 'smooth'
  });
};

// =====================================
// ENHANCED ELEMENT UTILITIES
// =====================================

export const getElementCenter = (element: HTMLElement): { x: number; y: number } => {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

export const getElementCenterAbsolute = (element: HTMLElement): { x: number; y: number } => {
  const rect = getAbsolutePosition(element);
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

export const getDistanceBetweenElements = (
  element1: HTMLElement,
  element2: HTMLElement
): number => {
  const center1 = getElementCenter(element1);
  const center2 = getElementCenter(element2);
  
  return Math.sqrt(
    Math.pow(center2.x - center1.x, 2) + Math.pow(center2.y - center1.y, 2)
  );
};

export const getClosestElement = (
  targetElement: HTMLElement,
  elements: HTMLElement[]
): HTMLElement | null => {
  if (elements.length === 0) return null;
  
  let closest = elements[0];
  let minDistance = getDistanceBetweenElements(targetElement, closest);
  
  for (let i = 1; i < elements.length; i++) {
    const distance = getDistanceBetweenElements(targetElement, elements[i]);
    if (distance < minDistance) {
      minDistance = distance;
      closest = elements[i];
    }
  }
  
  return closest;
};

// =====================================
// COMPONENT-SPECIFIC UTILITIES
// =====================================

/**
 * Find the best position for a dev mode popover considering component hierarchy
 */
export const calculateDevModePopoverPosition = (
  element: HTMLElement,
  options: PopoverOptions & {
    avoidOtherPopovers?: HTMLElement[];
    componentLevel?: 'parent' | 'child' | 'sibling';
  } = {}
): PopoverPosition => {
  const { avoidOtherPopovers = [], componentLevel = 'child', ...baseOptions } = options;
  
  // Adjust preferred placement based on component hierarchy
  let preferredPlacement = baseOptions.preferredPlacement || 'top';
  
  if (componentLevel === 'parent') {
    preferredPlacement = 'top'; // Parent components show above
  } else if (componentLevel === 'child') {
    preferredPlacement = 'bottom'; // Child components show below
  } else {
    preferredPlacement = 'right'; // Sibling components show to the side
  }
  
  // Calculate initial position
  let position = calculatePopoverPosition(element, {
    ...baseOptions,
    preferredPlacement
  });
  
  // Avoid collisions with other popovers
  if (avoidOtherPopovers.length > 0) {
    position = avoidPopoverCollisions(position, avoidOtherPopovers, baseOptions);
  }
  
  return position;
};

/**
 * Adjust popover position to avoid collisions with other popovers
 */
function avoidPopoverCollisions(
  position: PopoverPosition,
  existingPopovers: HTMLElement[],
  options: PopoverOptions
): PopoverPosition {
  const { width = 320, height = 300, margin = 16 } = options;
  
  const popoverRect = {
    top: position.top,
    left: position.left,
    right: position.left + width,
    bottom: position.top + height
  };
  
  // Check for collisions
  for (const popover of existingPopovers) {
    const rect = popover.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    const existingRect = {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      right: rect.right + scrollLeft,
      bottom: rect.bottom + scrollTop
    };
    
    // Check if they overlap
    const overlaps = !(
      popoverRect.right < existingRect.left ||
      popoverRect.left > existingRect.right ||
      popoverRect.bottom < existingRect.top ||
      popoverRect.top > existingRect.bottom
    );
    
    if (overlaps) {
      // Move the popover to avoid collision
      // Try moving right first, then down
      const moveRight = existingRect.right + margin;
      const moveDown = existingRect.bottom + margin;
      
      // Choose the option that keeps more of the popover in viewport
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      const rightFits = moveRight + width <= scrollLeft + viewport.width;
      const downFits = moveDown + height <= scrollTop + viewport.height;
      
      if (rightFits) {
        position.left = moveRight;
        position.placement = 'right';
      } else if (downFits) {
        position.top = moveDown;
        position.placement = 'bottom';
      } else {
        // Move up and left as fallback
        position.top = Math.max(scrollTop + margin, existingRect.top - height - margin);
        position.left = Math.max(scrollLeft + margin, existingRect.left - width - margin);
        position.placement = 'left';
      }
      
      break; // Only avoid the first collision for simplicity
    }
  }
  
  return position;
}

// =====================================
// RESPONSIVE UTILITIES
// =====================================

export const getResponsivePopoverSize = (): { width: number; height: number } => {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  
  // Responsive sizing based on viewport
  if (viewport.width < 640) { // Mobile
    return {
      width: Math.min(320, viewport.width - 32),
      height: Math.min(400, viewport.height - 100)
    };
  } else if (viewport.width < 1024) { // Tablet
    return {
      width: 380,
      height: 450
    };
  } else { // Desktop
    return {
      width: 420,
      height: 500
    };
  }
};

export const isMobileViewport = (): boolean => {
  return window.innerWidth < 640;
};

export const isTabletViewport = (): boolean => {
  return window.innerWidth >= 640 && window.innerWidth < 1024;
};

export const isDesktopViewport = (): boolean => {
  return window.innerWidth >= 1024;
};