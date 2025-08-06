# Container Ship Progress Journey - bolt.new Prompt

## Project Overview
Create an engaging container ship progress visualization for SME customers monitoring their web application generation. The interface shows a cargo ship carrying containers representing different tasks, traveling across an animated ocean with a dynamic loading system that grows horizontally and vertically as tasks are added.

## Technical Requirements
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom CSS for animations
- **Icons**: Lucide React icons for UI elements
- **State Management**: React useState with useReducer for complex container management
- **Animations**: CSS transforms and transitions for smooth ship and water movement
- **Canvas/SVG**: Use SVG for scalable ship and container graphics
- **Performance**: Optimized for smooth 60fps water animation

## Core Visual System

### Ship Structure and Growth Logic
- **Fixed Ship Ends**: Left side (ship bow) and right side (ship stern) remain constant
- **Expandable Loading Area**: Middle section grows horizontally to accommodate containers
- **Container Grid System**: 
  - Start with 1 container width, grow up to 5 containers wide
  - Stack containers up to 4 levels high
  - When 4 levels reached, expand width by 1 and continue stacking
- **Ship Positioning**: Ship stays centered, ocean moves beneath for travel effect
- **Color Customization**: Ship hull color adapts to detected brand colors from user's brochure

### Container Hierarchy Visual System
- **Master AI Orchestrator**: Bold border (4px) containers - critical workflow tasks
- **Team Leader**: Medium border (2px) containers - coordinated multi-agent tasks  
- **Individual AI Agent**: Slim border (1px) containers - specific task execution
- **Container Loading Order**: Containers appear in chronological order of task start
- **Stacking Logic**: Fill current width level before going up, then expand width when needed

## Container System Implementation

### Non-Technical Container Labels
Create business-friendly names for technical processes:

```javascript
const containerLabels = {
  // Foundation & Setup
  'database-setup': 'Digital Foundation',
  'auth-system': 'Security Setup',
  'deployment-config': 'Launch Preparation',
  
  // Pages & Content
  'homepage': 'Welcome Page',
  'about-page': 'About Your Business',
  'contact-page': 'Contact Hub',
  'services-page': 'Business Showcase',
  'portfolio-page': 'Customer Gallery',
  'testimonials': 'Customer Reviews',
  
  // Features & Functionality
  'booking-system': 'Appointment System',
  'payment-integration': 'Payment Processing',
  'contact-forms': 'Customer Communication',
  'search-optimization': 'Search Visibility',
  'mobile-responsive': 'Mobile Experience',
  'analytics-setup': 'Business Insights',
  
  // E-commerce
  'product-catalog': 'Product Showcase',
  'shopping-cart': 'Shopping Experience',
  'inventory-management': 'Stock Management',
  
  // Content Management
  'cms-setup': 'Content Management',
  'blog-system': 'News & Updates',
  'media-gallery': 'Photo Gallery'
}
```

### Container Visual Design
- **Base Container**: Rectangular shipping container with realistic 3D appearance
- **Color Coding by Type**:
  - Foundation tasks: Deep blue (#1E40AF)
  - Page creation: Green (#059669)
  - Features: Orange (#EA580C)
  - E-commerce: Purple (#7C3AED)
  - Content: Teal (#0D9488)
- **Progress Visualization**: Left-to-right gradient fill showing completion (0-100%)
- **Container Labels**: Clear, readable text on container face
- **Completion Effects**: Subtle glow and sparkle animation when container completes

## Ship Design Specifications

### Ship Structure Components
```javascript
const shipStructure = {
  bow: { // Left side - fixed
    width: 120,
    height: 80,
    shape: 'pointed-front',
    elements: ['anchor', 'bow-wave']
  },
  stern: { // Right side - fixed
    width: 100,
    height: 80,
    shape: 'flat-back',
    elements: ['propeller-wake', 'flag-pole']
  },
  loadingArea: { // Center - expandable
    baseWidth: 60, // minimum width for 1 container
    containerWidth: 50, // width per container column
    maxWidth: 300, // maximum width (5 containers)
    height: 80,
    stackHeight: 20 // height per container level
  },
  bridge: { // Captain's area
    position: 'top-center',
    width: 80,
    height: 30,
    elements: ['progress-display', 'company-flag']
  }
}
```

### Ship Customization System
- **Hull Color**: Extract primary color from user's brochure/brand
- **Accent Colors**: Use secondary colors for details and trim
- **Flag Design**: Show company logo or initials on ship's flag
- **Industry Theming**: Subtle decorations based on business type
  - Restaurant: Anchor with chef's hat
  - Retail: Shopping bag decorations
  - Services: Professional briefcase icons

## Ocean Environment Design

### Animated Water System
- **Infinite Scrolling Water**: Seamless horizontal water texture movement
- **Wave Patterns**: Multiple layers of waves at different speeds for depth
- **Water Colors**: 
  - Base: Deep ocean blue (#1E3A8A)
  - Waves: Lighter blue (#3B82F6)
  - Foam: White highlights (#FFFFFF)
- **Movement Speed**: Adjustable based on workflow intensity
- **Weather Effects**: 
  - Calm seas: Gentle wave movement
  - Active work: More pronounced waves
  - Near completion: Calmer, clearer water

### Environmental Elements
- **Floating Landmarks**: Milestone markers that pass by
  - Lighthouse: Major phase completions
  - Buoys: Progress checkpoints  
  - Islands: Significant milestones
- **Sky Elements**:
  - Progress clouds showing overall percentage
  - Sun position indicating time to completion
  - Birds for delightful animations
- **Background Elements**:
  - Distant horizon with destination port (visible near completion)
  - Other ships in far distance
  - Subtle parallax layers for depth

## Interactive Features Implementation

### Container Click Interactions
Create detailed information panels for each container:

```javascript
const containerDetails = {
  'homepage': {
    title: 'Welcome Page',
    description: 'Creating your business\'s first impression',
    currentStep: 'Adding your services and contact information',
    businessValue: 'This page will be the first thing customers see when they visit your website',
    estimatedTime: '3 minutes remaining',
    progress: 73,
    previewAvailable: true
  }
}
```

### User Interface Elements
- **Progress Overview Panel**: 
  - Overall completion percentage
  - Estimated time remaining
  - Current phase description
- **Container Legend**: Color-coded explanation of container types
- **Journey Map**: Small overview showing current position in overall process
- **Control Options**:
  - Pause/Resume workflow (emergency stop)
  - Speed adjustment (if applicable)
  - Notification preferences

## Animation and Interaction Specifications

### Container Loading Animation
1. **Container Appearance**: 
   - Fade in from above ship
   - Gentle drop animation onto loading area
   - Slight ship rock effect when container lands
2. **Stacking Logic**:
   - Fill current row from left to right
   - Stack vertically when row is full
   - Expand ship width when 4 levels reached
3. **Progress Animation**:
   - Smooth gradient fill from left to right
   - Subtle pulsing during active work
   - Completion sparkle effect

### Ship Movement and Water Effects
- **Ship Stability**: Ship gently bobs but stays centered
- **Water Flow**: Continuous horizontal scrolling at varying speeds
- **Wake Effects**: White foam trail behind ship
- **Environmental Response**: Ship reacts slightly to wave patterns

### Milestone Celebrations
- **Container Completion**: 
  - Brief glow effect
  - Small fireworks/sparkles
  - Satisfying "ding" sound (optional)
- **Phase Transitions**:
  - Lighthouse beam sweep
  - Sky color subtle shift
  - Ship horn sound (optional)
- **Journey Completion**:
  - Destination port becomes visible
  - Celebratory effects
  - Success message display

## Sample Data Structure

```javascript
const journeyData = {
  workflow: {
    id: 'website-generation-001',
    businessName: 'Sunny Side Bakery',
    projectType: 'business-website',
    overallProgress: 45,
    estimatedCompletion: '12 minutes',
    currentPhase: 'Content Creation',
    brandColors: {
      primary: '#F59E0B',
      secondary: '#92400E'
    }
  },
  ship: {
    position: { x: 400, y: 200 }, // centered
    loadingArea: {
      currentWidth: 2, // 2 containers wide
      maxLevels: 3,    // currently 3 levels high
      totalContainers: 8
    },
    customization: {
      hullColor: '#F59E0B',
      flagLogo: 'bakery-icon',
      industryType: 'food-service'
    }
  },
  containers: [
    {
      id: 'foundation-001',
      type: 'master-orchestrator',
      label: 'Digital Foundation',
      progress: 100,
      status: 'completed',
      position: { row: 0, col: 0, level: 0 },
      startTime: '2024-01-15T10:00:00Z',
      completionTime: '2024-01-15T10:03:00Z',
      borderStyle: 'bold',
      color: '#1E40AF'
    },
    {
      id: 'homepage-001',
      type: 'ai-agent',
      label: 'Welcome Page',
      progress: 73,
      status: 'active',
      position: { row: 0, col: 1, level: 0 },
      startTime: '2024-01-15T10:03:00Z',
      estimatedCompletion: '2024-01-15T10:08:00Z',
      borderStyle: 'slim',
      color: '#059669',
      currentStep: 'Adding bakery menu and hours'
    }
  ],
  environment: {
    weather: 'clear',
    timeOfDay: 'morning',
    waveIntensity: 0.6,
    landmarksVisible: ['lighthouse-milestone-1'],
    destinationVisibility: 0.2
  }
}
```

## Responsive Design Requirements

### Desktop (1200px+)
- Full ship visualization with all details
- Complete container interaction system
- Rich environmental effects
- Side panel for detailed information

### Tablet (768px - 1199px)
- Slightly simplified ship design
- Touch-friendly container interactions
- Reduced environmental complexity
- Overlay panels instead of sidebars

### Mobile (< 768px)
- Simplified ship with essential containers visible
- Bottom sheet for container details
- Streamlined environmental effects
- Touch-optimized controls

## File Structure Suggestion
```
src/
├── components/
│   ├── ship/
│   │   ├── ContainerShip.tsx
│   │   ├── ShipHull.tsx
│   │   ├── LoadingArea.tsx
│   │   ├── ContainerGrid.tsx
│   │   └── ShipCustomization.tsx
│   ├── containers/
│   │   ├── ShippingContainer.tsx
│   │   ├── ContainerDetails.tsx
│   │   ├── ContainerProgress.tsx
│   │   └── ContainerStack.tsx
│   ├── environment/
│   │   ├── Ocean.tsx
│   │   ├── WaterAnimation.tsx
│   │   ├── SkyElements.tsx
│   │   ├── Landmarks.tsx
│   │   └── WeatherEffects.tsx
│   ├── ui/
│   │   ├── ProgressOverview.tsx
│   │   ├── JourneyMap.tsx
│   │   ├── ContainerLegend.tsx
│   │   └── ControlPanel.tsx
│   └── effects/
│       ├── CompletionEffects.tsx
│       ├── LoadingAnimations.tsx
│       └── MilestoneAnimations.tsx
├── hooks/
│   ├── useShipJourney.ts
│   ├── useContainerManagement.ts
│   ├── useOceanAnimation.ts
│   └── useProgressSimulation.ts
├── utils/
│   ├── containerPositioning.ts
│   ├── shipDimensions.ts
│   ├── colorExtraction.ts
│   └── progressCalculations.ts
├── types/
│   ├── ship.ts
│   ├── containers.ts
│   └── journey.ts
└── data/
    ├── containerLabels.ts
    ├── businessTypes.ts
    └── milestones.ts
```

## Success Criteria
The prototype should demonstrate:
1. **Engaging Visual Journey**: SME owners feel excited watching their business transformation
2. **Clear Progress Communication**: Non-technical users understand what's happening
3. **Smooth Animations**: Professional-quality ship movement and container loading
4. **Interactive Value**: Container details provide meaningful business context
5. **Scalable Design**: System handles various numbers of containers gracefully
6. **Emotional Connection**: Users feel invested in their ship's journey to completion
7. **Brand Integration**: Ship customization reflects user's business identity

Create a delightful, professional container ship journey that transforms technical workflow monitoring into an engaging business transformation experience that SME owners genuinely enjoy watching.