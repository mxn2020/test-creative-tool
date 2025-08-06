# Immersive 3D Progress Environment - bolt.new Prompt

## Project Overview
Create a cutting-edge 3D immersive environment for visualizing AI agent workflows in a full-stack application generation system. The interface should provide a futuristic, spatial representation of agent activities, infrastructure, and data flows in a navigable 3D space.

## Technical Requirements
- **Framework**: React with TypeScript
- **3D Library**: Three.js (r128) - avoid THREE.CapsuleGeometry (use alternatives)
- **Styling**: Tailwind CSS for UI overlays
- **Icons**: Lucide React icons for 2D UI elements
- **State Management**: React useState with useReducer for complex 3D state
- **Performance**: Optimized rendering with efficient geometry and materials
- **Controls**: Custom orbital controls and camera management

## Core Features to Implement

### 1. 3D Environment Setup
Create an immersive 3D workspace:
- **Dark Space Theme**: Deep space background with subtle stars/nebula
- **Grid Floor**: Futuristic grid pattern extending to horizon
- **Ambient Lighting**: Soft blue/cyan ambient light
- **Directional Lighting**: Key light source for depth and shadows
- **Particle Systems**: Subtle floating particles for atmosphere
- **Fog Effects**: Distance fog for depth perception

### 2. Agent Representation as 3D Objects
Dynamic 3D objects representing AI agents:
- **Agent Nodes**: Floating geometric shapes (spheres, cubes, pyramids)
- **Agent Types**: Different shapes for different agent types:
  - **Database Agents**: Cylinder with rotating rings
  - **UI Agents**: Icosahedron with pulsing light
  - **API Agents**: Torus with flowing particles
  - **Testing Agents**: Octahedron with scanning beams
- **Status Auras**: Glowing halos indicating agent status:
  - Active: Bright green glow
  - Waiting: Yellow pulsing
  - Failed: Red flickering
  - Completed: Soft blue fade
- **Progress Visualization**: Filling/growing effects showing task completion

### 3. Infrastructure Visualization
3D representations of system components:
- **Database Clusters**: Large rotating cylinder structures with data streams
- **Server Nodes**: Cube farms with connection lines
- **API Gateways**: Portal-like structures with flowing data
- **Frontend Platforms**: Floating platforms with UI component previews
- **Network Connections**: Animated light beams between infrastructure

### 4. Data Flow Animation
Dynamic visualization of information movement:
- **Connection Streams**: Animated particles flowing between agents
- **Data Packets**: Small glowing objects traveling along paths
- **Bandwidth Indicators**: Thickness of streams indicating data volume
- **Latency Visualization**: Speed of particle movement showing response times
- **Error Flows**: Red error particles for failed operations
- **Success Cascades**: Green completion waves for successful operations

### 5. Spatial Organization
Logical 3D layout of workflow elements:
- **Team Territories**: Defined 3D regions for different agent teams
- **Workflow Layers**: Vertical layers for different workflow phases
- **Dependency Bridges**: Physical connections showing task dependencies
- **Central Hub**: Main coordination node in center of space
- **Agent Paths**: Visible trails showing agent activity history
- **Zone Boundaries**: Subtle visual boundaries between functional areas

### 6. Interactive 3D Navigation
Comprehensive camera and interaction system:
- **Orbital Controls**: Mouse-based camera rotation around center point
- **Zoom Capabilities**: Smooth zoom in/out with mouse wheel
- **Pan Functionality**: Right-click drag for camera panning
- **Preset Views**: Quick camera positions for different perspectives
- **Guided Tours**: Automated camera movements following workflow progress
- **Focus Mode**: Auto-center camera on selected agents or infrastructure

### 7. Agent Interaction and Details
Rich interaction system for 3D objects:
- **Object Selection**: Click to select agents with visual highlighting
- **Hover Effects**: Glow and scale effects on mouse hover
- **Detail Panels**: 2D overlay panels showing detailed agent information
- **Multi-selection**: Ctrl+click for selecting multiple agents
- **Context Menus**: Right-click menus for agent actions
- **Agent Following**: Camera tracking of specific agents

## UI Layout Specifications

### 3D Canvas (Full Screen)
- **WebGL Renderer**: Full viewport 3D scene
- **Performance Overlay**: FPS counter and performance metrics
- **Loading States**: 3D loading animations and progress indicators
- **Error Boundaries**: Graceful fallback for WebGL issues

### 2D UI Overlays
- **Top HUD**: Workflow status, time, and global controls
- **Bottom Control Panel**: Camera controls, view options, agent filters
- **Left Sidebar**: Agent list with 3D navigation links
- **Right Panel**: Selected agent details and system statistics
- **Floating Tooltips**: Context-sensitive information displays

### Navigation Controls
- **Camera Control Hints**: Visual indicators for navigation
- **Preset Camera Buttons**: Quick access to standard views
- **Zoom Level Indicator**: Current zoom level display
- **Reset View Button**: Return to default camera position
- **VR/AR Toggle**: Optional immersive experience controls

## Visual Design Requirements

### 3D Material Design
- **Agent Materials**: Emissive materials with subtle reflection
- **Infrastructure Materials**: Metallic surfaces with normal mapping
- **Connection Materials**: Transparent glowing materials for data flows
- **Background Materials**: Space-like environment with particle effects
- **UI Materials**: Semi-transparent glass-like surfaces for overlays

### Color Palette
- **Primary**: Cyan (#00D4FF) for active elements
- **Secondary**: Purple (#8B5CF6) for infrastructure
- **Success**: Green (#10B981) for completed tasks
- **Warning**: Yellow (#F59E0B) for waiting states
- **Error**: Red (#EF4444) for failed operations
- **Neutral**: Blue-gray (#64748B) for inactive elements

### Lighting and Effects
- **Ambient Lighting**: Soft blue ambient (#1E293B)
- **Key Light**: Bright white directional light
- **Agent Glows**: Emissive materials for status indication
- **Particle Effects**: Floating particles and data streams
- **Post-processing**: Bloom effect for glowing elements
- **Shadow Mapping**: Realistic shadows for depth

### Animation Patterns
- **Agent Movement**: Smooth floating and rotation animations
- **Status Transitions**: Color and scale transitions for state changes
- **Data Flow**: Continuous particle stream animations
- **Camera Movements**: Smooth eased transitions between views
- **Loading Sequences**: Sophisticated 3D loading animations
- **Success Celebrations**: Burst effects for completed tasks

## Sample 3D Scene Structure

```javascript
const scene3D = {
  environment: {
    background: 'space-gradient',
    fog: { color: 0x1a1a2e, near: 100, far: 2000 },
    grid: { size: 100, divisions: 50, color: 0x00d4ff }
  },
  lighting: {
    ambient: { color: 0x1e293b, intensity: 0.3 },
    directional: { 
      color: 0xffffff, 
      intensity: 1,
      position: [50, 100, 50],
      castShadow: true
    }
  },
  agents: [
    {
      id: 'mongodb-agent-001',
      type: 'database',
      geometry: 'cylinder',
      position: [-20, 5, -10],
      rotation: [0, Math.PI * 0.01, 0], // continuous rotation
      material: {
        color: 0x3b82f6,
        emissive: 0x1e40af,
        emissiveIntensity: 0.3
      },
      status: 'active',
      progress: 0.67,
      connections: ['schema-agent-001', 'migration-agent-001']
    }
  ],
  infrastructure: [
    {
      id: 'mongodb-cluster',
      type: 'database-cluster',
      geometry: 'group', // multiple cylinders
      position: [-30, 0, -20],
      scale: [2, 2, 2],
      animations: ['rotation', 'glow-pulse']
    }
  ],
  connections: [
    {
      id: 'conn-1',
      from: 'mongodb-agent-001',
      to: 'schema-agent-001',
      type: 'data-flow',
      particles: {
        count: 20,
        speed: 2,
        color: 0x10b981
      }
    }
  ]
}
```

## Interactive Features to Implement

### 1. 3D Object Interaction
- **Ray Casting**: Precise object selection with mouse pointer
- **Object Highlighting**: Outline or glow effects for hovered objects
- **Selection States**: Visual feedback for selected agents
- **Multi-selection**: Bounding box or lasso selection for multiple objects
- **Drag Interaction**: Move agents in 3D space (if applicable)

### 2. Camera System
- **Orbital Controls**: Smooth mouse-based camera control
- **Keyboard Navigation**: WASD movement with arrow key rotation
- **Touch Support**: Mobile-friendly touch controls for tablets
- **Camera Constraints**: Prevent camera from going too close/far
- **Auto-rotation**: Optional automatic camera rotation around scene

### 3. Real-time 3D Updates
- **Agent State Changes**: Real-time geometry and material updates
- **New Agent Spawning**: Smooth animation for new agents entering scene
- **Agent Removal**: Graceful fade-out for completed/failed agents
- **Infrastructure Changes**: Dynamic infrastructure modifications
- **Performance Optimization**: LOD (Level of Detail) for distant objects

### 4. Immersive Features
- **Guided Workflows**: Camera follows workflow progression automatically
- **Focus Modes**: Zoom and highlight specific workflow areas
- **Time-lapse**: Speed up visualization to show workflow completion
- **Replay System**: Record and replay workflow progressions
- **Screenshots**: Capture current 3D view for reports

## Advanced 3D Features

### 1. Procedural Animations
- **Agent Behaviors**: Unique movement patterns for different agent types
- **Organic Movements**: Floating, bobbing, and rotation animations
- **Reaction Animations**: Agents react to nearby activity
- **Formation Flying**: Related agents move in coordinated patterns
- **Environmental Reactions**: Agents respond to infrastructure changes

### 2. Particle Systems
- **Data Streams**: Flowing particles between connected agents
- **Success Bursts**: Celebration particles for completed tasks
- **Error Sparks**: Error indication particle effects
- **Ambient Particles**: Background atmosphere particles
- **Interactive Particles**: Particles that respond to mouse movement

### 3. Advanced Materials and Shaders
- **Holographic Materials**: Transparent, glowing agent representations
- **Animated Textures**: Moving patterns on agent surfaces
- **Procedural Textures**: Generated patterns for uniqueness
- **Reflection/Refraction**: Realistic material properties
- **Custom Shaders**: Specialized visual effects for different elements

### 4. Performance Optimization
- **Instanced Rendering**: Efficient rendering of similar objects
- **Frustum Culling**: Only render visible objects
- **Level of Detail**: Simplified geometry for distant objects
- **Texture Atlasing**: Optimized texture usage
- **Animation Culling**: Pause animations for off-screen objects

## Responsive Design and Accessibility

### Desktop (1200px+)
- Full 3D experience with all features
- Complete camera control system
- Detailed 3D representations
- Rich particle effects and animations

### Tablet (768px - 1199px)
- Simplified 3D scene with reduced complexity
- Touch-friendly camera controls
- Reduced particle count for performance
- Larger touch targets for object selection

### Mobile (< 768px)
- Minimal 3D scene or 2D fallback option
- Simple touch controls
- Essential agents only
- Performance-optimized rendering

### Accessibility Features
- **Keyboard Navigation**: Full keyboard control of 3D scene
- **Screen Reader Support**: Alt text and descriptions for 3D elements
- **High Contrast Mode**: Alternative color scheme for visibility
- **Motion Reduction**: Option to disable animations for motion sensitivity
- **Focus Indicators**: Clear visual focus states for keyboard users

## File Structure Suggestion
```
src/
├── components/
│   ├── 3d/
│   │   ├── Scene3D.tsx
│   │   ├── Agent3D.tsx
│   │   ├── Infrastructure3D.tsx
│   │   ├── DataFlow3D.tsx
│   │   ├── Environment3D.tsx
│   │   └── CameraControls.tsx
│   ├── overlays/
│   │   ├── HUD.tsx
│   │   ├── AgentDetails.tsx
│   │   ├── NavigationControls.tsx
│   │   └── PerformanceStats.tsx
│   ├── ui/ (2D UI components)
│   └── fallbacks/
│       └── WebGLFallback.tsx
├── hooks/
│   ├── use3DScene.ts
│   ├── useAgentAnimations.ts
│   ├── useCameraControls.ts
│   └── usePerformanceMonitor.ts
├── utils/
│   ├── 3dCalculations.ts
│   ├── agentGeometry.ts
│   ├── particleSystems.ts
│   └── sceneOptimization.ts
├── materials/
│   ├── agentMaterials.ts
│   ├── infrastructureMaterials.ts
│   └── customShaders.ts
└── types/
    └── 3dScene.ts
```

## Success Criteria
The prototype should demonstrate:
1. **Immersive Experience**: Engaging 3D environment that enhances understanding
2. **Intuitive Navigation**: Easy-to-use 3D camera controls and object interaction
3. **Performance Excellence**: Smooth 60fps rendering with multiple agents
4. **Visual Clarity**: Clear representation of agent states and relationships
5. **Real-time Responsiveness**: Smooth updates and animations for live data
6. **Professional 3D Quality**: Production-level 3D graphics and effects
7. **Accessibility Compliance**: Usable by users with different abilities and devices

Create a stunning 3D visualization that transforms complex AI agent workflows into an intuitive, immersive spatial experience that users find both informative and engaging.