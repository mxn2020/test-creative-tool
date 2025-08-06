// src/lib/dev-container/hooks/useDevMode.ts

import { useDevMode as useDevModeContext } from '../components/DevModeProvider';
import { UseDevModeReturn, ComponentUsage, ComponentDefinition, ComponentSystem, ChangeRequest } from '../types';
import { componentLibrary } from '../../../registry/componentLibrary';
import { componentRegistry } from '../../../registry/componentRegistry';
import { validateComponentUsageId } from '../utils/validation';

// Create the component system from library and registry
const componentSystem: ComponentSystem = {
  library: componentLibrary,
  registry: componentRegistry,
};

// Re-export the hook from the provider with component system integration
export const useDevMode = (): UseDevModeReturn => {
  const context = useDevModeContext();
  
  // Component system aware actions
  const actions = {
    ...context,
    
    // Component selection with validation
    selectComponent: (componentId: string) => {
      try {
        validateComponentUsageId(componentId, componentSystem.registry, false);
        context.selectComponent(componentId);
      } catch (error) {
        console.warn(`Component usage ID "${componentId}" not found in registry`);
        context.selectComponent(componentId);
      }
    },
    
    // Change addition with component context
    addChange: (change: Omit<ChangeRequest, 'id' | 'timestamp'>) => {
      const usage = componentSystem.registry[change.componentId];
      const definition = usage ? componentSystem.library[usage.definitionId] : undefined;
      
      const contextualChange = {
        ...change,
        componentContext: {
          ...change.componentContext,
          ...(usage && {
            name: usage.name,
            description: usage.description,
            filePath: usage.filePath,
            repositoryPath: usage.repositoryPath,
            semanticTags: usage.semanticTags,
          }),
          ...(definition && {
            usageFilePath: usage?.filePath,
            usageRepositoryPath: usage?.repositoryPath,
          }),
        },
      };
      
      context.addChange(contextualChange);
    },
  };
  
  return {
    state: {
      isEnabled: context.isEnabled,
      selectedComponentId: context.selectedComponentId,
      hoveredComponentId: context.hoveredComponentId,
      changes: context.changes,
      isSubmitting: context.isSubmitting,
      sidebarOpen: context.sidebarOpen,
      showComponentTree: context.showComponentTree,
      popoverState: context.popoverState,
    },
    actions,
    config: context.config,
    errors: [],
    system: componentSystem,
  };
};

// Utility hooks for accessing component system data
export const useComponentSystem = (): ComponentSystem => {
  return componentSystem;
};

export const useComponentUsage = (usageId: string): ComponentUsage | undefined => {
  return componentSystem.registry[usageId];
};

export const useComponentDefinition = (definitionId: string): ComponentDefinition | undefined => {
  return componentSystem.library[definitionId];
};

export const useFullComponentInfo = (usageId: string): {
  usage?: ComponentUsage;
  definition?: ComponentDefinition;
} => {
  const usage = useComponentUsage(usageId);
  const definition = usage ? useComponentDefinition(usage.definitionId) : undefined;
  
  return { usage, definition };
};

export default useDevMode;