# Timeline-Based Progress Tracker - bolt.new Prompt

## Project Overview
Create an immersive timeline-based progress tracker that visualizes AI agent workflows chronologically. The interface should display multiple parallel tracks for concurrent agent activities, with clear milestone markers and dependency relationships.

## Technical Requirements
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React icons
- **Timeline Library**: Build custom timeline or use React-based timeline library
- **State Management**: React useState with useReducer for complex state
- **Animations**: CSS transitions and transform animations
- **Scrolling**: Smooth horizontal and vertical scrolling with momentum

## Core Features to Implement

### 1. Horizontal Timeline View
Create a comprehensive timeline interface:
- **Time Scale**: Horizontal axis showing minutes/hours with clear time markers
- **Zoom Controls**: Multiple zoom levels (1min, 5min, 15min, 1hour intervals)
- **Current Time Indicator**: Vertical line showing current moment
- **Timeline Scrubber**: Interactive progress bar for navigation
- **Auto-scroll**: Follow current time or stay at selected position

### 2. Parallel Agent Tracks
Multiple horizontal lanes for different agent activities:
- **Infrastructure Track**: Database setup, deployment configuration
- **Development Track**: Schema design, API creation, UI generation
- **Testing Track**: Unit tests, integration tests, performance tests
- **Integration Track**: Component assembly, routing, final deployment

Each track should display:
- Track label with agent count
- Color-coded activity bars
- Agent avatars moving along timeline
- Current activity indicators
- Overlapping activity handling

### 3. Phase Indicators and Milestones
Visual markers for workflow progression:
- **Phase Boundaries**: Vertical separators between major phases
- **Milestone Markers**: Diamond-shaped markers for key achievements
- **Dependency Gates**: Special markers where agents wait for prerequisites
- **Critical Path**: Highlighted timeline showing longest dependency chain
- **Phase Labels**: Clear naming for each workflow phase

### 4. Agent Activity Visualization
Rich representation of agent work:
- **Activity Bars**: Horizontal bars showing task duration and progress
- **Agent Avatars**: Moving icons representing active agents
- **Task Labels**: Descriptive text for current activities
- **Progress Indicators**: Completion percentage within activity bars
- **Status Colors**: Visual coding for different agent states

### 5. Live Activity Feed
Integrated activity stream:
- **Floating Activity Cards**: Recent events displayed as cards above timeline
- **Auto-dismissing Notifications**: Temporary alerts for important events
- **Persistent Event Markers**: Clickable dots on timeline for major events
- **Event Filtering**: Show/hide different types of activities
- **Event Details**: Expandable information for each timeline event

### 6. Interactive Dependencies
Visual representation of agent relationships:
- **Dependency Lines**: Curved lines connecting dependent activities
- **Waiting Indicators**: Visual cues when agents are blocked
- **Completion Triggers**: Animations showing when dependencies resolve
- **Critical Path Highlighting**: Emphasize the longest dependency chain
- **Bottleneck Identification**: Visual indicators for workflow constraints

### 7. Agent Detail Panels
Expandable information displays:
- **Agent Popup Cards**: Hover/click to show detailed agent status
- **Task Breakdown**: Sub-task progress within main activities
- **Resource Usage**: CPU, memory, or processing indicators
- **Error Information**: Detailed error logs and resolution status
- **Context Information**: Dependencies, outputs, and next steps

## UI Layout Specifications

### Header Section
- **Workflow Title**: Current workflow name and overall progress
- **Time Controls**: Play/pause, speed controls, current time display
- **Zoom Controls**: Timeline zoom in/out buttons and level indicator
- **Filter Controls**: Toggle different agent types and track visibility
- **Export Options**: Screenshot, report generation, data export

### Main Timeline Area
- **Track Headers** (Left, 200px width):
  - Track names and descriptions
  - Agent count indicators
  - Track-specific controls (hide/show, filter)
  - Color legend for agent types

- **Timeline Canvas** (Scrollable):
  - Horizontal time scale at top
  - Multiple agent tracks with activities
  - Vertical milestone markers
  - Interactive elements and controls
  - Current time indicator line

### Bottom Panel
- **Activity Details**: Expandable panel showing selected agent/task details
- **Timeline Navigation**: Mini-map showing overall timeline position
- **Status Summary**: Quick stats about workflow progress
- **Control Buttons**: Manual intervention options

## Visual Design Requirements

### Color Scheme and Visual Elements
- **Background**: Dark theme (gray-900) with subtle grid lines
- **Time Scale**: Light gray (#9CA3AF) with white hour markers
- **Tracks**: Alternating subtle background colors for visual separation
- **Activity Colors**:
  - Infrastructure: Blue (#3B82F6)
  - Development: Green (#10B981)
  - Testing: Purple (#8B5CF6)
  - Integration: Orange (#F97316)
  - Completed: Muted green with checkmark
  - Failed: Red with warning icon
  - Waiting: Yellow with clock icon

### Typography and Spacing
- **Track Labels**: font-semibold text-sm
- **Time Markers**: font-mono text-xs
- **Activity Labels**: font-medium text-xs
- **Phase Names**: font-bold text-lg
- **Consistent Spacing**: 4px grid system throughout

### Animations and Interactions
- **Activity Progress**: Smooth width animations for progress bars
- **Agent Movement**: Smooth position transitions for moving avatars
- **Timeline Scrubbing**: Smooth scroll with momentum
- **Hover Effects**: Subtle scale and shadow animations
- **Phase Transitions**: Fade and slide animations for phase changes
- **Dependency Resolution**: Pulse animation when dependencies complete

## Sample Data Structure

```javascript
const timelineData = {
  workflow: {
    id: 'generate-app-timeline',
    name: 'App Generation Workflow',
    startTime: '2024-01-15T10:00:00Z',
    duration: 1800, // 30 minutes
    currentTime: 1205, // 20 minutes elapsed
    phases: [
      {
        name: 'Infrastructure Setup',
        startTime: 0,
        endTime: 300,
        color: '#3B82F6'
      },
      {
        name: 'Schema Design',
        startTime: 180,
        endTime: 600,
        color: '#10B981'
      }
    ]
  },
  tracks: [
    {
      id: 'infrastructure',
      name: 'Infrastructure Team',
      description: 'Database and deployment setup',
      color: '#3B82F6',
      agents: ['mongodb-agent', 'netlify-agent']
    }
  ],
  activities: [
    {
      id: 'mongo-setup',
      agentId: 'mongodb-agent',
      trackId: 'infrastructure',
      name: 'MongoDB Cluster Setup',
      startTime: 45,
      duration: 240,
      progress: 85,
      status: 'active',
      dependencies: [],
      outputs: ['connection-string', 'database-credentials']
    }
  ],
  milestones: [
    {
      id: 'schema-complete',
      name: 'Schema Design Complete',
      time: 600,
      type: 'major',
      description: 'Prisma schema finalized and ready for migrations'
    }
  ]
}
```

## Interactive Features to Implement

### 1. Timeline Navigation
- **Horizontal Scrolling**: Smooth scrolling with mouse wheel and drag
- **Timeline Scrubber**: Click to jump to specific time points
- **Zoom Controls**: Mouse wheel zoom with keyboard shortcuts
- **Auto-follow**: Toggle to follow current time automatically
- **Bookmark System**: Save specific timeline positions

### 2. Agent Interaction
- **Agent Selection**: Click agents to show detailed information
- **Multi-select**: Ctrl+click to select multiple agents
- **Agent Filtering**: Show/hide specific agent types
- **Agent Search**: Find specific agents by name or task
- **Agent Grouping**: Group related agents visually

### 3. Real-time Simulation
- **Progress Animation**: Agents advance through timeline automatically
- **Status Updates**: Random status changes and task completions
- **Dependency Resolution**: Automatic unblocking when dependencies complete
- **New Task Generation**: Dynamic addition of new activities
- **Error Simulation**: Occasional failures with recovery processes

### 4. Timeline Manipulation
- **Playback Speed**: Control simulation speed (0.5x to 5x)
- **Pause/Resume**: Stop timeline at current position
- **Step Forward/Back**: Manual timeline advancement
- **Reset**: Return to beginning of workflow
- **Export Timeline**: Generate reports or screenshots

## Advanced Features to Include

### 1. Performance Analytics
- **Timeline Efficiency**: Visual indicators for optimal vs actual timing
- **Bottleneck Analysis**: Highlight slowest parts of workflow
- **Resource Utilization**: Show agent workload distribution
- **Parallel Efficiency**: Measure how well parallel tasks are utilized

### 2. Historical Comparison
- **Previous Runs**: Overlay data from previous workflow executions
- **Performance Trends**: Show improvement/degradation over time
- **Baseline Comparison**: Compare against ideal timeline
- **Anomaly Detection**: Highlight unusual timing patterns

### 3. Interactive Editing
- **Timeline Adjustment**: Drag activities to reschedule
- **Dependency Editing**: Add/remove dependency relationships
- **What-if Scenarios**: Simulate changes to workflow timing
- **Optimization Suggestions**: AI-generated workflow improvements

## Responsive Design Requirements

### Desktop (1200px+)
- Full timeline with all tracks visible
- Detailed agent information panels
- Complete control set
- Multi-level zoom capabilities

### Tablet (768px - 1199px)
- Condensed track headers
- Simplified agent representations
- Touch-friendly controls
- Reduced detail panels

### Mobile (< 768px)
- Single track view with track switcher
- Minimal agent details
- Touch-based timeline navigation
- Simplified control interface

## File Structure Suggestion
```
src/
├── components/
│   ├── timeline/
│   │   ├── TimelineCanvas.tsx
│   │   ├── TimeScale.tsx
│   │   ├── AgentTrack.tsx
│   │   ├── ActivityBar.tsx
│   │   ├── MilestoneMarker.tsx
│   │   ├── DependencyLine.tsx
│   │   └── CurrentTimeIndicator.tsx
│   ├── controls/
│   │   ├── TimelineControls.tsx
│   │   ├── ZoomControls.tsx
│   │   ├── FilterControls.tsx
│   │   └── PlaybackControls.tsx
│   ├── panels/
│   │   ├── AgentDetailPanel.tsx
│   │   ├── ActivityFeed.tsx
│   │   └── StatusSummary.tsx
│   └── ui/ (shadcn components)
├── hooks/
│   ├── useTimelineNavigation.ts
│   ├── useTimelineAnimation.ts
│   ├── useAgentSimulation.ts
│   └── useTimelineData.ts
├── types/
│   └── timeline.ts
└── utils/
    ├── timelineCalculations.ts
    ├── dependencyResolver.ts
    └── timelineData.ts
```

## Success Criteria
The prototype should demonstrate:
1. **Chronological Clarity**: Clear understanding of workflow progression over time
2. **Parallel Visualization**: Effective display of concurrent agent activities
3. **Interactive Navigation**: Smooth timeline exploration and manipulation
4. **Dependency Understanding**: Clear visualization of agent relationships
5. **Real-time Engagement**: Compelling real-time progress tracking
6. **Professional Timeline**: Production-quality timeline interface
7. **Performance Optimization**: Smooth scrolling and animations even with many agents

Create a sophisticated timeline interface that makes complex multi-agent workflows easy to understand and monitor chronologically.