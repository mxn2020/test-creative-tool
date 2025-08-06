# Minimalist Progress Companion - bolt.new Prompt

## Project Overview
Create a clean, minimalist progress companion widget for monitoring AI agent workflows in a full-stack application generation system. The interface should provide essential progress information in a compact, non-intrusive format that can expand to show detailed information when needed.

## Technical Requirements
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React icons (minimal, essential icons only)
- **State Management**: React useState with simple state structure
- **Animations**: CSS transitions and subtle micro-animations
- **Layout**: Fixed positioning with responsive adaptation
- **Performance**: Lightweight with minimal DOM elements

## Core Features to Implement

### 1. Floating Progress Widget
Compact, always-visible progress indicator:
- **Circular Progress Ring**: Main visual element showing overall completion
- **Percentage Display**: Large, clear percentage number in center
- **Workflow Indicator**: Small text label indicating current workflow type
- **Status Color**: Ring color changes based on workflow health
- **Pulse Animation**: Subtle pulse during active operations
- **Compact Size**: Small enough to not obstruct main content (80x80px default)

### 2. Smart Positioning System
Intelligent widget placement:
- **Default Position**: Bottom-right corner with safe margins
- **Collision Detection**: Automatically move away from other UI elements
- **Drag Repositioning**: Allow users to drag widget to preferred position
- **Sticky Positioning**: Remember user's preferred position
- **Mobile Adaptation**: Adjust position and size for mobile screens
- **Z-index Management**: Always visible but not blocking important interactions

### 3. Expandable Detail Panel
Progressive disclosure of information:
- **One-Click Expansion**: Click widget to reveal detailed progress panel
- **Smooth Animation**: Elegant expand/collapse transitions
- **Detail Levels**: Multiple expansion states (compact, medium, full)
- **Auto-collapse**: Automatically collapse after period of inactivity
- **Click Outside**: Close panel when clicking elsewhere
- **Keyboard Access**: ESC key to close, Tab navigation within panel

### 4. Essential Progress Information
Carefully curated information display:
- **Current Phase**: Clear indication of workflow phase
- **Active Agents**: Count and types of currently working agents
- **ETA Display**: Estimated time to completion
- **Last Update**: Timestamp of most recent progress
- **Critical Issues**: Prominent display of any blocking problems
- **Quick Stats**: Completion rate, error count, agents deployed

### 5. Smart Notification System
Context-aware progress alerts:
- **Milestone Notifications**: Brief toast messages for major completions
- **Error Alerts**: Prominent but not intrusive error notifications
- **Status Changes**: Subtle notifications for workflow phase transitions
- **User-controlled**: Adjustable notification preferences
- **Timing Intelligence**: Don't interrupt during user typing or focus
- **Progressive Urgency**: Increase prominence for persistent issues

### 6. Minimal Visual Design
Clean, professional aesthetic:
- **Monochromatic Base**: Primarily grayscale with accent colors for status
- **Subtle Shadows**: Soft drop shadows for depth without distraction
- **Clean Typography**: Single font family, clear hierarchy
- **Generous Whitespace**: Breathing room around all elements
- **Consistent Spacing**: 8px grid system throughout
- **Minimal Borders**: Subtle borders only where necessary for separation

## UI Layout Specifications

### Compact Widget State (Default)
- **Size**: 80x80px circular widget
- **Elements**:
  - Circular progress ring (outer)
  - Percentage text (center, large)
  - Small status dot (top-right corner)
  - Workflow type text (bottom, small)
- **Interactions**: Hover for slight scale, click to expand

### Medium Expansion State
- **Size**: 320x180px rounded rectangle
- **Layout**: 
  - Progress ring (left side, smaller)
  - Current phase text (top-right)
  - Agent count and ETA (middle-right)
  - Progress bar for current phase (bottom)
- **Animation**: Slide out from widget position

### Full Expansion State
- **Size**: 400x300px detailed panel
- **Layout**:
  - Header with close button
  - Progress overview section
  - Active agents list (scrollable)
  - Recent activity feed
  - Quick action buttons
- **Position**: Center of screen or anchored to widget

### Mobile Adaptation
- **Widget**: 60x60px in bottom-right
- **Expansion**: Full-width bottom sheet
- **Touch**: Larger touch targets, swipe gestures

## Visual Design Requirements

### Color Palette
- **Primary**: Blue (#3B82F6) for active progress
- **Success**: Green (#10B981) for completed states
- **Warning**: Amber (#F59E0B) for attention needed
- **Error**: Red (#EF4444) for critical issues
- **Neutral**: Gray (#6B7280) for inactive elements
- **Background**: White with subtle gray tints

### Typography Scale
- **Progress Percentage**: text-2xl font-bold (main display)
- **Phase Text**: text-sm font-medium
- **Labels**: text-xs font-normal
- **Details**: text-sm font-normal
- **Timestamps**: text-xs font-mono text-gray-500

### Animation Principles
- **Subtle Entrance**: Gentle fade-in when widget appears
- **Hover Response**: 5% scale increase with shadow enhancement
- **Progress Updates**: Smooth ring animation over 0.5s
- **Expansion**: 300ms ease-out transition
- **Micro-interactions**: Brief scale/color responses to clicks
- **Loading States**: Subtle pulse animation during data fetches

### Spacing and Layout
- **Widget Margins**: 20px from screen edges
- **Internal Padding**: 12px within expanded panels
- **Element Spacing**: 8px between related elements
- **Section Spacing**: 16px between distinct sections
- **Touch Targets**: Minimum 44px for interactive elements

## Sample Data Structure

```javascript
const progressData = {
  workflow: {
    type: 'generate-app',
    name: 'App Generation',
    overallProgress: 67,
    currentPhase: 'UI Generation',
    status: 'active', // active, waiting, completed, error
    estimatedCompletion: '4m 30s',
    startTime: '2024-01-15T10:15:00Z'
  },
  summary: {
    totalAgents: 12,
    activeAgents: 5,
    completedTasks: 8,
    failedTasks: 1,
    currentPhaseProgress: 45
  },
  activeAgents: [
    {
      id: 'ui-generator-01',
      name: 'Page Generator',
      task: 'Creating dashboard components',
      progress: 78,
      type: 'ui-generation'
    }
  ],
  recentActivity: [
    {
      timestamp: '2024-01-15T10:28:15Z',
      message: 'Database schema generation completed',
      type: 'success',
      agentId: 'schema-generator-01'
    }
  ],
  notifications: [
    {
      id: 'notif-1',
      type: 'milestone',
      message: 'Database setup completed successfully',
      timestamp: '2024-01-15T10:25:00Z',
      dismissed: false
    }
  ]
}
```

## Interactive Features to Implement

### 1. Progressive Disclosure
- **Click Expansion**: Single click reveals more information
- **Hover Preview**: Brief hover shows quick status tooltip
- **Keyboard Navigation**: Tab/Enter for accessibility
- **Touch Gestures**: Tap to expand, swipe to dismiss on mobile
- **Auto-collapse**: Closes after 30 seconds of inactivity

### 2. Customization Options
- **Position Dragging**: Drag widget to preferred screen location
- **Size Options**: Small/Medium/Large widget sizes
- **Update Frequency**: Adjust how often data refreshes
- **Notification Preferences**: Control which alerts to show
- **Color Themes**: Light/Dark theme options

### 3. Smart Behavior
- **Focus Awareness**: Minimize notifications during user input
- **Context Sensitivity**: Show relevant information based on workflow phase
- **Progressive Urgency**: Increase visibility for persistent issues
- **Intelligent Positioning**: Avoid covering important content
- **Adaptive Refresh**: Faster updates during critical phases

### 4. Real-time Simulation
- **Progress Animation**: Smooth progress ring updates
- **Status Transitions**: Realistic workflow phase changes
- **Agent Activity**: Simulated agent start/stop/completion
- **Error Scenarios**: Occasional failures with recovery
- **Milestone Events**: Major completion celebrations

## Advanced Features to Include

### 1. Contextual Intelligence
- **User Activity Detection**: Reduce notifications during active typing
- **Application Awareness**: Integrate with user's current application context
- **Time-based Behavior**: Different notification patterns for different times
- **Workflow History**: Remember user preferences for different workflow types
- **Predictive Display**: Show information user is likely to need next

### 2. Accessibility Excellence
- **Screen Reader Support**: Complete ARIA labeling and descriptions
- **High Contrast Mode**: Alternative color scheme for low vision
- **Large Text Support**: Respect system font size preferences
- **Keyboard Navigation**: Full functionality without mouse
- **Motion Sensitivity**: Option to disable animations
- **Focus Management**: Proper focus handling during expansions

### 3. Performance Optimization
- **Minimal DOM**: Efficient component structure
- **Event Throttling**: Limit update frequency to prevent jank
- **Memory Management**: Efficient cleanup of notifications and history
- **Battery Awareness**: Reduce updates on low battery (if supported)
- **Network Optimization**: Efficient data fetching and caching

### 4. Integration Features
- **Embed API**: Allow integration into other applications
- **Webhook Support**: Real-time updates from external systems
- **Export Functionality**: Simple progress reports
- **Bookmark Progress**: Save interesting workflow moments
- **Share Status**: Quick sharing of current progress

## Responsive Design Requirements

### Desktop (1200px+)
- 80x80px default widget size
- Full expansion capabilities
- Hover interactions
- Drag repositioning

### Tablet (768px - 1199px)
- 70x70px widget size
- Touch-friendly interactions
- Simplified expansion states
- Gesture support

### Mobile (< 768px)
- 60x60px widget size
- Bottom sheet expansions
- Touch-optimized controls
- Swipe gestures

## File Structure Suggestion
```
src/
├── components/
│   ├── progress-companion/
│   │   ├── ProgressWidget.tsx
│   │   ├── CompactView.tsx
│   │   ├── ExpandedView.tsx
│   │   ├── DetailPanel.tsx
│   │   └── NotificationToast.tsx
│   ├── elements/
│   │   ├── CircularProgress.tsx
│   │   ├── StatusDot.tsx
│   │   ├── AgentList.tsx
│   │   └── ActivityFeed.tsx
│   └── ui/ (shadcn components)
├── hooks/
│   ├── useProgressData.ts
│   ├── useWidgetPosition.ts
│   ├── useNotifications.ts
│   └── useUserPreferences.ts
├── types/
│   └── progress.ts
├── utils/
│   ├── positionCalculations.ts
│   ├── notificationManager.ts
│   └── progressCalculations.ts
└── styles/
    └── animations.css
```

## Success Criteria
The prototype should demonstrate:
1. **Unobtrusive Design**: Provides information without interfering with user workflow
2. **Progressive Disclosure**: Efficient information revelation based on user need
3. **Smooth Interactions**: Polished animations and transitions
4. **Smart Positioning**: Intelligent placement that adapts to user behavior
5. **Essential Information**: Focuses on most important progress indicators
6. **Accessibility Excellence**: Usable by all users regardless of abilities
7. **Performance Efficiency**: Lightweight and responsive even during intensive workflows

Create a sophisticated yet minimal progress companion that enhances user awareness without overwhelming or distracting from their primary tasks.