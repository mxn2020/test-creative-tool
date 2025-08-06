# Kanban-Style Workflow Board - bolt.new Prompt

## Project Overview
Create a dynamic Kanban-style workflow board for managing AI agent tasks in a full-stack application generation system. The board should provide intuitive task management with drag-and-drop functionality, swimlanes for organization, and rich agent cards with detailed progress information.

## Technical Requirements
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Drag & Drop**: React DnD or @dnd-kit/core library
- **Icons**: Lucide React icons
- **State Management**: React useState with useReducer for complex operations
- **Animations**: Framer Motion or CSS transitions for smooth interactions
- **Grid System**: CSS Grid for responsive column layouts

## Core Features to Implement

### 1. Kanban Board Structure
Create a five-column board layout:
- **QUEUED**: Tasks waiting to be started
- **IN PROGRESS**: Currently executing agents
- **WAITING**: Agents blocked by dependencies
- **COMPLETED**: Successfully finished tasks
- **FAILED**: Tasks that encountered errors

Each column should include:
- Column header with title and task count
- Color-coded header backgrounds
- Add new task button (for manual interventions)
- Column statistics (total tasks, average completion time)
- Drag target indicators during drag operations

### 2. Agent Card Design
Rich, informative cards for each agent:
- **Agent Avatar**: Icon representing agent type (database, UI, API, etc.)
- **Agent Name**: Clear, descriptive agent identification
- **Task Title**: Current or assigned task description
- **Progress Bar**: Visual progress indicator (0-100%)
- **Status Badge**: Color-coded status indicator
- **Priority Flag**: High/Medium/Low priority indicators
- **Time Information**: Duration, ETA, start time
- **Dependency Indicators**: Icons showing blocking/blocked relationships
- **Team Assignment**: Color-coded team affiliation
- **Action Buttons**: Quick actions (pause, retry, view logs)

### 3. Swimlane Organization
Horizontal grouping options:
- **By Workflow Type**: Generate App, Update App, Testing
- **By Team**: Infrastructure, Database, UI, Backend, Testing
- **By Priority**: Critical, High, Medium, Low
- **By Component**: User Management, Room Booking, Authentication
- **Custom Grouping**: User-defined categories

Swimlane features:
- Collapsible/expandable lanes
- Lane-specific statistics
- Bulk operations per lane
- Lane filtering and search

### 4. Drag and Drop Functionality
Comprehensive drag-and-drop system:
- **Card Dragging**: Smooth visual feedback during drag
- **Column Targets**: Clear drop zone indicators
- **Swimlane Movement**: Move cards between different swimlanes
- **Invalid Drop Prevention**: Visual feedback for invalid moves
- **Batch Selection**: Multi-select with Ctrl+click for bulk operations
- **Undo/Redo**: Action history for drag operations
- **Auto-scroll**: Page scrolling during edge dragging

### 5. Agent Dependency Visualization
Clear dependency relationship display:
- **Dependency Lines**: Visual connections between related cards
- **Blocking Indicators**: Red badges on cards waiting for dependencies
- **Dependency Tree**: Expandable view showing full dependency chain
- **Resolution Tracking**: Progress indicators for dependency completion
- **Critical Path**: Highlight the longest dependency sequence
- **Orphaned Tasks**: Identify tasks without dependencies

### 6. Real-time Updates and Notifications
Live board updates:
- **Status Changes**: Automatic card movement between columns
- **Progress Updates**: Real-time progress bar updates
- **New Task Arrivals**: Smooth animation for new cards
- **Completion Celebrations**: Special animations for completed tasks
- **Error Alerts**: Prominent notifications for failed tasks
- **Dependency Resolution**: Visual feedback when blockers are resolved

### 7. Advanced Filtering and Search
Comprehensive filtering system:
- **Text Search**: Search by agent name, task, or description
- **Status Filter**: Show/hide specific status types
- **Team Filter**: Filter by assigned team or agent type
- **Date Range**: Filter by creation date, due date, or completion time
- **Priority Filter**: Show only high-priority tasks
- **Dependency Filter**: Show only blocked or blocking tasks
- **Custom Tags**: User-defined tags for categorization

## UI Layout Specifications

### Header Section
- **Board Title**: Workflow name and current status
- **Global Statistics**: Total agents, completion rate, average time
- **View Controls**: Swimlane toggle, compact/detailed view, refresh rate
- **Filter Bar**: Search input and filter dropdowns
- **Action Buttons**: Pause all, resume all, export board, settings

### Main Board Area
- **Column Headers**: Fixed headers with statistics and controls
- **Scrollable Content**: Vertical scrolling for long task lists
- **Swimlane Headers**: Collapsible lane identifiers on left side
- **Card Grid**: Responsive card layout within columns
- **Drag Overlays**: Visual feedback during drag operations

### Side Panel (Optional)
- **Agent Details**: Expanded information for selected agent
- **Activity Log**: Recent board activities and changes
- **Statistics Dashboard**: Performance metrics and trends
- **Manual Controls**: Emergency stops, manual task creation

## Visual Design Requirements

### Color Scheme
- **QUEUED**: Blue (#3B82F6) - calm, waiting
- **IN PROGRESS**: Green (#10B981) - active, productive
- **WAITING**: Yellow (#F59E0B) - attention, blocked
- **COMPLETED**: Gray-green (#6B7280) - finished, calm
- **FAILED**: Red (#EF4444) - urgent, error
- **Background**: Light gray (#F9FAFB) with subtle shadows

### Card Design Elements
- **Card Background**: White with subtle shadow and border
- **Hover Effects**: Slight scale and shadow increase
- **Selected State**: Blue border and background tint
- **Dragging State**: Increased shadow and slight rotation
- **Priority Indicators**: Left border color coding
- **Status Badges**: Rounded badges with appropriate colors

### Typography and Spacing
- **Card Titles**: font-semibold text-sm
- **Agent Names**: font-medium text-xs
- **Metadata**: font-normal text-xs text-gray-500
- **Column Headers**: font-bold text-lg
- **Consistent Padding**: 4px grid system throughout

### Animations
- **Card Movement**: Smooth position transitions between columns
- **Hover Effects**: Subtle scale and shadow animations
- **Drag Feedback**: Real-time visual feedback during dragging
- **Status Changes**: Color transition animations
- **New Card Entry**: Slide-in animation from top
- **Completion Effect**: Brief celebration animation

## Sample Data Structure

```javascript
const kanbanData = {
  columns: [
    {
      id: 'queued',
      title: 'QUEUED',
      color: '#3B82F6',
      tasks: ['task-1', 'task-2'],
      maxTasks: null,
      acceptsFrom: ['failed'] // Can receive tasks from failed column
    }
  ],
  swimlanes: [
    {
      id: 'infrastructure',
      title: 'Infrastructure Team',
      color: '#8B5CF6',
      collapsed: false,
      tasks: ['task-1', 'task-3']
    }
  ],
  tasks: [
    {
      id: 'task-1',
      agentId: 'mongodb-agent-001',
      agentType: 'database',
      agentName: 'MongoDB Setup Agent',
      title: 'Create production database cluster',
      description: 'Set up MongoDB Atlas cluster with proper security configuration',
      status: 'in-progress',
      progress: 67,
      priority: 'high',
      team: 'infrastructure',
      swimlane: 'infrastructure',
      startTime: '2024-01-15T10:15:00Z',
      estimatedDuration: 300, // seconds
      dependencies: [],
      blockedBy: [],
      blocking: ['task-4', 'task-7'],
      tags: ['database', 'mongodb', 'production'],
      assignee: 'Database Team',
      lastUpdate: '2024-01-15T10:18:32Z'
    }
  ],
  dependencies: [
    {
      id: 'dep-1',
      from: 'task-1', // MongoDB setup
      to: 'task-4',   // Schema migration
      type: 'blocking',
      status: 'pending'
    }
  ]
}
```

## Interactive Features to Implement

### 1. Drag and Drop Operations
- **Single Card Drag**: Move individual agents between columns
- **Multi-select Drag**: Select multiple cards and move together
- **Column Reordering**: Rearrange column order for custom workflows
- **Swimlane Reordering**: Change swimlane priority order
- **Batch Operations**: Select all cards in column for bulk actions

### 2. Card Interactions
- **Click to Expand**: Show detailed agent information
- **Double-click to Edit**: Modify task details (for manual tasks)
- **Right-click Menu**: Context menu with quick actions
- **Hover Tooltips**: Quick information preview
- **Progress Click**: Manual progress adjustment (for testing)

### 3. Real-time Simulation
- **Automatic Movement**: Cards move between columns based on status
- **Progress Animation**: Progress bars fill gradually over time
- **Random Events**: Simulated failures, completions, and new tasks
- **Dependency Resolution**: Automatic unblocking when dependencies complete
- **Performance Variations**: Different agents work at different speeds

### 4. Manual Interventions
- **Pause Agent**: Stop specific agent execution
- **Retry Failed**: Restart failed agents
- **Skip Task**: Mark task as complete (for testing)
- **Add Manual Task**: Create custom intervention tasks
- **Modify Priority**: Change task priority levels

## Advanced Features to Include

### 1. Board Analytics
- **Cycle Time**: Average time from queued to completed
- **Throughput**: Tasks completed per time period
- **Bottleneck Analysis**: Identify columns with longest wait times
- **Agent Efficiency**: Performance metrics per agent type
- **Workflow Health**: Overall board performance indicators

### 2. Board Customization
- **Custom Columns**: Add workflow-specific status columns
- **Column Rules**: Define automatic movement rules
- **Card Templates**: Predefined card formats for different agent types
- **Board Presets**: Save and load different board configurations
- **Personal Views**: User-specific board customizations

### 3. Collaboration Features
- **Comments**: Add notes to specific tasks
- **Watchers**: Subscribe to updates for specific cards
- **Activity History**: Complete audit trail of board changes
- **Notifications**: Alert system for important board events
- **Board Sharing**: Export board state for sharing

### 4. Integration Features
- **Webhook Support**: Real-time updates from external systems
- **Export Options**: CSV, JSON, PDF board exports
- **Import Tasks**: Bulk task import from files
- **API Integration**: RESTful API for external integrations
- **Backup/Restore**: Board state backup and restoration

## Responsive Design Requirements

### Desktop (1200px+)
- Full 5-column layout with all features
- Detailed card information
- Full drag-and-drop functionality
- Side panel for additional information

### Tablet (768px - 1199px)
- 3-column layout with horizontal scrolling
- Simplified card design
- Touch-friendly drag-and-drop
- Collapsible side panel

### Mobile (< 768px)
- Single column view with column switcher
- Simplified card interactions
- Touch-optimized controls
- Bottom sheet for details

## File Structure Suggestion
```
src/
├── components/
│   ├── kanban/
│   │   ├── KanbanBoard.tsx
│   │   ├── KanbanColumn.tsx
│   │   ├── KanbanCard.tsx
│   │   ├── Swimlane.tsx
│   │   ├── DragOverlay.tsx
│   │   └── ColumnHeader.tsx
│   ├── filters/
│   │   ├── FilterBar.tsx
│   │   ├── SearchInput.tsx
│   │   └── FilterDropdown.tsx
│   ├── modals/
│   │   ├── TaskDetailsModal.tsx
│   │   ├── EditTaskModal.tsx
│   │   └── CreateTaskModal.tsx
│   └── ui/ (shadcn components)
├── hooks/
│   ├── useDragAndDrop.ts
│   ├── useKanbanData.ts
│   ├── useTaskFiltering.ts
│   └── useRealtimeUpdates.ts
├── types/
│   └── kanban.ts
├── utils/
│   ├── taskCalculations.ts
│   ├── dependencyResolver.ts
│   └── kanbanData.ts
└── stores/
    └── kanbanStore.ts
```

## Success Criteria
The prototype should demonstrate:
1. **Intuitive Task Management**: Easy to understand and manipulate agent workflows
2. **Smooth Drag Operations**: Polished drag-and-drop with proper visual feedback
3. **Clear Status Visualization**: Immediate understanding of workflow progress
4. **Effective Organization**: Swimlanes and filtering help manage complexity
5. **Real-time Responsiveness**: Live updates that feel natural and informative
6. **Professional Board**: Production-quality Kanban interface
7. **Dependency Clarity**: Clear understanding of task relationships and blockers

Create a sophisticated Kanban board that makes complex AI agent workflows manageable through familiar task management metaphors and intuitive interactions.