# Multi-Layer Progress Dashboard - bolt.new Prompt

## Project Overview
Create a comprehensive multi-layer progress dashboard for monitoring AI agent workflows in a full-stack application generation system. The dashboard should visualize three levels of progress: overall workflow, team leaders, and individual agents.

## Technical Requirements
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React icons
- **State Management**: React useState/useReducer
- **Animations**: CSS transitions and Framer Motion (if available)
- **Real-time Simulation**: Use setInterval to simulate live updates

## Core Features to Implement

### 1. Top Layer - Workflow Progress
Create three main workflow cards:
- **Generate App Workflow**
- **Update App Workflow** 
- **Testing Workflow**

Each workflow card should display:
- Overall progress percentage (0-100%)
- Current phase name (e.g., "Infrastructure Setup", "UI Generation", "Integration")
- Estimated time remaining
- Status indicator (Active, Waiting, Completed, Failed)
- Color-coded progress bar

### 2. Middle Layer - Team Leader Progress
For the active workflow, display team leader sections:
- **Infrastructure Team** (MongoDB Agent, Netlify Agent)
- **Database Team** (Schema Designer, Migration Manager)
- **UI Team** (Page Generators, Component Builders)
- **Backend Team** (API Developers, Function Creators)
- **Testing Team** (Unit Tests, Integration Tests, Performance Tests)

Each team section should show:
- Team progress percentage
- Number of active agents
- Current primary task
- Dependency status (waiting for, providing to)
- Expandable/collapsible view

### 3. Bottom Layer - Individual Agent Details
Expandable agent cards showing:
- Agent name and type
- Current task description
- Progress percentage with sub-tasks
- Status (Idle, Ready, Active, Waiting, Blocked, Completed, Failed)
- Task duration and ETA
- Last update timestamp
- Error count (if any)
- Context/dependencies information

### 4. Agent Network Graph
Include a visual network graph component:
- Nodes representing agents (different shapes for different types)
- Edges showing dependencies between agents
- Color coding for agent status
- Interactive hover effects
- Zoom and pan capabilities
- Layout algorithm to arrange nodes logically

### 5. Real-time Activity Feed
Right sidebar with:
- Scrolling list of recent agent activities
- Timestamped entries
- Color-coded by importance (info, warning, error, success)
- Filterable by agent type or team
- Auto-scroll to latest updates
- Click to jump to relevant agent

### 6. Error Alert System
Prominent error handling display:
- Toast notifications for immediate issues
- Error summary panel
- Detailed error logs with stack traces
- Resolution status tracking
- Quick action buttons (Retry, Skip, Manual Intervention)

### 7. Control Panel
Include manual control options:
- Pause/Resume entire workflow
- Pause specific teams or agents
- Force retry failed agents
- Emergency stop functionality
- Export progress report
- Settings for update frequency

## UI Layout Specifications

### Header Section
- Workflow selection tabs at top
- Global progress indicator
- Current time and session duration
- User avatar and settings dropdown

### Main Content Area
Split into three sections:
- **Left Panel (40%)**: Team leader progress cards in a grid
- **Center Panel (35%)**: Agent network graph
- **Right Panel (25%)**: Activity feed and controls

### Bottom Section
- Expandable individual agent details panel
- Tabbed interface for different views (List, Grid, Timeline)
- Search and filter functionality

## Visual Design Requirements

### Color Scheme
- **Active/Running**: Blue (#3B82F6)
- **Waiting/Idle**: Yellow (#F59E0B)
- **Completed**: Green (#10B981)
- **Failed/Error**: Red (#EF4444)
- **Blocked**: Orange (#F97316)
- **Background**: Dark theme with gray-900 primary, gray-800 secondary

### Typography
- **Headers**: font-semibold text-lg
- **Body**: font-medium text-sm
- **Labels**: font-normal text-xs
- **Monospace**: For technical details and logs

### Animations
- **Progress bars**: Smooth width transitions
- **Status changes**: Color fade transitions
- **Card expansions**: Height and opacity animations
- **Network graph**: Node position transitions
- **Activity feed**: Slide-in animations for new items

## Sample Data Structure
Create realistic mock data including:

```javascript
const mockWorkflowData = {
  workflows: [
    {
      id: 'generate-app',
      name: 'Generate App',
      status: 'active',
      progress: 67,
      currentPhase: 'UI Generation',
      estimatedTime: '8 minutes',
      teams: [...]
    }
  ],
  teams: [
    {
      id: 'ui-team',
      name: 'UI Team',
      progress: 45,
      activeAgents: 3,
      currentTask: 'Creating user dashboard components',
      status: 'active',
      agents: [...]
    }
  ],
  agents: [
    {
      id: 'page-generator-01',
      name: 'Page Generator',
      type: 'ui-generator',
      status: 'active',
      progress: 78,
      currentTask: 'Generating user profile page',
      duration: '2m 34s',
      eta: '45s',
      dependencies: ['schema-designer'],
      lastUpdate: '2024-01-15T10:30:45Z'
    }
  ]
}
```

## Interactive Features to Implement

### 1. Real-time Updates
- Simulate agent progress changes every 2-3 seconds
- Random status transitions (respecting logical flow)
- Progress increments and task updates
- Network graph node position updates

### 2. User Interactions
- **Click team cards**: Expand to show agent details
- **Hover network nodes**: Show agent tooltip
- **Filter activity feed**: By agent type, status, or time
- **Search agents**: Real-time search functionality
- **Manual controls**: Pause/resume buttons that affect simulation

### 3. Responsive Behavior
- **Mobile**: Stack panels vertically, hide network graph
- **Tablet**: Adjust panel widths, simplify network view
- **Desktop**: Full three-panel layout with all features

### 4. Accessibility
- **Keyboard navigation**: Tab through all interactive elements
- **Screen reader support**: Proper ARIA labels
- **High contrast mode**: Alternative color scheme
- **Focus indicators**: Clear visual focus states

## Advanced Features (Optional)

### 1. Performance Monitoring
- CPU/Memory usage indicators for agents
- Task queue depth visualization
- System resource utilization charts

### 2. Historical Data
- Progress timeline view
- Performance trends over time
- Agent efficiency metrics

### 3. Customization
- Draggable panel layouts
- Configurable refresh rates
- Custom agent groupings
- Personalized dashboard views

## File Structure Suggestion
```
src/
├── components/
│   ├── dashboard/
│   │   ├── WorkflowProgress.tsx
│   │   ├── TeamLeaderPanel.tsx
│   │   ├── AgentNetworkGraph.tsx
│   │   ├── ActivityFeed.tsx
│   │   ├── ErrorAlerts.tsx
│   │   └── ControlPanel.tsx
│   ├── agents/
│   │   ├── AgentCard.tsx
│   │   ├── AgentDetails.tsx
│   │   └── AgentStatus.tsx
│   └── ui/ (shadcn components)
├── hooks/
│   ├── useRealtimeData.ts
│   └── useAgentSimulation.ts
├── types/
│   └── dashboard.ts
└── utils/
    ├── mockData.ts
    └── agentSimulation.ts
```

## Success Criteria
The prototype should demonstrate:
1. **Clear Information Hierarchy**: Users can quickly understand overall progress and drill down to details
2. **Real-time Responsiveness**: Smooth updates without jarring transitions
3. **Intuitive Navigation**: Easy to understand agent relationships and dependencies
4. **Professional Appearance**: Production-ready visual design
5. **Interactive Engagement**: Users can meaningfully interact with the data
6. **Error Handling Visibility**: Clear indication of issues and resolution paths

Create a polished, professional dashboard that effectively communicates complex multi-agent workflow progress in an intuitive and visually appealing manner.