# Dev Container Package

A sophisticated development feedback system that enables stakeholders to provide contextual change requests directly on live React applications with AI-optimized data collection.

## Features

- **Container Component**: Wraps React components to make them selectable in dev mode
- **Dev Mode Provider**: Zustand-based global state management with persistence
- **Change Management**: Complete lifecycle for collecting, editing, and submitting change requests
- **Sidebar Interface**: Comprehensive change management panel with real-time updates
- **Popover Feedback**: Contextual feedback collection with priority and category selection
- **Component Library Integration**: Pre-containerized HTML elements and Shadcn components
- **Registry Validation**: Development-time validation with error reporting and suggestions
- **Keyboard Shortcuts**: Quick dev mode toggle (Ctrl+Shift+D)
- **AI-Ready Output**: Structured change requests optimized for AI processing
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Quick Start

1. **Set up your component registry**:

```typescript
// src/registry.ts
import { createRegistry, ComponentMeta } from './lib/dev-container';

const components: ComponentMeta[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Main landing page component',
    filePath: 'src/components/Landing.tsx',
    category: 'page',
    semanticTags: ['landing', 'hero', 'homepage'],
  },
  // Add more components...
];

export const componentRegistry = createRegistry(components);
```

2. **Wrap your app with DevModeApp**:

```typescript
// src/App.tsx
import { DevModeApp, Container } from './lib/dev-container';
import { componentRegistry } from './registry';

function App() {
  return (
    <DevModeApp registry={componentRegistry}>
      <Container componentId="app-root">
        {/* Your app content */}
      </Container>
    </DevModeApp>
  );
}
```

3. **Wrap components with Container**:

```typescript
// src/components/Landing.tsx
import { Container } from '../lib/dev-container';

export const Landing = () => {
  return (
    <Container componentId="landing-page">
      <div className="landing-content">
        {/* Your component content */}
      </div>
    </Container>
  );
};
```

## Component Libraries

### Geenius Components

Pre-containerized HTML elements for common use cases:

```typescript
import { Div, Header, Nav, Section, Paragraph, Anchor } from './lib/dev-container/geenius';

// Semantic Elements
import { Article, Aside, Main, Figure, Figcaption } from './lib/dev-container/geenius';

// Text Elements  
import { Strong, Em, Code, Pre, Blockquote } from './lib/dev-container/geenius';

// Media Elements
import { Img, Video, Audio } from './lib/dev-container/geenius';

// List Elements
import { Ul, Ol, Li } from './lib/dev-container/geenius';
```

All geenius components support:
- `devId`: Component ID for registry lookup
- `devDetailed`: Override global containerization setting
- Standard HTML props for the respective element

### Shadcn Components

Containerized versions of Shadcn UI components:

```typescript
import { Button, Card, Input, Badge, Avatar } from './lib/dev-container/shadcn';
// ... and many more
```

## API Reference

### DevModeApp

The main wrapper component that provides dev mode functionality.

```typescript
<DevModeApp registry={componentRegistry}>
  {children}
</DevModeApp>
```

### Container

Wraps components to make them selectable in dev mode.

```typescript
<Container 
  componentId="unique-component-id"
  selectable={true}
  devActions={[]}
  className="custom-class"
  meta={{
    // Optional metadata override
    name: "Custom Component",
    description: "Custom description"
  }}
>
  {children}
</Container>
```

### useDevMode Hook

Access dev mode state and actions.

```typescript
const {
  isEnabled,
  selectedComponentId,
  changes,
  config,
  toggleDevMode,
  addChange,
  editChange,
  removeChange,
  submitChanges,
  selectComponent,
} = useDevMode();
```

## Development Mode Usage

1. **Toggle Dev Mode**: Click the "Enter Dev Mode" button in the top-right corner
2. **Select Components**: Click on any wrapped component to select it
3. **Add Feedback**: Use the popover to add change requests
4. **Manage Changes**: Use the sidebar to review and edit changes
5. **Submit Changes**: Send all changes to your development endpoint

## Change Request Structure

```typescript
interface ChangeRequest {
  id: string;
  componentId: string;
  feedback: string;
  category: ChangeCategory;
  priority: ChangePriority;
  status: ChangeStatus;
  componentContext: ComponentContext;
  pageContext: PageContext;
  timestamp: number;
}
```

## Configuration

Configure dev mode behavior through the Zustand store:

```typescript
const config = {
  enabled: false,                    // Dev mode state
  showBorders: true,                 // Visual component borders
  showTooltips: true,                // Component name tooltips on hover
  autoOpenSidebar: false,            // Automatically open sidebar in dev mode
  persistChanges: true,              // Persist changes to localStorage
  maxChanges: 50,                    // Maximum change requests to store
  submitEndpoint: '/api/dev-changes', // API endpoint for submitting changes
  detailedContainerization: true,     // Enable detailed HTML element containerization
};
```

### Containerization Control

Control which components get containerized:

```typescript
// Global setting - affects all geenius components
const { config } = useDevMode();
config.detailedContainerization = false; // Disable by default

// Component-level override
<Div devDetailed={true} devId="special-div">  // Force containerization
<Div devDetailed={false} devId="simple-div"> // Disable containerization
<Div devId="noID">                           // Skip containerization entirely
```

## Integration with AI Systems

The package structures change requests optimally for AI processing:

- **Component Context**: Full metadata about the component
- **Page Context**: Current page and URL information
- **Semantic Tags**: Searchable component descriptors
- **Hierarchical Data**: Parent-child component relationships

## Registry Validation

Use built-in validation utilities for development:

```typescript
import { validateRegistry, validateComponentId } from './lib/dev-container/utils/validation';

// Validate entire registry
const validation = validateRegistry(componentRegistry);
if (validation.errors.length > 0) {
  console.error('Registry errors:', validation.errors);
}

// Validate individual component ID
const result = validateComponentId('my-component', componentRegistry);
if (!result.isValid) {
  console.warn('Invalid component ID:', result.suggestions);
}
```

## Keyboard Shortcuts

- **Ctrl+Shift+D**: Toggle dev mode on/off
- **Escape**: Deselect current component
- **Click**: Select component for feedback

## Best Practices

1. **Component Registry**: Keep your registry up-to-date as you add components
2. **Semantic Tags**: Use descriptive tags for better AI processing and searchability
3. **File Paths**: Maintain accurate file paths for developer context
4. **Categories**: Use appropriate categories (ui, layout, content, interactive, media) for change requests
5. **Descriptions**: Write clear component descriptions that explain purpose and context
6. **Component IDs**: Use descriptive, kebab-case IDs that match component names
7. **Containerization Strategy**: Use `detailedContainerization: false` in production, enable selectively for specific components
8. **Performance**: Avoid deep nesting of containerized components in large component trees

## Troubleshooting

### Common Issues

**"Component not found in registry" error:**
- Ensure component ID exists in your registry
- Check for typos in componentId prop
- Use validation utilities to verify registry integrity

**Components not containerizing:**
- Check `detailedContainerization` setting
- Verify `devDetailed` prop is not set to `false`
- Ensure component is wrapped with proper devId

**Performance issues with many components:**
- Reduce `detailedContainerization` scope
- Use selective containerization with `devDetailed={true}`
- Consider lazy loading for large component trees

## Example Implementation

See the main App.tsx and Landing.tsx files for a complete implementation example.

## Development Status

This package is actively developed with recent additions:
- ✅ Semantic HTML5 elements (Article, Aside, Main, Figure, Figcaption)
- ✅ Media elements (Img, Video, Audio)  
- ✅ Text formatting elements (Strong, Em, Code, Pre, Blockquote)
- ✅ List elements (Ul, Ol, Li)
- ✅ Registry validation utilities
- ✅ Detailed containerization control