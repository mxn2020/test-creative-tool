// src/lib/dev-container/types.ts

import { ComponentRegistryId } from '@/registry/componentRegistry';
import React, { ReactNode, ComponentType, CSSProperties, RefObject } from 'react';

// Import DOMRect type for boundingRect property
type DOMRect = globalThis.DOMRect;

// =====================================
// CORE COMPONENT TYPES
// =====================================

export type ComponentCategory = 
  | 'ui'
  | 'page'
  | 'layout'
  | 'content'
  | 'media'
  | 'shadcn'
  | 'navigation'
  | 'interactive'
  | 'form'
  | 'typography'
  | 'overlay'
  | 'feedback'
  | 'data-display'
  | 'custom';

// =====================================
// COMPONENT DEFINITION (What components exist)
// =====================================
export interface ComponentDefinition {
  id: string; // e.g., 'dev-button', 'dev-card', 'shadcn-button'
  name: string; // e.g., 'Dev Button', 'Shadcn Button'
  description: string;
  componentPath: string; // Path to the component file (src/lib/dev-container/shadcn/Button.tsx)
  repositoryPath?: string; // Full GitHub URL to component definition
  category: ComponentCategory;
  semanticTags: string[];
  dependencies?: string[]; // Other component definitions this depends on
  props?: Record<string, any>; // Available props interface
}

export interface ComponentLibrary {
  [definitionId: string]: ComponentDefinition;
}

// =====================================
// COMPONENT USAGE (How components are used)
// =====================================
export interface ComponentUsage {
  id: string; // e.g., 'hero-start-building', 'nav-login-button'
  definitionId: string; // References ComponentDefinition.id
  name: string; // Usage-specific name (e.g., 'Hero Start Building Button')
  description: string; // What this specific usage does
  filePath: string; // Where this usage occurs (src/pages/Landing.tsx)
  repositoryPath?: string; // Full GitHub URL to usage file
  category: ComponentCategory; // Can override definition category if needed
  semanticTags: string[]; // Usage-specific tags
  dependencies?: string[]; // Other component usages this depends on
  props?: Record<string, any>; // Actual props passed in this usage
}

export interface ComponentRegistry {
  [usageId: string]: ComponentUsage;
}

// =====================================
// COMBINED SYSTEM
// =====================================
export interface ComponentSystem {
  library: ComponentLibrary; // All available component definitions
  registry: ComponentRegistry; // All component usages across the app
}

// =====================================
// DEV PROPS INTERFACE
// =====================================
export interface DevProps {
  devId: ComponentRegistryId; // Unique identifier for the component in dev mode
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  devDetailed?: boolean;
}

// =====================================
// CONTAINER COMPONENT TYPES
// =====================================
export interface ContainerProps {
  componentId: ComponentRegistryId; // Usage ID from ComponentRegistry
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  // NEW: Reference to component definition in library
  definitionId?: ComponentRegistryId; // e.g., 'dev-h1', 'dev-button', etc.
  // Optional overrides for component definition
  name?: string; // Override the component name
  description?: string; // Override the component description
  // Usage context override (for unregistered or ad-hoc components)
  usage?: Partial<ComponentUsage>;
  // Whether this container can be selected in dev mode
  selectable?: boolean;
  // Custom dev mode actions
  devActions?: DevAction[];
}

export interface DevAction {
  label: string;
  icon?: ComponentType;
  onClick: (componentId: string, usage: ComponentUsage) => void;
  disabled?: boolean;
}

// =====================================
// DEVELOPMENT MODE STATE
// =====================================
export interface DevModeState {
  isEnabled: boolean;
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  changes: ChangeRequest[];
  isSubmitting: boolean;
  sidebarOpen: boolean;
  showComponentTree: boolean;
  popoverState: PopoverState | null;
}

export interface PopoverState {
  componentId: string;
  isVisible: boolean;
  position: PopoverPosition;
  editingChangeId?: string; // If editing an existing change
}

export interface DevModeActions {
  toggleDevMode: () => void;
  selectComponent: (componentId: string) => void;
  deselectComponent: () => void;
  hoverComponent: (componentId: string | null) => void;
  addChange: (change: Omit<ChangeRequest, 'id' | 'timestamp'>) => void;
  updateChange: (id: string, updates: Partial<ChangeRequest>) => void;
  removeChange: (id: string) => void;
  clearAllChanges: () => void;
  submitChanges: () => Promise<void>;
  toggleSidebar: () => void;
  toggleComponentTree: () => void;
  showPopover: (componentId: string, position: PopoverPosition, editingChangeId?: string) => void;
  hidePopover: () => void;
}

// =====================================
// CHANGE REQUEST TYPES
// =====================================
export interface ChangeRequest {
  id: string;
  componentId: string;
  feedback: string;
  timestamp: number;
  category: ChangeCategory;
  priority: ChangePriority;
  status: ChangeStatus;
  componentContext: ComponentContext;
  pageContext: PageContext;
  userContext?: UserContext;
  metadata?: ChangeMetadata;
}

export enum ChangeCategory {
  BUG_FIX = 'bug_fix',
  ENHANCEMENT = 'enhancement',
  STYLING = 'styling',
  CONTENT = 'content',
  BEHAVIOR = 'behavior',
  PERFORMANCE = 'performance',
  ACCESSIBILITY = 'accessibility',
  GENERAL = 'general'
}

export enum ChangePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum ChangeStatus {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}

export interface ComponentContext {
  name: string;
  description: string;
  filePath: string; // Component definition filepath
  repositoryPath?: string; // Full repository path for AI agents (manually specified)
  usageFilePath?: string; // Where the component was used/called from
  usageRepositoryPath?: string; // Full repository path for usage file (manually specified)
  usageLineNumber?: number; // Line number where component was used
  usageColumnNumber?: number; // Column number where component was used
  parentComponents: string[];
  childComponents: string[];
  semanticTags: string[];
  currentProps?: Record<string, any>;
  domPath?: string;
  boundingRect?: DOMRect;
}

export interface PageContext {
  url: string;
  title: string;
  pathname: string;
  searchParams?: Record<string, string>;
  timestamp: number;
}

export interface UserContext {
  sessionId: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
  userId?: string;
  email?: string;
}

export interface ChangeMetadata {
  screenshot?: string; // base64 encoded screenshot
  elementPath?: string; // CSS selector path
  relatedChanges?: string[]; // IDs of related changes
  aiSuggestions?: string[];
}

// =====================================
// POPOVER TYPES
// =====================================
export interface PopoverProps {
  componentId: string;
  isVisible: boolean;
  position: PopoverPosition;
  onClose: () => void;
  onSubmitChange: (feedback: string, category: ChangeCategory, priority: ChangePriority) => void;
}

export interface PopoverPosition {
  top: number;
  left: number;
  placement: 'top' | 'bottom' | 'left' | 'right';
  offset: {
    x: number;
    y: number;
  };
}

// =====================================
// SIDEBAR/SHEET TYPES
// =====================================
export interface SidebarProps {
  isOpen: boolean;
  changes: ChangeRequest[];
  onClose: () => void;
  onEditChange: (id: string, updates: Partial<ChangeRequest>) => void;
  onRemoveChange: (id: string) => void;
  onSubmitAll: () => void;
  onClearAll: () => void;
  onAddGeneralChange: (change: Omit<ChangeRequest, 'id' | 'timestamp' | 'componentId'>) => void;
}

export interface ChangeListItem {
  change: ChangeRequest;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updates: Partial<ChangeRequest>) => void;
  onCancel: () => void;
  onRemove: () => void;
}

// =====================================
// SUBMISSION TYPES
// =====================================
export interface SubmissionPayload {
  submissionId: string;
  timestamp: number;
  changes: ChangeRequest[];
  globalContext: GlobalContext;
  summary: SubmissionSummary;
}

export interface GlobalContext {
  projectId?: string;
  environment: 'development' | 'staging' | 'production';
  version?: string;
  repositoryUrl?: string;
  branch?: string;
  commitHash?: string;
  aiProvider?: 'anthropic' | 'openai' | 'google' | 'grok';
  userInfo?: UserContext;
}

export interface SubmissionSummary {
  totalChanges: number;
  categoryCounts: Record<ChangeCategory, number>;
  priorityCounts: Record<ChangePriority, number>;
  affectedComponents: string[];
  estimatedComplexity: 'low' | 'medium' | 'high';
}

export interface SubmissionResponse {
  success: boolean;
  submissionId: string;
  sessionId?: string;
  message: string;
  trackingUrl?: string;
  estimatedProcessingTime?: number;
  error?: string;
}

// =====================================
// COMPONENT TREE TYPES
// =====================================
export interface ComponentTreeNode {
  id: string;
  name: string;
  children: ComponentTreeNode[];
  usage: ComponentUsage;
  hasChanges: boolean;
  isSelected: boolean;
  isVisible: boolean;
  depth: number;
}

export interface ComponentTreeProps {
  rootNodes: ComponentTreeNode[];
  selectedId?: string;
  onSelectNode: (id: string) => void;
  onToggleNode: (id: string) => void;
  expandedNodes: Set<string>;
}

// =====================================
// UTILITY TYPES
// =====================================
// export type ComponentRegistryId = keyof ComponentRegistry;
// export type ComponentLibraryId = keyof ComponentLibrary;

export interface DevModeConfig {
  enabled: boolean;
  showBorders: boolean;
  showTooltips: boolean;
  autoOpenSidebar: boolean;
  persistChanges: boolean;
  maxChanges: number;
  submitEndpoint: string;
  authToken?: string;
  // Visual customization
  showDashedBorders: boolean;
  hoverColor: string;
  selectedColor: string;
  showComponentIds: boolean;
  // Detailed containerization control
  detailedContainerization: boolean;
}

export interface ContainerRef {
  componentId: string;
  element: HTMLElement;
  usage: ComponentUsage;
  select: () => void;
  deselect: () => void;
  addChange: (feedback: string) => void;
}

// =====================================
// ERROR TYPES
// =====================================
export interface ContainerError {
  type: 'DUPLICATE_ID' | 'MISSING_ID' | 'INVALID_ID' | 'REGISTRY_NOT_FOUND';
  componentId?: string;
  message: string;
  stack?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// =====================================
// HOOK TYPES
// =====================================
export interface UseDevModeReturn {
  state: DevModeState;
  actions: DevModeActions;
  config: DevModeConfig;
  errors: ContainerError[];
  system: ComponentSystem;
}

export interface UseContainerReturn {
  isSelected: boolean;
  isHovered: boolean;
  isDevMode: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  handleClick: (e: React.MouseEvent) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

// =====================================
// COMPONENT REGISTRY BUILDER (for ComponentUsage)
// =====================================
export interface RegistryBuilderConfig {
  strict: boolean; // Throw errors on duplicate IDs
  autoGenerate: boolean; // Auto-generate IDs if missing
  semanticAnalysis: boolean; // Generate semantic tags automatically
  includeSourceMap: boolean; // Include source map information
}

export interface RegistryBuilder {
  addUsage: (usage: ComponentUsage) => RegistryBuilder;
  addUsages: (usages: ComponentUsage[]) => RegistryBuilder;
  validate: () => ValidationError[];
  build: () => ComponentRegistry;
}

// =====================================
// HELPER FUNCTIONS
// =====================================

// Helper function to get full component info
export function getFullComponentInfo(
  usageId: string, 
  system: ComponentSystem
): {
  usage: ComponentUsage;
  definition: ComponentDefinition;
} | null {
  const usage = system.registry[usageId];
  if (!usage) return null;
  
  const definition = system.library[usage.definitionId];
  if (!definition) return null;
  
  return { usage, definition };
}