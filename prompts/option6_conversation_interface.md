# Conversation-Style Progress Interface - bolt.new Prompt

## Project Overview
Create an innovative conversation-style progress interface for monitoring AI agent workflows in a full-stack application generation system. The interface should present agent activities as natural conversations, allowing users to interact with the system through chat-like interactions and receive progress updates in a familiar messaging format.

## Technical Requirements
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React icons for messaging UI
- **State Management**: React useState with useReducer for conversation state
- **Real-time Updates**: Simulated WebSocket-style message streaming
- **Animations**: Smooth message animations and typing indicators
- **Text Processing**: Simple natural language query processing

## Core Features to Implement

### 1. Chat-Style Message Timeline
Familiar messaging interface layout:
- **Message Bubbles**: Distinct visual styles for different agent types
- **Avatar System**: Unique avatars for each agent type and system messages
- **Timestamp Display**: Clear time indicators for message chronology
- **Message Threading**: Group related messages from same agent
- **Auto-scroll**: Automatic scrolling to latest messages
- **Message History**: Scrollable conversation history
- **Conversation Search**: Find specific messages or agents

### 2. Agent Personas and Communication
Personalized agent representation:
- **Agent Personalities**: Each agent type has distinct communication style
- **Status Updates**: Agents "speak" about their current tasks and progress
- **Natural Language**: Human-like descriptions of technical processes
- **Progress Announcements**: Agents announce milestones and completions
- **Error Reporting**: Agents explain problems in conversational manner
- **Collaboration Messages**: Agents communicate about dependencies

### 3. User Query Integration
Interactive conversation capabilities:
- **Natural Language Questions**: Users can ask about progress in plain English
- **Smart Responses**: System interprets questions and provides relevant answers
- **Agent-specific Queries**: Direct questions to specific agents
- **Workflow Inquiries**: Ask about overall workflow status and ETAs
- **Historical Questions**: Query about past events and decisions
- **Help and Guidance**: Conversational help about the workflow process

### 4. Typing Indicators and Live Activity
Real-time communication feedback:
- **Agent Typing Indicators**: Show when agents are actively working
- **Multiple Typing**: Handle multiple agents typing simultaneously
- **Activity Descriptions**: Agents describe what they're currently doing
- **Progress Updates**: Live updates about task progression
- **Collaboration Indicators**: Show when agents are coordinating
- **System Notifications**: Important system-level announcements

### 5. Rich Message Content
Enhanced message types beyond text:
- **Progress Attachments**: Visual progress bars within messages
- **Code Snippets**: Formatted code samples agents are working on
- **File References**: Links to generated files and components
- **Error Logs**: Expandable error information in messages
- **Screenshots**: Visual previews of UI components being created
- **Workflow Diagrams**: Simple visual representations of progress

### 6. Contextual Smart Suggestions
Intelligent conversation assistance:
- **Suggested Questions**: Pre-written questions based on current state
- **Quick Actions**: One-click responses for common user actions
- **Smart Completions**: Auto-complete for common queries
- **Workflow Guidance**: Suggestions for next steps or interventions
- **Learning Responses**: System learns from user interaction patterns
- **Context-aware Help**: Relevant help based on current workflow phase

## UI Layout Specifications

### Main Chat Interface
- **Header Section**:
  - Workflow title and overall status
  - Participant count (active agents)
  - Conversation controls (pause, clear, export)
  - Search bar for message history

- **Message Area** (Central, scrollable):
  - Full conversation timeline
  - Message bubbles with appropriate styling
  - Typing indicators
  - Smart suggestions bar
  - Quick action buttons

- **Input Section** (Bottom):
  - Message input field with placeholder suggestions
  - Send button with keyboard shortcut (Enter)
  - Voice input button (optional)
  - Quick suggestion chips
  - Attachment button for files/screenshots

### Sidebar Panel (Optional)
- **Active Agents List**: Currently working agents with status
- **Conversation Participants**: All agents involved in workflow
- **Quick Stats**: Overall progress metrics
- **Workflow Timeline**: High-level phase progression
- **Pinned Messages**: Important announcements and milestones

## Visual Design Requirements

### Message Bubble Design
- **System Messages**: Light blue background (#EBF8FF) with system icon
- **Agent Messages**: Different colors per agent type:
  - Database Agent: Green (#DCFCE7) with database icon
  - UI Agent: Purple (#F3E8FF) with layout icon
  - API Agent: Orange (#FED7AA) with server icon
  - Testing Agent: Red (#FEE2E2) with check icon
- **User Messages**: Dark blue (#1D4ED8) with white text
- **Error Messages**: Red accent with warning styling
- **Success Messages**: Green accent with checkmark

### Typography and Spacing
- **Message Text**: text-sm font-normal with comfortable line-height
- **Agent Names**: text-xs font-semibold above each message
- **Timestamps**: text-xs text-gray-500 with relative time
- **System Announcements**: text-sm font-medium with emphasis
- **Code Snippets**: font-mono text-xs with syntax highlighting

### Animation Patterns
- **Message Arrival**: Smooth slide-up animation from bottom
- **Typing Indicators**: Bouncing dots animation
- **Status Changes**: Color transition animations for agent status
- **Progress Updates**: Smooth progress bar animations within messages
- **User Input**: Smooth focus states and button interactions
- **Auto-scroll**: Smooth scrolling to new messages

### Avatar System
- **Agent Avatars**: Distinctive icons for each agent type
- **Status Indicators**: Small colored dots showing agent status
- **System Avatar**: Gear or system icon for system messages
- **User Avatar**: Simple user icon or initials
- **Group Indicators**: Special styling for multi-agent collaborations

## Sample Conversation Flow

```javascript
const conversationData = {
  messages: [
    {
      id: 'msg-1',
      type: 'system',
      sender: 'System',
      avatar: 'gear',
      content: 'Starting app generation workflow for "Task Management App"',
      timestamp: '2024-01-15T10:00:00Z',
      attachments: []
    },
    {
      id: 'msg-2',
      type: 'agent',
      sender: 'MongoDB Agent',
      agentId: 'mongodb-agent-001',
      agentType: 'database',
      avatar: 'database',
      content: 'Hey team! I\'m setting up the MongoDB cluster now. This should take about 3-4 minutes.',
      timestamp: '2024-01-15T10:00:15Z',
      status: 'active',
      progress: 0,
      attachments: []
    },
    {
      id: 'msg-3',
      type: 'agent',
      sender: 'Schema Designer',
      agentId: 'schema-agent-001',
      agentType: 'database',
      avatar: 'file-text',
      content: 'I\'m waiting for the database setup to complete, then I\'ll create the Prisma schema based on the task management requirements.',
      timestamp: '2024-01-15T10:00:30Z',
      status: 'waiting',
      dependencies: ['mongodb-agent-001'],
      attachments: []
    },
    {
      id: 'msg-4',
      type: 'user',
      sender: 'You',
      avatar: 'user',
      content: 'How long will the entire process take?',
      timestamp: '2024-01-15T10:01:00Z',
      attachments: []
    },
    {
      id: 'msg-5',
      type: 'system',
      sender: 'Workflow Coordinator',
      avatar: 'clock',
      content: 'Based on current progress, the entire app generation should complete in approximately 25-30 minutes. Here\'s the breakdown:',
      timestamp: '2024-01-15T10:01:05Z',
      attachments: [
        {
          type: 'timeline',
          data: {
            'Database Setup': '4 minutes',
            'Schema Design': '5 minutes', 
            'UI Generation': '12 minutes',
            'API Development': '8 minutes',
            'Testing & Deployment': '6 minutes'
          }
        }
      ]
    }
  ],
  typingIndicators: [
    {
      agentId: 'mongodb-agent-001',
      agentName: 'MongoDB Agent',
      activity: 'configuring cluster settings...'
    }
  ],
  suggestions: [
    'Show me the current database setup progress',
    'What agents are currently active?',
    'Can you explain what the UI Agent will do?',
    'Are there any errors or issues?'
  ]
}
```

## Interactive Features to Implement

### 1. Natural Language Processing
- **Question Recognition**: Identify user questions about progress, agents, or workflow
- **Intent Classification**: Categorize queries (status, help, control, information)
- **Response Generation**: Generate appropriate responses based on current workflow state
- **Agent Addressing**: Allow users to ask questions to specific agents
- **Context Awareness**: Understand references to previous messages or agents

### 2. Smart Conversation Features
- **Auto-complete**: Suggest completions for common questions
- **Message Reactions**: Quick emoji reactions to agent messages
- **Message Bookmarking**: Save important messages for later reference
- **Thread Creation**: Group related messages into conversation threads
- **Search Functionality**: Find specific messages, agents, or topics

### 3. Real-time Agent Simulation
- **Dynamic Messaging**: Agents send messages based on their current activity
- **Status Announcements**: Agents announce when they start, pause, or complete tasks
- **Collaboration Messages**: Agents communicate with each other about dependencies
- **Error Reporting**: Agents explain problems and recovery attempts
- **Progress Updates**: Regular progress announcements with details

### 4. User Interaction Capabilities
- **Direct Agent Communication**: Send messages to specific agents
- **Workflow Control**: Pause, resume, or stop workflow through chat commands
- **Information Requests**: Ask for detailed information about any aspect
- **Manual Interventions**: Request manual actions through conversation
- **Export Conversations**: Save conversation logs for documentation

## Advanced Conversation Features

### 1. Voice Integration (Optional)
- **Voice Input**: Speak questions instead of typing
- **Voice Responses**: System can read important messages aloud
- **Voice Commands**: Control workflow with voice commands
- **Accessibility**: Support for users with mobility limitations
- **Multi-language**: Support for different languages and accents

### 2. Contextual Intelligence
- **Conversation Memory**: Remember previous questions and preferences
- **Workflow Context**: Understand current phase and provide relevant information
- **User Learning**: Adapt responses based on user's technical level
- **Proactive Updates**: Anticipate information user might need
- **Smart Timing**: Send updates at appropriate moments

### 3. Rich Media Integration
- **File Sharing**: Agents can share generated files and code
- **Image Previews**: Show screenshots of UI components being created
- **Code Highlighting**: Syntax-highlighted code snippets in messages
- **Progress Visualizations**: Embedded charts and progress indicators
- **Interactive Elements**: Clickable buttons and controls within messages

### 4. Collaboration Features
- **Multi-user Support**: Multiple team members can participate in conversation
- **Role-based Access**: Different conversation permissions for different users
- **Mention System**: @mention specific agents or team members
- **Notification Management**: Control which messages trigger notifications
- **Conversation Branching**: Handle multiple conversation topics simultaneously

## Message Type Specifications

### 1. Agent Status Messages
```javascript
{
  type: 'agent-status',
  content: 'I\'ve completed setting up the user authentication system. The login and registration endpoints are now ready!',
  status: 'completed',
  progress: 100,
  duration: '4m 32s',
  attachments: [
    { type: 'code-snippet', language: 'javascript', content: '...' },
    { type: 'endpoint-list', data: ['/api/login', '/api/register'] }
  ]
}
```

### 2. System Announcements
```javascript
{
  type: 'system-announcement',
  content: 'Milestone reached: Database setup phase completed successfully!',
  importance: 'high',
  phase: 'database-setup',
  nextPhase: 'ui-generation',
  attachments: [
    { type: 'progress-summary', completedTasks: 5, totalTasks: 12 }
  ]
}
```

### 3. Error Reports
```javascript
{
  type: 'error-report',
  content: 'I encountered an issue while generating the user profile component. Attempting automatic recovery...',
  errorCode: 'UI_GEN_001',
  severity: 'medium',
  recoveryAction: 'retry-with-alternative-template',
  attachments: [
    { type: 'error-log', content: '...' },
    { type: 'recovery-plan', steps: ['...'] }
  ]
}
```

### 4. Collaboration Messages
```javascript
{
  type: 'collaboration',
  content: '@Schema-Designer, I need the User model definition to continue with the profile page generation.',
  mentionedAgents: ['schema-designer-001'],
  waitingFor: 'user-model-schema',
  blockingTasks: ['user-profile-page', 'user-settings-page']
}
```

## Responsive Design Requirements

### Desktop (1200px+)
- Full conversation interface with sidebar
- Rich message attachments and previews
- Complete typing indicators and suggestions
- Multi-column layout for complex conversations

### Tablet (768px - 1199px)
- Simplified sidebar that can be toggled
- Touch-friendly message interactions
- Optimized typing suggestions
- Swipe gestures for navigation

### Mobile (< 768px)
- Full-screen conversation view
- Bottom sheet for agent details
- Touch-optimized input and suggestions
- Voice input prominence for easier interaction

## File Structure Suggestion
```
src/
├── components/
│   ├── conversation/
│   │   ├── ConversationInterface.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageInput.tsx
│   │   ├── TypingIndicator.tsx
│   │   ├── AgentAvatar.tsx
│   │   └── MessageAttachment.tsx
│   ├── sidebar/
│   │   ├── AgentList.tsx
│   │   ├── ConversationStats.tsx
│   │   └── WorkflowTimeline.tsx
│   ├── suggestions/
│   │   ├── SmartSuggestions.tsx
│   │   ├── QuickActions.tsx
│   │   └── CommandAutocomplete.tsx
│   └── ui/ (shadcn components)
├── hooks/
│   ├── useConversation.ts
│   ├── useNaturalLanguage.ts
│   ├── useAgentSimulation.ts
│   ├── useMessageHistory.ts
│   └── useVoiceInput.ts
├── utils/
│   ├── messageProcessor.ts
│   ├── nlpHelpers.ts
│   ├── conversationGenerator.ts
│   └── agentPersonalities.ts
├── types/
│   ├── conversation.ts
│   ├── agents.ts
│   └── messages.ts
└── data/
    ├── agentPersonalities.ts
    ├── messageSamples.ts
    └── conversationTemplates.ts
```

## Success Criteria
The prototype should demonstrate:
1. **Natural Communication**: Feels like chatting with a helpful team rather than monitoring a system
2. **Intelligent Responses**: System provides relevant, helpful answers to user questions
3. **Rich Context**: Conversations provide deep insight into workflow progress and decisions
4. **Engaging Experience**: Users find the conversation format more engaging than traditional dashboards
5. **Practical Utility**: Interface provides all necessary information for workflow monitoring
6. **Accessibility Excellence**: Works well with screen readers and voice controls
7. **Performance Efficiency**: Smooth conversation flow even with many active agents

Create an innovative conversation interface that transforms technical workflow monitoring into an intuitive, engaging chat experience that users genuinely enjoy interacting with.